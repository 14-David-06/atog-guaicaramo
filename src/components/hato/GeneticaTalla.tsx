'use client'

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { HatoIcon } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/* ---------- Reveal-on-scroll ---------- */
function useGTReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }); },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

interface GTRevealProps { children: React.ReactNode; delay?: number; as?: React.ElementType; y?: number; dur?: number; style?: CSSProperties; }
function GTReveal({ children, delay = 0, as = "div", y = 18, dur = 760, style }: GTRevealProps) {
  const [ref, seen] = useGTReveal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;
  return (
    <Tag ref={ref} style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ---------- Word-rise heading ---------- */
interface GTRiseProps { text: string; delay?: number; color?: string; italic?: boolean; size?: string; weight?: number; }
function GTRise({ text, delay = 0, color, italic = false, size, weight = 400 }: GTRiseProps) {
  const [ref, seen] = useGTReveal();
  const words = text.split(" ");
  return (
    <div ref={ref} style={{ fontFamily: "var(--g-font-display)", fontSize: size || "clamp(40px, 6.4vw, 96px)", lineHeight: 1.04, letterSpacing: "-0.022em", color: color || "var(--g-beige)", fontStyle: italic ? "italic" : "normal", fontWeight: weight, margin: 0 }}>
      {words.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)", verticalAlign: "top", paddingTop: "0.32em", paddingBottom: "0.32em", marginTop: "-0.32em", marginBottom: "-0.32em", lineHeight: 1.04, marginRight: wi === words.length - 1 ? 0 : "0.28em" }}>
          <span style={{ display: "inline-block", transform: seen ? "translateY(0) skewY(0)" : "translateY(112%) skewY(6deg)", opacity: seen ? 1 : 0, filter: seen ? "blur(0)" : "blur(6px)", transition: `transform 900ms cubic-bezier(.2,.7,.2,1) ${delay + wi * 90}ms, opacity 900ms ${delay + wi * 90}ms, filter 900ms ${delay + wi * 90}ms` }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- Tilt photo card ---------- */
function GTTilt({ src, badge, objectPosition = "center" }: { src: string; badge: string; objectPosition?: string }) {
  const [ref, seen] = useGTReveal();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ position: "relative", aspectRatio: "4 / 5", opacity: seen ? 1 : 0, transform: `translateY(${seen ? 0 : 26}px) perspective(1200px) rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`, transition: "opacity 900ms var(--g-ease-soft), transform 500ms var(--g-ease-soft)", transformStyle: "preserve-3d" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden", background: "var(--g-verde-100)", boxShadow: "0 30px 80px rgba(26,33,32,0.26)" }}>
        <img src={src} alt={badge} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, transform: `scale(1.07) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`, transition: "transform 600ms var(--g-ease-soft)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 52%, rgba(26,33,32,0.52) 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: isMobile ? 16 : -22, bottom: 30, background: "var(--g-beige)", border: "1px solid var(--g-line)", borderRadius: 14, padding: "14px 20px", boxShadow: "0 18px 40px rgba(26,33,32,0.16)", transform: "translateZ(60px)" }}>
        <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--g-verde-600)", marginBottom: 4 }}>Hato Guaicaramo</div>
        <div style={{ fontFamily: "var(--g-font-display)", fontSize: 19, color: "var(--g-verde-900)" }}>{badge}</div>
      </div>
    </div>
  );
}

/* ---------- DNA double-helix illustration ---------- */
function GTHelix({ width = 120, height = 420, stroke = "rgba(154,173,153,0.55)", rungs = 14 }: { width?: number; height?: number; stroke?: string; rungs?: number }) {
  const w = 100, h = 360, amp = 30, mid = 50;
  const turns = 2.2;
  const pathFor = (phase: number) => {
    let d = "";
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = mid + amp * Math.sin(t * Math.PI * 2 * turns + phase);
      const y = t * h;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
    }
    return d;
  };
  const rungEls: React.ReactNode[] = [];
  for (let i = 0; i < rungs; i++) {
    const t = (i + 0.5) / rungs;
    // Round to 2 decimals to avoid SSR/client floating-point precision mismatch
    const x1 = parseFloat((mid + amp * Math.sin(t * Math.PI * 2 * turns)).toFixed(2));
    const x2 = parseFloat((mid + amp * Math.sin(t * Math.PI * 2 * turns + Math.PI)).toFixed(2));
    const y  = parseFloat((t * h).toFixed(2));
    rungEls.push(<line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={stroke} strokeWidth="1.4" />);
    rungEls.push(<circle key={"a" + i} cx={x1} cy={y} r="2.6" fill={stroke} />);
    rungEls.push(<circle key={"b" + i} cx={x2} cy={y} r="2.6" fill={stroke} />);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={width} height={height} style={{ overflow: "visible" }}>
      <path d={pathFor(0)} fill="none" stroke={stroke} strokeWidth="2" />
      <path d={pathFor(Math.PI)} fill="none" stroke={stroke} strokeWidth="2" />
      {rungEls}
    </svg>
  );
}

/* ---------- Rotating CIA seal ---------- */
function GTSeal({ size = "clamp(96px, 11vw, 150px)" }: { size?: string }) {
  const [ref, seen] = useGTReveal();
  return (
    <div ref={ref} aria-hidden style={{ width: size, height: size, opacity: seen ? 1 : 0, transform: seen ? "scale(1)" : "scale(0.7)", transition: "opacity 0.8s var(--g-ease-out) 0.4s, transform 0.8s var(--g-ease-out) 0.4s", position: "relative" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "gt-spin 28s linear infinite" }}>
        <defs><path id="gt-seal-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
        <text fill="var(--g-beige)" style={{ fontFamily: "var(--g-font-sans)", fontSize: "15px", fontWeight: 600, letterSpacing: "0.2em" }}>
          <textPath href="#gt-seal-path" startOffset="0">  PROGRAMA · CICLO CORTO · NELORE 100% ·  </textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <HatoIcon name="dna" size={32} color="var(--g-beige)" />
      </div>
    </div>
  );
}

/* ---------- Growth curve ---------- */
function GTGrowthCurve() {
  const [ref, seen] = useGTReveal();
  const VB_W = 320, VB_H = 190;
  const x0 = 24, x1 = 298, yTop = 50, yBot = 150, k = 9.2, baseline = 158;
  const xAt = (t: number) => x0 + t * (x1 - x0);
  const yAt = (t: number) => yTop + (yBot - yTop) / (1 + Math.exp(k * (t - 0.5)));
  let curve = "";
  const STEPS = 64;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    curve += (i === 0 ? "M" : "L") + xAt(t).toFixed(1) + "," + yAt(t).toFixed(1) + " ";
  }
  const area = `M${x0},${baseline} ` + curve.replace("M", "L") + `L${x1},${baseline} Z`;
  const milestones = [
    { t: 0.2, label: "Sexual",      tAlign: "translate(-50%, -190%)" },
    { t: 0.5, label: "Crecimiento", tAlign: "translate(-50%, -190%)" },
    { t: 0.8, label: "Terminación", tAlign: "translate(-62%, -190%)" },
  ];
  const CURVE_LEN = 520;
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="gt-curve-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--g-verde-600)" />
            <stop offset="1" stopColor="var(--g-verde-300)" />
          </linearGradient>
          <linearGradient id="gt-curve-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--g-verde-400)" stopOpacity="0.34" />
            <stop offset="1" stopColor="var(--g-verde-400)" stopOpacity="0" />
          </linearGradient>
          <marker id="gt-arrow" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--g-verde-300)" />
          </marker>
        </defs>
        <line x1={x0} y1={baseline} x2={x1 + 14} y2={baseline} stroke="var(--g-verde-200)" strokeWidth="1.5" markerEnd="url(#gt-arrow)" />
        <line x1={x0} y1={baseline} x2={x0} y2={yTop - 16} stroke="var(--g-verde-200)" strokeWidth="1.5" markerEnd="url(#gt-arrow)" />
        <path d={area} fill="url(#gt-curve-area)" style={{ opacity: seen ? 1 : 0, transition: "opacity 900ms ease 900ms" }} />
        {milestones.map((m, i) => (
          <line key={"g" + i} x1={xAt(m.t)} y1={yAt(m.t)} x2={xAt(m.t)} y2={baseline} stroke="var(--g-verde-300)" strokeWidth="1.2" strokeDasharray="3 5" style={{ opacity: seen ? 0.7 : 0, transition: `opacity 500ms ease ${1000 + i * 240}ms` }} />
        ))}
        <path d={curve} fill="none" stroke="url(#gt-curve-stroke)" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: CURVE_LEN, strokeDashoffset: seen ? 0 : CURVE_LEN, transition: "stroke-dashoffset 1700ms var(--g-ease-out) 200ms" }} />
        {milestones.map((m, i) => (
          <g key={"d" + i} style={{ opacity: seen ? 1 : 0, transform: seen ? "scale(1)" : "scale(0.2)", transformOrigin: `${xAt(m.t)}px ${yAt(m.t)}px`, transformBox: "fill-box", transition: `opacity 420ms ease ${900 + i * 260}ms, transform 520ms var(--g-ease-out) ${900 + i * 260}ms` }}>
            <circle cx={xAt(m.t)} cy={yAt(m.t)} r="11" fill="var(--g-verde-500)" opacity="0.18" style={{ transformOrigin: `${xAt(m.t)}px ${yAt(m.t)}px`, animation: seen ? `gt-pulseDot 2.6s ease-in-out ${1.4 + i * 0.26}s infinite` : "none" }} />
            <circle cx={xAt(m.t)} cy={yAt(m.t)} r="6.5" fill="var(--g-verde-600)" stroke="var(--g-beige)" strokeWidth="2.5" />
          </g>
        ))}
      </svg>
      {milestones.map((m, i) => (
        <div key={"l" + i} style={{ position: "absolute", left: `${xAt(m.t) / VB_W * 100}%`, top: `${yAt(m.t) / VB_H * 100}%`, transform: m.tAlign, whiteSpace: "nowrap", fontFamily: "var(--g-font-sans)", fontSize: "clamp(11px, 1.05vw, 13px)", fontWeight: 600, letterSpacing: "0.02em", color: "var(--g-verde-700)", padding: "4px 11px", borderRadius: 999, background: "var(--g-bg-elevated)", border: "1px solid var(--g-verde-100)", boxShadow: "0 4px 14px rgba(26,33,32,0.12)", opacity: seen ? 1 : 0, transition: `opacity 500ms ease ${1100 + i * 240}ms` }}>{m.label}</div>
      ))}
      <div style={{ position: "absolute", right: 2, top: `${baseline / VB_H * 100}%`, transform: "translateY(6px)", fontFamily: "var(--g-font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--g-verde-400)" }}>Tiempo</div>
      <div style={{ position: "absolute", left: 0, top: `${(yTop - 18) / VB_H * 100}%`, transform: "translate(-2px, -100%)", fontFamily: "var(--g-font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--g-verde-400)" }}>Precocidad</div>
    </div>
  );
}

