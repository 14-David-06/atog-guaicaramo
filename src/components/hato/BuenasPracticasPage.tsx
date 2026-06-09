'use client'

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { HatoIcon } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/* ---------- Reveal-on-scroll ---------- */
function useBPReveal() {
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

interface BPRevealProps { children: React.ReactNode; delay?: number; as?: React.ElementType; y?: number; dur?: number; style?: CSSProperties; }
function BPReveal({ children, delay = 0, as = "div", y = 18, dur = 760, style }: BPRevealProps) {
  const [ref, seen] = useBPReveal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;
  return (
    <Tag ref={ref} style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ---------- Word-rise heading ---------- */
interface BPRiseProps { text: string; delay?: number; color?: string; italic?: boolean; size?: string; weight?: number; }
function BPRise({ text, delay = 0, color, italic = false, size, weight = 400 }: BPRiseProps) {
  const [ref, seen] = useBPReveal();
  const words = text.split(" ");
  return (
    <div ref={ref} style={{ fontFamily: "var(--g-font-display)", fontSize: size || "clamp(40px, 6.4vw, 96px)", lineHeight: 1.04, letterSpacing: "-0.022em", color: color || "var(--g-verde-900)", fontStyle: italic ? "italic" : "normal", fontWeight: weight, margin: 0 }}>
      {words.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)", verticalAlign: "top", paddingTop: "0.32em", paddingBottom: "0.32em", marginTop: "-0.32em", marginBottom: "-0.32em", lineHeight: 1.04, marginRight: wi === words.length - 1 ? 0 : "0.28em" }}>
          <span style={{ display: "inline-block", transform: seen ? "translateY(0) skewY(0)" : "translateY(112%) skewY(6deg)", opacity: seen ? 1 : 0, filter: seen ? "blur(0)" : "blur(6px)", transition: `transform 900ms cubic-bezier(.2,.7,.2,1) ${delay + wi * 90}ms, opacity 900ms ${delay + wi * 90}ms, filter 900ms ${delay + wi * 90}ms` }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- Brand-color palettes ---------- */
type Pal = { main: string; dark: string; light: string; soft: string; line: string; wheel: string[] };
const PAL: Record<string, Pal> = {
  verde:      { main: "#627761", dark: "#3e4c40", light: "#9aad99", soft: "#f1f3ef", line: "#dde2d8",    wheel: ["#9aad99","#7e9078","#627761","#4f6151","#869a82","#3e4c40"] },
  petroleo:   { main: "#233653", dark: "#1a2840", light: "#647394", soft: "#e9edf2", line: "#ccd4e0",    wheel: ["#97a4ba","#647394","#3d4f72","#2c3f5f","#7c8aa6","#233653"] },
  cafe:       { main: "#a4986f", dark: "#6f664a", light: "#cdc3a3", soft: "#f7f3e6", line: "#e8e0c9",    wheel: ["#ddd4b6","#cdc3a3","#bcb088","#a4986f","#d4cbac","#8a7f5c"] },
  verdeClaro: { main: "#9aad99", dark: "#5d7059", light: "#bccbbb", soft: "#eef2ed", line: "#d8e0d6",    wheel: ["#cdd8cc","#bccbbb","#9aad99","#869a82","#aab9a6","#7e9078"] },
};

/* =====================================================================
   ILUSTRACIÓN 01 · Rueda de pastoreo rotacional
===================================================================== */
function BPPaddockWheel({ c = PAL.verde }: { c?: Pal }) {
  const [ref, seen] = useBPReveal();
  const cx = 100, cy = 100, rOut = 78, rIn = 30, sectors = 6;
  const greens = c.wheel;
  const wedge = (i: number) => {
    const a0 = (i / sectors) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / sectors) * Math.PI * 2 - Math.PI / 2;
    const p = (r: number, a: number): [number, number] => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [x0, y0] = p(rOut, a0), [x1, y1] = p(rOut, a1);
    const [x2, y2] = p(rIn, a1), [x3, y3] = p(rIn, a0);
    return `M${x0},${y0} A${rOut},${rOut} 0 0 1 ${x1},${y1} L${x2},${y2} A${rIn},${rIn} 0 0 0 ${x3},${y3} Z`;
  };
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <g style={{ transformOrigin: "100px 100px", animation: seen ? "bp-spin 40s linear infinite" : "none" }}>
          {Array.from({ length: sectors }).map((_, i) => (
            <path key={i} d={wedge(i)} fill={greens[i]} stroke="var(--g-beige)" strokeWidth="2" style={{ opacity: seen ? 1 : 0, transition: `opacity 500ms ease ${i * 90}ms` }} />
          ))}
        </g>
        <circle cx={cx} cy={cy} r={rIn - 6} fill="var(--g-beige)" stroke={c.line} strokeWidth="1.5" />
        <g style={{ transformOrigin: "100px 100px", animation: seen ? "bp-spin 8s linear infinite" : "none" }}>
          <circle cx={cx} cy={cy - (rOut + 10)} r="7" fill={c.dark} stroke="var(--g-beige)" strokeWidth="2.5" />
          <path d={`M${cx},${cy} L${cx},${cy - (rOut + 4)}`} stroke={c.dark} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx={cx} cy={cy} r="5" fill={c.dark} />
      </svg>
    </div>
  );
}

/* =====================================================================
   ILUSTRACIÓN 02 · Riego
===================================================================== */
function BPIrrigation({ c = PAL.petroleo }: { c?: Pal }) {
  const [ref, seen] = useBPReveal();
  const heads = [50, 100, 150];
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        {heads.map((hx, i) => (
          <g key={i}>
            <path d={`M${hx},70 q-26,-26 -50,4`} fill="none" stroke={c.light} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6" style={{ opacity: seen ? 0.85 : 0, transition: `opacity 600ms ease ${i * 140}ms` }} />
            <path d={`M${hx},70 q26,-26 50,4`}  fill="none" stroke={c.light} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6" style={{ opacity: seen ? 0.85 : 0, transition: `opacity 600ms ease ${i * 140}ms` }} />
            <line x1={hx} y1={70} x2={hx} y2={118} stroke={c.dark} strokeWidth="3" strokeLinecap="round" />
            <circle cx={hx} cy={68} r="4.5" fill={c.main} />
            {[0, 1, 2].map((d) => (
              <ellipse key={d} cx={hx} cy={80} rx="2.6" ry="4" fill={c.main} style={{ transformOrigin: `${hx}px 80px`, animation: seen ? `bp-drop 1.8s ease-in ${(i * 0.3 + d * 0.5)}s infinite` : "none", opacity: 0 }} />
            ))}
          </g>
        ))}
        <rect x="10" y="118" width="180" height="46" rx="8" fill={c.line} />
        <line x1="20" y1="140" x2="180" y2="140" stroke={c.main} strokeWidth="2.5" strokeDasharray="200" style={{ strokeDashoffset: seen ? 0 : 200, transition: "stroke-dashoffset 1400ms var(--g-ease-out) 400ms" } as CSSProperties} />
        {[28, 56, 84, 112, 140, 168].map((gx, i) => (
          <path key={gx} d={`M${gx},164 q-3,-14 0,-22 q3,8 0,22`} fill={c.main} style={{ transformOrigin: `${gx}px 164px`, animation: seen ? `bp-sway 3s ease-in-out ${i * 0.2}s infinite` : "none", opacity: seen ? 1 : 0, transition: `opacity 500ms ease ${500 + i * 80}ms` }} />
        ))}
      </svg>
    </div>
  );
}

/* =====================================================================
   ILUSTRACIÓN 03 · Escudo de salud
===================================================================== */
function BPHealthShield({ c = PAL.cafe }: { c?: Pal }) {
  const [ref, seen] = useBPReveal();
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <path d="M100,28 L160,50 V104 C160,140 132,162 100,174 C68,162 40,140 40,104 V50 Z" fill={c.soft} stroke={c.main} strokeWidth="3" style={{ strokeDasharray: 520, strokeDashoffset: seen ? 0 : 520, transition: "stroke-dashoffset 1500ms var(--g-ease-out) 200ms" } as CSSProperties} />
        <polyline points="56,108 80,108 90,86 104,128 116,108 144,108" fill="none" stroke={c.dark} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 170, animation: seen ? "bp-beat 2.4s var(--g-ease-soft) infinite" : "none", strokeDashoffset: seen ? undefined : 170 } as CSSProperties} />
        <g style={{ opacity: seen ? 1 : 0, transform: seen ? "scale(1)" : "scale(0.4)", transformOrigin: "138px 60px", transition: "opacity 400ms ease 1100ms, transform 500ms var(--g-ease-out) 1100ms" }}>
          <circle cx="138" cy="60" r="16" fill={c.main} />
          <path d="M138,52 V68 M130,60 H146" stroke="var(--g-beige)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/* =====================================================================
   ILUSTRACIÓN 04 · ADN + medidor de preñez
===================================================================== */
function BPGeneGauge({ c = PAL.verdeClaro }: { c?: Pal }) {
  const [ref, seen] = useBPReveal();
  const R = 70, C = 2 * Math.PI * R;
  const rungs: React.ReactNode[] = [];
  const hx = 60, top = 40, h = 120, amp = 18, turns = 1.6;
  for (let i = 0; i <= 7; i++) {
    const t = i / 7;
    // Round to 2 decimals to avoid SSR/client floating-point precision mismatch
    const y  = parseFloat((top + t * h).toFixed(2));
    const x1 = parseFloat((hx + amp * Math.sin(t * Math.PI * 2 * turns)).toFixed(2));
    const x2 = parseFloat((hx + amp * Math.sin(t * Math.PI * 2 * turns + Math.PI)).toFixed(2));
    rungs.push(<line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={c.light} strokeWidth="1.6" style={{ opacity: seen ? 1 : 0, transition: `opacity 400ms ease ${300 + i * 80}ms` }} />);
  }
  const helixPath = (phase: number) => {
    let d = ""; const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps; const y = top + t * h;
      const x = hx + amp * Math.sin(t * Math.PI * 2 * turns + phase);
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
    }
    return d;
  };
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <g style={{ animation: seen ? "bp-float 6s ease-in-out infinite" : "none" }}>
          <path d={helixPath(0)} fill="none" stroke={c.main} strokeWidth="2.4" />
          <path d={helixPath(Math.PI)} fill="none" stroke={c.main} strokeWidth="2.4" />
          {rungs}
        </g>
        <g transform="translate(140,100)">
          <circle r={R} fill="none" stroke={c.line} strokeWidth="9" transform="scale(0.62)" />
          <circle r={R} fill="none" stroke={c.main} strokeWidth="9" strokeLinecap="round" transform="rotate(-90) scale(0.62)" style={{ strokeDasharray: C, strokeDashoffset: seen ? C * 0.12 : C, transition: "stroke-dashoffset 1700ms var(--g-ease-out) 300ms" } as CSSProperties} />
          <path d="M0,16 L0,-14 M-9,-5 L0,-15 L9,-5" fill="none" stroke={c.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: seen ? 1 : 0, transition: "opacity 500ms ease 1300ms" }} />
        </g>
      </svg>
    </div>
  );
}

