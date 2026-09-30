import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./GradientWaves.css";

const color = hex => {
  const value = Number.parseInt(hex.slice(1), 16);
  return new Float32Array([(value >> 16) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]);
};

const vertex = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
const fragment = `precision highp float;
uniform float uTime; uniform vec2 uResolution; uniform vec3 uHorizon; uniform vec3 uWave; uniform vec3 uCrest; uniform float uOpacity;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy; uv.x *= uResolution.x / uResolution.y;
  float wave = sin(uv.x * 7.0 + uTime * .22) * .12 + sin(uv.x * 2.7 - uTime * .16) * .14;
  wave += sin((uv.y + wave) * 13.0 + uTime * .12) * .025;
  float horizon = smoothstep(.12, .88, uv.y + wave);
  float crest = smoothstep(.72, 1.08, uv.y + wave + sin(uv.x * 15.0 - uTime * .1) * .025);
  vec3 surface = mix(uWave, uCrest, crest);
  vec3 outputColor = mix(uHorizon, surface, horizon);
  float alpha = smoothstep(.02, .68, uv.y) * uOpacity;
  gl_FragColor = vec4(outputColor, alpha);
}`;

export default function GradientWaves({ className = "", horizonColor, waveColor, crestColor, opacity = 0.18 }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let renderer;
    try { renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) }); } catch { return undefined; }
    const gl = renderer.gl;
    const program = new Program(gl, { vertex, fragment, uniforms: {
      uTime: { value: 0 }, uResolution: { value: new Float32Array([1, 1]) },
      uHorizon: { value: color(horizonColor) }, uWave: { value: color(waveColor) },
      uCrest: { value: color(crestColor) }, uOpacity: { value: opacity },
    }});
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const canvas = gl.canvas;
    container.appendChild(canvas);
    const resize = () => { const box = container.getBoundingClientRect(); renderer.setSize(Math.max(1, box.width), Math.max(1, box.height)); program.uniforms.uResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]); };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    let frame = 0; let visible = true;
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(container);
    const draw = now => { if (visible && !document.hidden) { program.uniforms.uTime.value = now / 1000; renderer.render({ scene: mesh }); } frame = requestAnimationFrame(draw); };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [horizonColor, waveColor, crestColor, opacity]);

  return <div className={`gradient-waves ${className}`.trim()} aria-hidden="true" ref={ref} />;
}
