'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================================
   VERTEX SHADER — Full-screen quad
   ========================================================================= */
const VS_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

/* =========================================================================
   FRAGMENT SHADER — Procedural Atmospheric Orbital Sunrise
   
   Directly matching the design specification:
   - "its colour runs out from the edge of the planet through white, gold, orange and red"
   - "it reaches furthest and starts hottest in the middle where the sun sits"
   - "toward the sides it thins and starts already orange-red"
   - "Past the warm colours it fades into the page"
   - "hairline rim that is white where the sun is and blue toward the sides"
   - "faint blue haze just inside the edge"
   - "curve flattening, like you're coming down toward the planet"
   - "hangs from the top, the corners light first and straightens into a flat sunrise glow"
   ========================================================================= */
const FS_SOURCE = `
  precision highp float;

  uniform vec2  u_resolution;
  uniform float u_horizon_y;     // Normalized vertical position of apex (0.0 = top, 1.0 = bottom)
  uniform float u_curvature;     // Curvature amount (> 0 curves, 0 = flat)
  uniform float u_direction;     // 1.0 = planet below (sunset), -1.0 = planet above (sunrise)
  uniform float u_sun_intensity; // Global sun/glow brightness multiplier
  uniform float u_darkness;      // 0.0 = warm off-white (#F7F5F2), 1.0 = deep night (#030509)
  uniform float u_glow_reach;    // Max vertical reach of glow in UV space
  uniform float u_sun_x;         // Center of the sun (0.5 default)

  void main() {
    // UV coordinates with y=0 at top, y=1 at bottom
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y;

    float dx = uv.x - u_sun_x;

    // Horizon line at current x
    // When u_direction > 0 (sunset, planet below): apex at u_horizon_y, drops at sides
    // When u_direction < 0 (sunrise, planet above): apex at u_horizon_y, rises at sides (hanging from top)
    float y_h = u_horizon_y + u_direction * u_curvature * (dx * dx);

    // Distance from horizon into sky
    // positive = inside sky (atmosphere/glow region)
    // negative = inside planet (dark body)
    float dist = (u_direction > 0.0) ? (y_h - uv.y) : (uv.y - y_h);

    // Background color: off-white to deep black
    vec3 bgLight = vec3(0.969, 0.961, 0.949); // #F7F5F2
    vec3 bgDark  = vec3(0.012, 0.020, 0.035); // #030509
    vec3 bgColor = mix(bgLight, bgDark, u_darkness);

    // Horizontal sun concentration:
    // Hottest in the middle where the sun sits, drops smoothly toward the sides
    float sunFactor = clamp(1.0 - abs(dx) * 1.85, 0.0, 1.0);
    sunFactor = smoothstep(0.0, 1.0, sunFactor);

    // Glow reach: furthest in middle, thins toward sides
    float maxReach = u_glow_reach;
    float minReach = u_glow_reach * 0.28;
    float reach = mix(minReach, maxReach, sunFactor);

    // Normalized distance into the glow (0 = at edge, 1 = outer limit)
    float t = clamp(dist / max(0.0001, reach), 0.0, 1.0);

    // Color ramp definition:
    // Starts hottest (white/gold) in middle, starts already orange-red toward sides
    vec3 cEdgeHot  = vec3(1.0, 0.985, 0.93); // Brilliant white-gold
    vec3 cEdgeSide = vec3(0.96, 0.44, 0.18); // Orange-red
    vec3 c0 = mix(cEdgeSide, cEdgeHot, pow(sunFactor, 0.75));

    vec3 cGold   = vec3(1.0, 0.83, 0.32);
    vec3 cOrange = vec3(0.98, 0.51, 0.15);
    vec3 cCoral  = vec3(0.86, 0.27, 0.22);
    vec3 cPink   = vec3(0.72, 0.23, 0.33);

    // Multi-stop gradient interpolation
    vec3 glowColor;
    if (t < 0.08) {
      glowColor = mix(c0, cGold, t / 0.08);
    } else if (t < 0.25) {
      glowColor = mix(cGold, cOrange, (t - 0.08) / 0.17);
    } else if (t < 0.55) {
      glowColor = mix(cOrange, cCoral, (t - 0.25) / 0.30);
    } else if (t < 0.85) {
      glowColor = mix(cCoral, cPink, (t - 0.55) / 0.30);
    } else {
      glowColor = mix(cPink, bgColor, (t - 0.85) / 0.15);
    }

    // Smooth gaussian-like alpha falloff into the background
    float glowAlpha = (1.0 - smoothstep(0.0, 1.0, t)) * u_sun_intensity;
    glowAlpha = pow(glowAlpha, 1.15);
    vec3 skyColor = mix(bgColor, glowColor, glowAlpha);

    // Planet interior
    vec3 planetBase = vec3(0.012, 0.016, 0.026); // Deep space black

    // Faint blue haze just inside the edge
    float insideDist = -dist * u_resolution.y;
    float insideHaze = exp(-insideDist / 14.0) * 0.44 * (1.0 - sunFactor * 0.30);
    vec3 hazeBlue = vec3(0.12, 0.42, 0.70);
    vec3 planetColor = mix(planetBase, hazeBlue, insideHaze);

    // Hairline rim: white where sun is, blue toward sides
    float pixelDist = abs(dist) * u_resolution.y;
    float rimFactor = exp(-(pixelDist * pixelDist) / 2.2);
    vec3 rimWhite = vec3(1.0, 1.0, 1.0);
    vec3 rimCyan  = vec3(0.18, 0.62, 0.90);
    vec3 rimColor = mix(rimCyan, rimWhite, pow(sunFactor, 1.8));

    // Crisp anti-aliased edge dividing planet and sky
    float edgeMask = smoothstep(-1.0, 1.0, dist * u_resolution.y);
    vec3 finalColor = mix(planetColor, skyColor, edgeMask);

    // Add hairline rim at horizon boundary
    finalColor += rimColor * rimFactor * 0.95 * u_sun_intensity;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function SunriseReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const textSunsetRef = useRef<HTMLDivElement>(null);
  const textNightRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Initialize WebGL */
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) {
      console.warn('WebGL not supported, falling back');
      return;
    }

    // Compile shaders
    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry (2 triangles covering -1 to +1)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes          = gl.getUniformLocation(program, 'u_resolution');
    const uHorizonY     = gl.getUniformLocation(program, 'u_horizon_y');
    const uCurvature    = gl.getUniformLocation(program, 'u_curvature');
    const uDirection    = gl.getUniformLocation(program, 'u_direction');
    const uSunIntensity = gl.getUniformLocation(program, 'u_sun_intensity');
    const uDarkness     = gl.getUniformLocation(program, 'u_darkness');
    const uGlowReach    = gl.getUniformLocation(program, 'u_glow_reach');
    const uSunX         = gl.getUniformLocation(program, 'u_sun_x');

    // Shader state variables driven by GSAP
    const state = {
      horizonY: 0.68,       // Starts with top 32% of planet visible
      curvature: 0.85,      // Panoramic curve
      direction: 1.0,       // 1 = sunset (planet at bottom)
      sunIntensity: 1.0,    // Full atmospheric brilliance
      darkness: 0.0,        // 0 = off-white page background
      glowReach: 0.42,      // Height of glow
      sunX: 0.5,            // Centered sun
    };

    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uHorizonY, state.horizonY);
      gl.uniform1f(uCurvature, state.curvature);
      gl.uniform1f(uDirection, state.direction);
      gl.uniform1f(uSunIntensity, state.sunIntensity);
      gl.uniform1f(uDarkness, state.darkness);
      gl.uniform1f(uGlowReach, state.glowReach);
      gl.uniform1f(uSunX, state.sunX);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      render();
    };

    window.addEventListener('resize', resize);
    resize();

    /* =====================================================================
       GSAP SCROLLTRIGGER TIMELINE
       
       Follows the exact 5-step reference sequence:
       1. Sunset Horizon (initial homepage)
       2. Expanding Horizon (horizon rises & curve flattens)
       3. Full-Screen Dark Inner Section (deep black night)
       4. Sunrise Transition (hanging planet lifts, corners light first)
       5. Final Light Section (straightens into flat sunrise glow)
       ===================================================================== */
    const ctx = gsap.context(() => {
      gsap.set(textSunsetRef.current, { opacity: 0, y: 20 });
      gsap.set(textNightRef.current, { opacity: 0, y: 20 });
      gsap.set(dawnRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=7000',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: () => render(),
        },
      });

      /* -------------------------------------------------------------
         STEP 1 & 2: Sunset -> Expanding Horizon (flattens as it rises)
         ------------------------------------------------------------- */
      // Initial text settles and rises in
      tl.to(
        textSunsetRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.05
      );

      // "The motion isn't the edge sliding up the screen, it's the curve flattening"
      tl.to(
        state,
        {
          horizonY: 0.35,
          curvature: 0.50,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: render,
        },
        0.1
      );

      // Sunset text fades out as planet continues expanding
      tl.to(
        textSunsetRef.current,
        { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' },
        1.3
      );

      // Planet covers remaining screen and apex moves past top
      tl.to(
        state,
        {
          horizonY: -0.15,
          curvature: 0.20,
          duration: 1.6,
          ease: 'power1.inOut',
          onUpdate: render,
        },
        1.5
      );

      /* -------------------------------------------------------------
         STEP 3: Full Dark Inner Section
         ------------------------------------------------------------- */
      // Fade background into full night dark
      tl.to(
        state,
        {
          darkness: 1.0,
          sunIntensity: 0.0,
          duration: 0.8,
          ease: 'power1.inOut',
          onUpdate: render,
        },
        2.5
      );

      // Switch to sunrise orientation (planet hanging from top) while completely dark
      tl.set(state, {
        direction: -1.0,
        horizonY: -0.20,
        curvature: 0.70,
        sunIntensity: 0.0,
      }, 3.1);

      // Night text settles and rises in
      tl.to(
        textNightRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        3.1
      );

      // Night hold duration
      tl.to({}, { duration: 1.2 }, 3.8);

      // Night text fades out
      tl.to(
        textNightRef.current,
        { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' },
        5.0
      );

      /* -------------------------------------------------------------
         STEP 4 & 5: Sunrise Transition & Final Light Section
         "On the way out it hangs from the top, the corners light first
          and it straightens into a flat sunrise glow over the next section"
         ------------------------------------------------------------- */
      // Sunrise enters from top: planet hanging down, corners light first
      tl.to(
        state,
        {
          horizonY: 0.22,
          curvature: 0.75,
          sunIntensity: 1.0,
          darkness: 0.0,
          glowReach: 0.38,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: render,
        },
        5.3
      );

      // "it straightens into a flat sunrise glow over the next section"
      // Horizon apex lifts above the screen, curvature flattens to 0
      tl.to(
        state,
        {
          horizonY: -0.04,
          curvature: 0.06,
          glowReach: 0.40,
          duration: 1.8,
          ease: 'power1.out',
          onUpdate: render,
        },
        7.1
      );

      // Dawn editorial typography and CTA settle and rise in
      tl.to(
        dawnRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        7.6
      );

      // Settle pause
      tl.to({}, { duration: 0.5 }, 8.4);
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', resize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden select-none"
        style={{ backgroundColor: '#F7F5F2' }}
      >
        {/* WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ display: 'block' }}
        />

        {/* -------------------------------------------------------------
            STAGE 1: Sunset Heading
            ------------------------------------------------------------- */}
        <div
          ref={textSunsetRef}
          className="absolute z-10 pointer-events-none"
          style={{ top: '7vh', left: '5vw', opacity: 0 }}
        >
          <h2
            className="font-kalice leading-[1.12] tracking-[-0.025em]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              color: '#1A1A2E',
            }}
          >
            The last light
          </h2>
          <h2
            className="font-kalice leading-[1.12] tracking-[-0.025em]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              color: '#9A9A9A',
            }}
          >
            over the salt flats
          </h2>
        </div>

        {/* -------------------------------------------------------------
            STAGE 3: Full Dark Night Chapter
            ------------------------------------------------------------- */}
        <div
          ref={textNightRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <h2
            className="font-kalice leading-[1.12] tracking-[-0.025em] text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Past the horizon
          </h2>
          <h2
            className="font-kalice leading-[1.12] tracking-[-0.025em] mt-1"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#505060',
            }}
          >
            the sky goes deep
          </h2>
          <p
            className="mt-6 max-w-md"
            style={{
              fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
              color: '#8A8A9A',
            }}
          >
            One night camped on the flats with{' '}
            <span className="font-semibold text-white">
              no light for{' '}
            </span>
            <br className="hidden sm:inline" />
            <span className="font-semibold text-white">forty miles.</span>
          </p>
        </div>

        {/* -------------------------------------------------------------
            STAGE 5: Final Light Dawn Chapter
            ------------------------------------------------------------- */}
        <div
          ref={dawnRef}
          className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 lg:px-20 pb-10 md:pb-14 lg:pb-20"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-6">
            <div className="flex-shrink-0">
              <h2
                className="font-kalice leading-[1.08] tracking-[-0.025em]"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  color: '#1A1A2E',
                }}
              >
                Back in town
              </h2>
              <h2
                className="font-kalice leading-[1.08] tracking-[-0.025em]"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  color: '#B0B0B0',
                }}
              >
                before sunrise
              </h2>
            </div>
            <div className="flex-1 flex justify-center md:justify-end md:mr-8 lg:mr-16">
              <p
                className="leading-relaxed max-w-xs"
                style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}
              >
                <span style={{ color: '#8A8A8A' }}>
                  Transfers, tents and a hot breakfast are
                </span>
                <br />
                <span className="font-semibold" style={{ color: '#2A2A2A' }}>
                  all arranged.
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="
                  px-7 py-3.5 rounded-full text-sm font-medium text-white
                  transition-all duration-300
                  hover:scale-[1.05] hover:shadow-lg active:scale-95
                  cursor-pointer
                "
                style={{ backgroundColor: '#1A1A2E' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2A2A3E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1A1A2E';
                }}
              >
                Reserve a seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}