/* ---------- Blend bar ---------- */
function GTBlendBar() {
  const [ref, seen] = useGTReveal();
  const grades = [
    { n: "87%",  pct: 87,  name: "Nelore CIA × Brahman",      pure: false },
    { n: "75%",  pct: 75,  name: "Nelore CIA × Brahman",      pure: false },
    { n: "50%",  pct: 50,  name: "Nelore CIA × Brahman",      pure: false },
  ];
  return (
    <div ref={ref}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>Grados de cruzamiento</span>
        <span style={{ flex: 1, height: 1, background: "var(--g-verde-100)" }} />
      </div>
      <div style={{ display: "grid", gap: 13 }}>
        {grades.map((g, i) => (
          <div key={g.name + i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, gap: 12 }}>
              <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 13.5, color: g.pure ? "var(--g-verde-700)" : "var(--g-cafe-700)", fontWeight: g.pure ? 600 : 400, letterSpacing: "0.01em" }}>{g.name}</span>
              <span style={{ fontFamily: "var(--g-font-display)", fontSize: 22, color: "var(--g-verde-700)", whiteSpace: "nowrap" }}>{g.n}{g.pure ? "" : " CIA"}</span>
            </div>
            <div style={{ height: 8, borderRadius: 8, background: "var(--g-verde-100)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 8, width: seen ? `${g.pct}%` : "0%", background: g.pure ? "linear-gradient(90deg, var(--g-verde-700), var(--g-verde-500))" : "linear-gradient(90deg, var(--g-verde-600), var(--g-verde-300))", transition: `width 1100ms cubic-bezier(.2,.7,.2,1) ${i * 140}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- iCIAGEN ring ---------- */
function GTRing() {
  const [ref, seen] = useGTReveal();
  const R = 78, C = 2 * Math.PI * R;
  return (
    <div ref={ref} style={{ position: "relative", width: "clamp(190px,22vw,250px)", height: "clamp(190px,22vw,250px)" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(249,246,232,0.14)" strokeWidth="8" />
        <circle cx="100" cy="100" r={R} fill="none" stroke="var(--g-verde-300)" strokeWidth="8" strokeLinecap="round" style={{ strokeDasharray: C, strokeDashoffset: seen ? C * 0.12 : C, transition: "stroke-dashoffset 1800ms var(--g-ease-out) 200ms" }} />
        <circle cx="100" cy="100" r={R - 18} fill="none" stroke="rgba(249,246,232,0.10)" strokeWidth="1.5" strokeDasharray="3 6" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(22px,2.4vw,30px)", color: "var(--g-beige)", letterSpacing: "0.02em" }}>iCIAGEN</div>
        <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--g-verde-300)", marginTop: 4 }}>proyectado</div>
      </div>
    </div>
  );
}

/* ===================================================================== */
export default function GeneticaTalla() {
  return (
    <>
      <style>{`
        @keyframes gt-floatBg { 0%{transform:translate3d(0,0,0) scale(1.05)} 100%{transform:translate3d(-3%,2%,0) scale(1.12)} }
        @keyframes gt-spin { to { transform: rotate(360deg); } }
        @keyframes gt-pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.5);opacity:.5} }
        @keyframes gt-scrollDot { 0%{transform:translateY(0);opacity:0} 30%{opacity:1} 75%{transform:translateY(13px);opacity:0} 100%{opacity:0} }
        @keyframes gt-cueFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes gt-helixDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
      `}</style>
      <GTHero />
      <GTEnfoque />
      <GTToros />
      <GTPortafolio />
      <GTBiotec />
      <GTManifest />
      <GTCTA />
    </>
  );
}

/* =====================================================================
   HERO
===================================================================== */
function GTHero() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = isMobile ? "64px 24px 40px" : "72px 56px 56px";
  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "var(--g-verde-900)", color: "var(--g-beige)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/photography/nelore-grupo-campo.jpg')", backgroundSize: "cover", backgroundPosition: "center", animation: "gt-floatBg 24s ease-in-out infinite alternate" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,33,32,0.74) 0%, rgba(26,33,32,0.34) 36%, rgba(26,33,32,0.66) 74%, rgba(26,33,32,0.95) 100%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 26%, rgba(98,119,97,0.40), transparent 54%)" }} />

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", width: "100%", padding: pad, flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <GTReveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 26, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--g-verde-300)" }}>
            <span style={{ width: 40, height: 1, background: "var(--g-verde-300)" }} />
            Hato Guaicaramo · Programa de mejoramiento genético
          </div>
        </GTReveal>
        <h1 style={{ margin: 0 }}>
          <GTRise text="Genética de" color="rgba(249,246,232,0.66)" size="clamp(34px, 5vw, 72px)" />
          <GTRise text="talla mundial." delay={120} size="clamp(56px, 9.5vw, 150px)" />
        </h1>
        <GTReveal delay={520}>
          <p style={{ marginTop: 30, maxWidth: "46ch", fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px, 1.5vw, 21px)", lineHeight: 1.6, color: "rgba(249,246,232,0.88)", textWrap: "pretty" }}>
            Invertimos en genética que <strong style={{ color: "var(--g-beige)" }}>reduce los ciclos de producción</strong> y acelera los resultados. Animales eficientes, más kilos de carne en menos tiempo.
          </p>
        </GTReveal>
      </div>

      <div aria-hidden style={{ position: "absolute", bottom: 38, left: "50%", zIndex: 3, animation: "gt-cueFloat 3s ease-in-out infinite", width: 27, height: 43, borderRadius: 999, border: "1.5px solid rgba(249,246,232,0.45)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
        <span style={{ width: 4, height: 8, borderRadius: 999, background: "rgba(249,246,232,0.85)", animation: "gt-scrollDot 1.9s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* =====================================================================
   ENFOQUE
===================================================================== */
function GTEnfoque() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(48px,7vw,96px) 0 clamp(28px,4vw,44px)";
  const pillars = [
    { icon: "timer-reset", k: "Ciclos más cortos",       d: "Reducimos el tiempo de producción en cada etapa." },
    { icon: "trending-up", k: "Resultados acelerados",   d: "Más kilos de carne, más rápido, con eficiencia real." },
    { icon: "target",      k: "Animales eficientes",     d: "Selección orientada al rendimiento del sistema." },
  ];
  return (
    <section style={{ background: "var(--g-bg)", padding: pad, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, transparent calc(50% - .5px), rgba(98,119,97,0.06) calc(50% - .5px), rgba(98,119,97,0.06) calc(50% + .5px), transparent calc(50% + .5px))", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px" }}>
        <div style={{ maxWidth: 1100 }}>
          <GTReveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 30, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>
              <span style={{ width: 28, height: 1, background: "var(--g-verde-600)" }} />
              El enfoque
            </div>
          </GTReveal>
          <GTRise text="Producir animales eficientes:" color="var(--g-verde-900)" size="clamp(32px, 5vw, 76px)" />
          <GTRise text="más kilos, menos tiempo." delay={120} color="var(--g-verde-500)" italic size="clamp(32px, 5vw, 76px)" />
        </div>

        <div style={{ marginTop: "clamp(44px,5vw,72px)", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          <GTReveal delay={120}>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: "clamp(17px,1.6vw,20px)", lineHeight: 1.7, color: "var(--g-cafe-700)", margin: 0, maxWidth: "58ch", textWrap: "pretty" }}>
              Invertimos en <strong style={{ color: "var(--g-verde-900)", fontWeight: 500 }}>genética de talla mundial</strong> y trabajamos bajo el programa de Mejoramiento Genético <strong style={{ color: "var(--g-verde-900)", fontWeight: 500 }}>CIA</strong>. Nuestro enfoque es claro: producir animales que rinden dentro del sistema.
            </p>
          </GTReveal>
          <GTReveal delay={200}>
            <a href="https://www.ciademelhoramento.com.br/" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--g-bg-elevated)", border: "1px solid var(--g-line)", borderRadius: 18, padding: "26px 28px", boxShadow: "var(--g-shadow-sm)", display: "flex", flexDirection: "column", gap: 16 }}>
                <img src="/assets/certificados/cia-melhoramento-clean.png" alt="CIA Melhoramento" style={{ height: 46, width: "auto", objectFit: "contain", alignSelf: "flex-start" }} />
                <div>
                  <div style={{ fontFamily: "var(--g-font-display)", fontSize: 22, color: "var(--g-verde-900)", lineHeight: 1.15, marginBottom: 6 }}>Programa de Mejoramiento Genético CIA</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500, color: "var(--g-verde-600)" }}>
                    ciademelhoramento.com.br
                    <HatoIcon name="arrow-up-right" size={15} />
                  </div>
                </div>
              </div>
            </a>
          </GTReveal>
        </div>

        <div style={{ marginTop: "clamp(48px,6vw,80px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "var(--g-line)", border: "1px solid var(--g-line)", borderRadius: 18, overflow: "hidden" }}>
          {pillars.map((p, i) => (
            <GTReveal key={p.k} delay={i * 110} style={{ background: "var(--g-bg-elevated)" }}>
              <div style={{ padding: "34px 30px 38px", height: "100%" }}>
                <span style={{ display: "inline-flex", width: 46, height: 46, borderRadius: 12, background: "var(--g-verde-50)", color: "var(--g-verde-600)", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <HatoIcon name={p.icon} size={22} />
                </span>
                <div style={{ fontFamily: "var(--g-font-display)", fontSize: 26, lineHeight: 1.08, color: "var(--g-verde-900)", marginBottom: 8 }}>{p.k}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--g-cafe-700)" }}>{p.d}</div>
              </div>
            </GTReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   TOROS
===================================================================== */
function GTToros() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(32px,4vw,52px) 0 clamp(56px,7vw,96px)";
  return (
    <section style={{ background: "var(--g-bg)", padding: pad, overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px" }}>
        <GTReveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(40px,5vw,72px)", fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>
            <span style={{ width: 28, height: 1, background: "var(--g-verde-600)" }} />
            Nuestros toros
          </div>
        </GTReveal>

        {/* 01 · Nelore 100% */}
        {/* Fila superior: foto + título y descripción */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.05fr", gap: "clamp(40px,5vw,88px)", alignItems: "center", marginBottom: "clamp(36px,4vw,56px)" }}>
          <GTTilt src="/assets/photography/DSC_5196-2.jpg" badge="Nelore 100%" objectPosition="85% center" />
          <div>
            <GTReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-verde-300)", lineHeight: 1 }}>01</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>Línea 100 % del programa de mejoramiento genético CIA</span>
              </div>
            </GTReveal>
            <GTReveal delay={80}>
              <h3 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--g-verde-900)", fontWeight: 400, margin: "0 0 22px", textWrap: "balance" }}>
                Nelore 100%, líderes en <em style={{ fontStyle: "italic", color: "var(--g-verde-500)" }}>precocidad</em>.
              </h3>
            </GTReveal>
            <GTReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 30px", maxWidth: "52ch", textWrap: "pretty" }}>
                Animales que lideran en <strong style={{ color: "var(--g-verde-900)", fontWeight: 500 }}>precocidad sexual, de crecimiento y de terminación</strong> — los tres aspectos fundamentales para rentabilizar el negocio ganadero.
              </p>
            </GTReveal>
            <GTReveal delay={175}>
              <div style={{ display: "grid", gap: 13 }}>
                {[
                  { name: "Nelore CIA Performance", pct: 100 },
                  { name: "Nelore CIA CESUG",        pct: 100 },
                ].map((g, i) => (
                  <div key={g.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, gap: 12 }}>
                      <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 13.5, color: "var(--g-verde-700)", fontWeight: 600, letterSpacing: "0.01em" }}>{g.name}</span>
                      <span style={{ fontFamily: "var(--g-font-display)", fontSize: 22, color: "var(--g-verde-700)", whiteSpace: "nowrap" }}>100%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 8, background: "var(--g-verde-100)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 8, width: `${g.pct}%`, background: "linear-gradient(90deg, var(--g-verde-700), var(--g-verde-500))", transition: `width 1100ms cubic-bezier(.2,.7,.2,1) ${i * 140}ms` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GTReveal>
          </div>
        </div>

        {/* Fila inferior: logos + curva de precocidad */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(20px,3vw,36px)", marginBottom: "clamp(72px,9vw,128px)" }}>
          <GTReveal delay={200}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "var(--g-bg-elevated)", border: "1px solid var(--g-line)", borderRadius: 16, padding: "32px", textAlign: "center", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32 }}>
                <img src="/assets/certificados/ceip-trimmed.png" alt="CEIP" style={{ width: 100, height: 100, objectFit: "contain" }} />
                <div style={{ width: 1, height: 60, background: "var(--g-line)" }} />
                <img src="/assets/certificados/cesug-trimmed.png" alt="CESUG" style={{ width: 100, height: 100, objectFit: "contain" }} />
              </div>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 14.5, lineHeight: 1.65, color: "var(--g-cafe-700)", margin: 0, maxWidth: "42ch", textWrap: "pretty" }}>
                El <strong style={{ color: "var(--g-verde-900)", fontWeight: 500 }}>Certificado de Superioridad Genética CESUG</strong> le garantiza que los ejemplares corresponden al <strong style={{ color: "var(--g-verde-700)", fontWeight: 500 }}>24.5 % superior</strong> de todos los animales nacidos y evaluados en una misma safra de Brasil, Colombia y Paraguay.
              </p>
            </div>
          </GTReveal>
          <GTReveal delay={220}>
            <div style={{ background: "var(--g-verde-50)", border: "1px solid var(--g-verde-100)", borderRadius: 16, padding: "26px 28px 18px", height: "100%" }}>
              <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--g-verde-600)", marginBottom: 6 }}>Curva de precocidad</div>
              <GTGrowthCurve />
            </div>
          </GTReveal>
        </div>

        {/* 02 · Cruces Nelore × Brahman */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr", gap: "clamp(40px,5vw,88px)", alignItems: "center" }}>
          <div>
            <GTReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-verde-300)", lineHeight: 1 }}>02</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>Cruzamiento</span>
              </div>
            </GTReveal>
            <GTReveal delay={80}>
              <h3 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--g-verde-900)", fontWeight: 400, margin: "0 0 22px", textWrap: "balance" }}>
                Nelore con Brahman, una <em style={{ fontStyle: "italic", color: "var(--g-verde-500)" }}>transición</em> a su ritmo.
              </h3>
            </GTReveal>
            <GTReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 32px", maxWidth: "52ch", textWrap: "pretty" }}>
                Una excelente alternativa para ir haciendo la transición de sus vientres de acuerdo con la <strong style={{ color: "var(--g-verde-900)", fontWeight: 500 }}>disponibilidad de tiempo y capital</strong>.
              </p>
            </GTReveal>
            <GTReveal delay={220}><GTBlendBar /></GTReveal>
          </div>
          <GTTilt src="/assets/photography/DSCN1132.jpg" badge="Nelore × Brahman" objectPosition="70% center" />
        </div>
      </div>
    </section>
  );
}


/* =====================================================================
   PORTAFOLIO
===================================================================== */
function GTPortafolio() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(56px,7vw,96px) 0";
  const items = [
    { icon: "venus",     k: "Hembras preñadas Nelore CIA",           d: "Reposición de línea pura, lista para el sistema." },
    { icon: "git-merge", k: "Hembras preñadas Nelore CIA × Brahman", d: "Grados 50%, 75% y 87% CIA según su transición." },
    { icon: "beef",      k: "Machos de ceba y levante",              d: "Nelore CIA × Brahman 50%, 75% y 87% CIA." },
    { icon: "dna",       k: "Embriones y preñeces",                  d: "Genética de alto valor, directo al hato." },
    { icon: "award",     k: "Toros Nelore 100%",                     d: "Líderes en precocidad sexual, de crecimiento y de terminación — aspectos fundamentales para rentabilizar los negocios ganaderos." },
  ];
  return (
    <section style={{ background: "var(--g-verde-50)", padding: pad, overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "end", marginBottom: "clamp(44px,5vw,68px)" }}>
          <div>
            <GTReveal>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>
                <span style={{ width: 28, height: 1, background: "var(--g-verde-600)" }} />
                Nuestro portafolio
              </div>
            </GTReveal>
            <GTRise text="Lo que ofrecemos" color="var(--g-verde-900)" size="clamp(32px,4.6vw,66px)" />
          </div>
          <GTReveal delay={160}>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: 0, maxWidth: "46ch", textWrap: "pretty" }}>
              Genética disponible en cada etapa del sistema — de la hembra de reposición al embrión clasificado por su potencial.
            </p>
          </GTReveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
          {items.map((it, i) => <GTPortCard key={it.k} {...it} n={i + 1} delay={i * 100} wide={!isMobile && i === items.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

function GTPortCard({ icon, k, d, n: _n, delay, wide = false }: { icon: string; k: string; d: string; n: number; delay: number; wide?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <GTReveal delay={delay} style={wide ? { gridColumn: "1 / -1" } : undefined}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative", background: "var(--g-bg-elevated)", border: "1px solid var(--g-verde-100)", borderRadius: 18, padding: "30px 28px 34px", height: "100%", transform: hover ? "translateY(-6px)" : "none", boxShadow: hover ? "0 20px 44px -14px rgba(26,33,32,0.24)" : "0 6px 18px -10px rgba(26,33,32,0.12)", transition: "transform 300ms var(--g-ease-out), box-shadow 300ms var(--g-ease-out)", overflow: "hidden", display: wide ? "flex" : "block", alignItems: wide ? "center" : undefined, gap: wide ? 32 : undefined }}>
        <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: 12, background: "var(--g-verde-500)", color: "var(--g-beige)", alignItems: "center", justifyContent: "center", marginBottom: wide ? 0 : 22, flexShrink: 0 }}>
          <HatoIcon name={icon} size={23} />
        </span>
        <div style={{ flex: wide ? 1 : undefined }}>
          <div style={{ position: "relative", fontFamily: "var(--g-font-display)", fontSize: 23, lineHeight: 1.14, color: "var(--g-verde-900)", marginBottom: 10, maxWidth: wide ? "none" : "20ch" }}>{k}</div>
          <div style={{ position: "relative", fontFamily: "var(--g-font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--g-cafe-700)", textWrap: "pretty" }}>{d}</div>
        </div>
      </div>
    </GTReveal>
  );
}

/* =====================================================================
   BIOTECNOLOGÍA
===================================================================== */
function GTBiotec() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(60px,7vw,100px) 0";
  const logica = ["Reducir ciclos", "Mejorar rendimiento", "Aumentar productividad", "Sostener el crecimiento"];
  return (
    <section style={{ position: "relative", background: "var(--g-verde-900)", color: "var(--g-beige)", padding: pad, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/photography/nelore-grupo-social.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.14, filter: "saturate(0.85)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 24% 18%, rgba(98,119,97,0.34), transparent 52%)" }} />
      <div aria-hidden style={{ position: "absolute", right: "5%", top: "12%", opacity: 0.5, animation: "gt-helixDrift 9s ease-in-out infinite", pointerEvents: "none" }}>
        <GTHelix />
      </div>

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px" }}>
        <GTReveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-verde-300)", lineHeight: 1 }}>03</span>
            <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-300)" }}>Biotecnología · Embriones y preñeces</span>
          </div>
        </GTReveal>

        <div style={{ maxWidth: 1040 }}>
          <GTRise text="Genética de alto valor," size="clamp(32px,5.2vw,80px)" />
          <GTRise text="directo al sistema." delay={120} color="var(--g-verde-300)" italic size="clamp(32px,5.2vw,80px)" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center", marginTop: "clamp(44px,5vw,72px)" }}>
          <div>
            <GTReveal>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "rgba(249,246,232,0.86)", margin: "0 0 18px", maxWidth: "54ch", textWrap: "pretty" }}>
                La biotecnología es una herramienta estratégica del modelo productivo de Hato Guaicaramo. Aplicamos <strong style={{ color: "var(--g-beige)" }}>transferencia embrionaria e inseminación</strong> para acelerar el mejoramiento del hato y proyectar la reposición con precisión.
              </p>
            </GTReveal>
            <GTReveal delay={120}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 14, letterSpacing: "0.02em", color: "var(--g-verde-300)", margin: "0 0 22px" }}>
                Cada embrión y cada preñez responden a una lógica clara:
              </p>
            </GTReveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {logica.map((l, i) => (
                <GTReveal key={l} delay={i * 110}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(249,246,232,0.06)", border: "1px solid rgba(249,246,232,0.14)", borderRadius: 12, padding: "14px 16px" }}>
                    <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 999, background: "var(--g-verde-500)", color: "var(--g-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <HatoIcon name="check" size={15} />
                    </span>
                    <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 14.5, fontWeight: 500, color: "var(--g-beige)" }}>{l}</span>
                  </div>
                </GTReveal>
              ))}
            </div>
          </div>

          <GTReveal delay={160}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
              <GTRing />
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 14.5, lineHeight: 1.6, color: "rgba(249,246,232,0.78)", textAlign: "center", margin: 0, maxWidth: "32ch" }}>
                Los embriones y preñeces <strong style={{ color: "var(--g-beige)" }}>se clasifican por su iCIAGEN proyectado</strong>.
              </p>
            </div>
          </GTReveal>
        </div>

        <GTReveal delay={120}>
          <div style={{ width: "100%", height: "clamp(360px, 45vw, 580px)", marginTop: "clamp(32px,4vw,52px)", border: "1px solid rgba(249,246,232,0.18)", borderRadius: 16, overflow: "hidden" }}>
            <img src="/assets/certificados/laboratorio.png" alt="Laboratorio de biotecnología" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "95% 70%" }} />
          </div>
        </GTReveal>
      </div>
    </section>
  );
}