/* =====================================================================
   MÓDULO PRINCIPAL
===================================================================== */
interface Practice {
  id: string; n: string; tag: string; title: string;
  illo: React.ComponentType<{ c?: Pal }>; icon: string; pal: Pal;
  img?: string; lead: string; chips: string[]; note: string;
}

const PRACTICES: Practice[] = [
  { id: "pastoreo", n: "01", tag: "Manejo del forraje",         title: "Pastoreo rotacional",           illo: BPPaddockWheel,  icon: "refresh-cw",  pal: PAL.verde,      img: "/assets/photography/pastoreo-vaquero.png",        lead: "El pastoreo es un instrumento estratégico: rotamos las praderas para mantener la calidad del forraje, mejorar la nutrición y optimizar la ganancia de peso.",                                                  chips: ["Praderas en rotación", "Forraje de calidad", "Más ganancia de peso"],    note: "Cada rotación está planificada, medida y ajustada según las necesidades de búfalos y Nelore — productividad y sostenibilidad." },
  { id: "riegos",   n: "02", tag: "Infraestructura productiva", title: "Nuestros riegos",                illo: BPIrrigation,    icon: "droplets",    pal: PAL.petroleo,   img: "/assets/photography/riego-carrete.png",           lead: "El agua es infraestructura productiva. Nuestro sistema de riego mantiene la carga animal por hectárea estable durante todo el año.",                                                                         chips: ["Carga animal estable", "Producción todo el año", "Leche confiable"],     note: "Una base hídrica que asegura producción de leche confiable y de alta calidad, sin importar la temporada." },
  { id: "vacuna",   n: "03", tag: "Salud del hato",             title: "Vacunación y desparasitación",  illo: BPHealthShield,  icon: "shield-plus", pal: PAL.cafe,       img: "/assets/photography/vacunacion.PNG",                                   lead: "Animales sanos producen más y viven mejor. Vacunamos, desparasitamos y controlamos la salud de búfalos y Nelore de manera constante.",                                                                         chips: ["Vacunación constante", "Control sanitario", "Prevención"],               note: "Prevención que da resultados visibles en todo el sistema productivo." },
  { id: "insem",    n: "04", tag: "Biotecnología reproductiva", title: "Inseminación artificial",       illo: BPGeneGauge,     icon: "dna",         pal: PAL.verdeClaro, img: "/assets/photography/inseminacion-embriones.png",  lead: "La genética importa. Aplicamos biotecnología reproductiva para acelerar la mejora genética, garantizar tasas de preñez óptimas y estandarizar la calidad del hato.",                                        chips: ["Mejora genética", "Preñez óptima", "Calidad estándar"],                  note: "Cada inseminación se mide y se ajusta para maximizar eficiencia y resultados reproductivos." },
];

export default function BuenasPracticasPage() {
  return (
    <>
      <style>{`
        @keyframes bp-spin  { to { transform: rotate(360deg); } }
        @keyframes bp-drop  { 0%{transform:translateY(0);opacity:0} 15%{opacity:1} 100%{transform:translateY(40px);opacity:0} }
        @keyframes bp-sway  { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        @keyframes bp-beat  { 0%{stroke-dashoffset:170} 55%{stroke-dashoffset:0} 100%{stroke-dashoffset:-170} }
        @keyframes bp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes bp-pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.5);opacity:.5} }
        @keyframes bp-scrollDot { 0%{transform:translateY(0);opacity:0} 30%{opacity:1} 75%{transform:translateY(13px);opacity:0} 100%{opacity:0} }
        @keyframes bp-cueFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
      `}</style>
      <BPHero />
      <BPIntro />
      <section style={{ background: "var(--g-bg)", padding: "clamp(16px,2vw,28px) 0 clamp(52px,6vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,56px)" }}>
          {PRACTICES.map((p, i) => <BPPractice key={p.id} {...p} flip={i % 2 === 1} last={i === PRACTICES.length - 1} />)}
        </div>
      </section>
      <BPCTA />
    </>
  );
}

/* =====================================================================
   HERO
===================================================================== */
function BPHero() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = isMobile ? "64px 24px 52px" : "72px 56px 52px";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS Safari no serializa el atributo muted desde SSR — forzarlo por JS
    v.muted = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.load();

    const tryPlay = () => {
      if (!v.paused) return;
      v.play().catch(() => {
        // Autoplay bloqueado: reintentar en el primer toque del usuario
        const onTouch = () => { v.play().catch(() => {}); };
        document.addEventListener("touchstart", onTouch, { once: true });
        document.addEventListener("click", onTouch, { once: true });
      });
    };

    if (v.readyState >= 3) { tryPlay(); } else { v.addEventListener("canplay", tryPlay, { once: true }); }
    const onVisibility = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { v.removeEventListener("canplay", tryPlay); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#0d1a12", color: "var(--g-beige)", display: "flex", flexDirection: "column", justifyContent: "center" }}>

      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        disablePictureInPicture
        preload="auto"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: "brightness(0.55) saturate(0.85)",
          zIndex: 0,
        }}
      >
        <source src="/assets/videos/IMG_2292.MOV" type="video/mp4" />
      </video>

      {/* Overlay verde — mantiene la identidad de color de la sección */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(160deg, rgba(26,33,20,0.72) 0%, rgba(43,55,35,0.55) 50%, rgba(26,33,20,0.68) 100%)" }} />
      {/* Viñeta vertical para legibilidad del texto y del scroll hint */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(8,16,10,0.45) 0%, transparent 30%, transparent 70%, rgba(8,16,10,0.60) 100%)" }} />

      <div style={{ position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto", width: "100%", padding: pad, textAlign: "center" }}>
        <BPReveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 28, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--g-verde-300)" }}>
            <span style={{ width: 40, height: 1, background: "var(--g-verde-300)" }} />
            Hato Guaicaramo · Manejo responsable
            <span style={{ width: 40, height: 1, background: "var(--g-verde-300)" }} />
          </div>
        </BPReveal>
        <h1 style={{ margin: 0, display: "inline-block" }}>
          <BPRise text="Nuestras"         color="rgba(249,246,232,0.64)" size="clamp(34px, 5vw, 70px)" />
          <BPRise text="buenas prácticas." delay={120} color="var(--g-beige)" size="clamp(52px, 9vw, 142px)" />
        </h1>
        <BPReveal delay={520}>
          <p style={{ margin: "30px auto 0", maxWidth: "52ch", fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px, 1.5vw, 21px)", lineHeight: 1.6, color: "rgba(249,246,232,0.88)", textWrap: "pretty" }}>
            Producir bien empieza por hacer las cosas bien. Cuatro prácticas que sostienen la productividad, la salud y la sostenibilidad del hato.
          </p>
        </BPReveal>
      </div>
      <div aria-hidden style={{ position: "absolute", bottom: 38, left: "50%", zIndex: 4, animation: "bp-cueFloat 3s ease-in-out infinite", width: 27, height: 43, borderRadius: 999, border: "1.5px solid rgba(249,246,232,0.45)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
        <span style={{ width: 4, height: 8, borderRadius: 999, background: "rgba(249,246,232,0.85)", animation: "bp-scrollDot 1.9s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* =====================================================================
   INTRO — índice de las 4 prácticas
===================================================================== */
function BPIndexCard({ it, delay }: { it: { n: string; t: string; icon: string; c: Pal }; delay: number }) {
  const [h, setH] = useState(false);
  return (
    <BPReveal delay={delay}>
      <a href={"#bp-" + it.n}
        onClick={(e) => { e.preventDefault(); const el = document.getElementById("bp-" + it.n); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", background: it.c.main, borderRadius: 22, padding: "24px 24px 28px", minHeight: 188, display: "flex", flexDirection: "column", overflow: "hidden", transform: h ? "translateY(-6px)" : "none", boxShadow: h ? "0 22px 48px -16px rgba(26,33,32,0.4)" : "0 8px 22px -12px rgba(26,33,32,0.28)", transition: "transform 300ms var(--g-ease-out), box-shadow 300ms var(--g-ease-out)" }}>
          <span aria-hidden style={{ position: "absolute", top: 18, right: 24, fontFamily: "var(--g-font-display)", fontSize: 30, color: "rgba(249,246,232,0.85)", lineHeight: 1 }}>{it.n}</span>
          <span style={{ display: "inline-flex", width: 46, height: 46, borderRadius: 999, background: "rgba(249,246,232,0.16)", color: "var(--g-beige)", alignItems: "center", justifyContent: "center" }}>
            <HatoIcon name={it.icon} size={21} />
          </span>
          <div style={{ marginTop: "auto", paddingTop: 28, fontFamily: "var(--g-font-display)", fontSize: 25, lineHeight: 1.12, color: "var(--g-beige)" }}>{it.t}</div>
        </div>
      </a>
    </BPReveal>
  );
}

function BPIntro() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isSmall = isMobile || isTablet;
  const pad = isMobile ? "clamp(48px,6vw,80px) 24px clamp(28px,3vw,44px)" : "clamp(48px,6vw,80px) 56px clamp(28px,3vw,44px)";
  const idx = [
    { n: "01", t: "Pastoreo rotacional",          icon: "refresh-cw",  c: PAL.verde },
    { n: "02", t: "Nuestros riegos",               icon: "droplets",    c: PAL.petroleo },
    { n: "03", t: "Vacunación y desparasitación",  icon: "shield-plus", c: PAL.cafe },
    { n: "04", t: "Inseminación artificial",       icon: "dna",         c: PAL.verdeClaro },
  ];
  return (
    <section style={{ background: "var(--g-bg)", padding: pad, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "end", marginBottom: "clamp(40px,5vw,64px)" }}>
          <div>
            <BPReveal>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-verde-600)" }}>
                <span style={{ width: 28, height: 1, background: "var(--g-verde-600)" }} />
                El método
              </div>
            </BPReveal>
            <BPRise text="Cuatro frentes,"      color="var(--g-verde-900)" size="clamp(30px,4.4vw,62px)" />
            <BPRise text="un mismo estándar."   delay={110} color="var(--g-verde-500)" italic size="clamp(30px,4.4vw,62px)" />
          </div>
          <BPReveal delay={160}>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: 0, maxWidth: "46ch", textWrap: "pretty" }}>
              Cada práctica se planifica, se mide y se ajusta. No son rutinas sueltas: forman un sistema que se sostiene entre sí.
            </p>
          </BPReveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(14px,1.6vw,22px)" }}>
          {idx.map((it, i) => <BPIndexCard key={it.n} it={it} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   PRÁCTICA — fila alterna con ilustración animada + conector
===================================================================== */
interface PracticeProps extends Practice { flip: boolean; last: boolean; }
function BPPractice({ id: _id, n, tag, title, illo, icon, lead, chips, note, flip, last, pal = PAL.verde, img }: PracticeProps) {
  const Illo = illo;
  const c = pal;
  const [ref, seen] = useBPReveal();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isSmall = isMobile || isTablet;
  return (
    <div id={"bp-" + n} ref={ref} style={{ position: "relative", paddingTop: "clamp(40px,6vw,72px)", paddingBottom: last ? 0 : "clamp(40px,6vw,72px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : (flip ? "1fr 1.05fr" : "1.05fr 1fr"), gap: "clamp(36px,5vw,80px)", alignItems: "center" }}>
        {/* Illustration column */}
        <div style={{ order: isSmall ? -1 : (flip ? 2 : 1) }}>
          <BPReveal>
            {img ? (
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "1 / 1", border: `1px solid ${c.line}`, boxShadow: "0 20px 50px -20px rgba(26,33,32,0.28)" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(35,54,83,0) 40%, ${c.dark}cc 100%)` }} />
                <span aria-hidden style={{ position: "absolute", top: 16, left: 22, fontFamily: "var(--g-font-display)", fontSize: "clamp(54px,7vw,96px)", color: "rgba(249,246,232,0.9)", lineHeight: 1, textShadow: "0 2px 14px rgba(8,16,26,0.45)" }}>{n}</span>
                <span style={{ position: "absolute", bottom: 18, left: 22, display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: c.main, color: "var(--g-beige)", fontFamily: "var(--g-font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em" }}>
                  <HatoIcon name={icon} size={15} /> {tag}
                </span>
              </div>
            ) : (
              <div style={{ position: "relative", background: c.soft, border: `1px solid ${c.line}`, borderRadius: 24, padding: "clamp(28px,4vw,48px)", aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 20px 50px -20px rgba(26,33,32,0.2)" }}>
                <span aria-hidden style={{ position: "absolute", top: 10, left: 22, fontFamily: "var(--g-font-display)", fontSize: "clamp(70px,10vw,130px)", color: c.line, lineHeight: 1, userSelect: "none" }}>{n}</span>
                <Illo c={c} />
              </div>
            )}
          </BPReveal>
        </div>

        {/* Text column */}
        <div style={{ order: isSmall ? 1 : (flip ? 1 : 2) }}>
          <BPReveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: 11, background: c.main, color: "var(--g-beige)", alignItems: "center", justifyContent: "center" }}>
                <HatoIcon name={icon} size={20} />
              </span>
              <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: c.dark }}>{tag}</span>
            </div>
          </BPReveal>
          <BPRise text={title} color={c.dark} size="clamp(30px,4vw,54px)" />
          <BPReveal delay={140}>
            <p style={{ fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65, color: "var(--g-cafe-700)", margin: "18px 0 22px", maxWidth: "52ch", textWrap: "pretty" }}>{lead}</p>
          </BPReveal>
          <BPReveal delay={220}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 22 }}>
              {chips.map((cp) => (
                <span key={cp} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.soft, color: c.dark, border: `1px solid ${c.line}`, borderRadius: 999, padding: "8px 15px", fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 7, background: c.main, animation: "bp-pulseDot 2.4s ease-in-out infinite" }} />
                  {cp}
                </span>
              ))}
            </div>
          </BPReveal>
          <BPReveal delay={300}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingLeft: 16, borderLeft: `2px solid ${c.light}` }}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 15, lineHeight: 1.6, color: c.dark, fontStyle: "italic", margin: 0, maxWidth: "50ch", textWrap: "pretty" }}>{note}</p>
            </div>
          </BPReveal>
        </div>
      </div>

      {/* connector to next */}
      {!last && (
        <div aria-hidden style={{ display: "flex", justifyContent: "center", marginTop: "clamp(28px,4vw,52px)" }}>
          <div style={{ width: 2, height: 56, background: `linear-gradient(${c.light}, ${c.soft})`, transformOrigin: "top", transform: seen ? "scaleY(1)" : "scaleY(0)", transition: "transform 700ms var(--g-ease-out) 300ms" }} />
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   CTA
===================================================================== */
function BPCTA() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const pad = isMobile ? "clamp(48px,6vw,80px) 24px" : "clamp(48px,6vw,80px) 56px";
  return (
    <section style={{ position: "relative", background: "var(--g-verde-900)", color: "var(--g-beige)", padding: pad, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 120%, rgba(98,119,97,0.34), transparent 60%)" }} />
      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", padding: isMobile ? "0 24px" : "0 56px", textAlign: "center" }}>
        <BPRise text="Hacer las cosas bien, todos los días." color="var(--g-beige)" size="clamp(30px,4.4vw,64px)" />
        <BPReveal delay={260}>
          <div style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <BPCtaLink href="/" solid>Volver al inicio</BPCtaLink>
            <BPCtaLink href="/genetica-talla-mundial">Genética de talla mundial</BPCtaLink>
            <BPCtaLink href="/nutricion-animal">Nutrición animal</BPCtaLink>
          </div>
        </BPReveal>
      </div>
    </section>
  );
}

function BPCtaLink({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center", fontFamily: "var(--g-font-sans)", fontSize: 15, fontWeight: 500, letterSpacing: "0.02em", padding: "14px 28px", borderRadius: 999, textDecoration: "none", transition: "all 200ms var(--g-ease-soft)", border: "1px solid transparent" };
  const solidStyle: CSSProperties = { background: h ? "#ffffff" : "var(--g-beige)", color: "var(--g-verde-800)", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 14px 30px rgba(8,16,12,0.34)" : "0 6px 16px rgba(8,16,12,0.22)" };
  const outlineStyle: CSSProperties = { background: h ? "rgba(249,246,232,0.12)" : "transparent", color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.42)" };
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...(solid ? solidStyle : outlineStyle) }}>{children}</a>
  );
}