/* =====================================================================
   MANIFIESTO
===================================================================== */
function GTManifest() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(96px,13vw,170px) 0";
  return (
    <section style={{ position: "relative", background: "var(--g-verde-800)", color: "var(--g-beige)", padding: pad, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", left: "6%", top: "50%", transform: "translateY(-50%)", opacity: 0.4, animation: "gt-helixDrift 10s ease-in-out infinite", pointerEvents: "none" }}>
        <GTHelix stroke="rgba(194,202,189,0.4)" />
      </div>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 120%, rgba(98,119,97,0.4), transparent 58%)" }} />
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px", textAlign: "center" }}>
        <GTReveal>
          <p style={{ fontFamily: "var(--g-font-sans)", fontSize: "clamp(15px,1.4vw,18px)", letterSpacing: "0.04em", color: "var(--g-verde-300)", margin: "0 0 18px" }}>Aquí la genética no se compra.</p>
        </GTReveal>
        <GTRise text="Se diseña."    size="clamp(44px,7vw,108px)" color="var(--g-beige)" />
        <GTRise text="Se integra."   delay={130} size="clamp(44px,7vw,108px)" color="var(--g-beige)" />
        <GTRise text="Se proyecta."  delay={260} size="clamp(44px,7vw,108px)" color="var(--g-verde-300)" italic />
      </div>
    </section>
  );
}

/* =====================================================================
   CTA
===================================================================== */
function GTCTA() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = "clamp(48px,6vw,80px) 0";
  return (
    <section style={{ position: "relative", background: "var(--g-verde-900)", color: "var(--g-beige)", padding: pad, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 120%, rgba(98,119,97,0.3), transparent 60%)" }} />
      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px", textAlign: "center" }}>
        <GTRise text="Genética que mueve el sistema." color="var(--g-beige)" size="clamp(30px,4.4vw,64px)" />
        <GTReveal delay={260}>
          <div style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <GTCtaLink href="/" solid>Volver al inicio</GTCtaLink>
            <GTCtaLink href="/nuestros-bufalos">Nuestros búfalos</GTCtaLink>
            <GTCtaLink href="https://www.ciademelhoramento.com.br/" external>Programa CIA</GTCtaLink>
          </div>
        </GTReveal>
      </div>
    </section>
  );
}

function GTCtaLink({ href, children, solid = false, external = false }: { href: string; children: React.ReactNode; solid?: boolean; external?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center", fontFamily: "var(--g-font-sans)", fontSize: 15, fontWeight: 500, letterSpacing: "0.02em", padding: "14px 28px", borderRadius: 999, textDecoration: "none", transition: "all 200ms var(--g-ease-soft)", border: "1px solid transparent" };
  const solidStyle: CSSProperties = { background: h ? "#ffffff" : "var(--g-beige)", color: "var(--g-verde-800)", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 14px 30px rgba(8,16,12,0.34)" : "0 6px 16px rgba(8,16,12,0.22)" };
  const outlineStyle: CSSProperties = { background: h ? "rgba(249,246,232,0.12)" : "transparent", color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.42)" };
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...(solid ? solidStyle : outlineStyle) }}>
      {children}{external && <HatoIcon name="arrow-up-right" size={15} />}
    </a>
  );
}

/* Suppress unused import warnings — GTSeal is an exportable sub-component */
export { GTSeal };
