'use client'

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { HatoIcon } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type {
  SanityNuestrosBufalosPage,
  SanityNBPillar,
  SanityNBIndex,
  SanityNBTrait,
  SanityNBStat,
  SanityNBLinea,
} from "@/sanity/queries/nuestrosBufalosPage";

/* ---------- Reveal-on-scroll ---------- */
function useNBReveal() {
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

interface NBRevealProps { children: React.ReactNode; delay?: number; as?: React.ElementType; y?: number; dur?: number; style?: CSSProperties; }
function NBReveal({ children, delay = 0, as = "div", y = 18, dur = 760, style }: NBRevealProps) {
  const [ref, seen] = useNBReveal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;
  return (
    <Tag ref={ref} style={{ opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ---------- Animated number counter ---------- */
interface NBCountProps { to: number; dur?: number; decimals?: number; sep?: boolean; suffix?: string; }
function NBCount({ to, dur = 1600, decimals = 0, sep = false, suffix = "" }: NBCountProps) {
  const [ref, seen] = useNBReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf: number;
    let start: number;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const snap = setTimeout(() => setVal(to), dur + 120);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(snap); };
  }, [seen, to, dur]);
  let out = val.toFixed(decimals);
  if (sep) out = Number(out).toLocaleString("es-CO");
  return <span ref={ref}>{out}{suffix}</span>;
}

/* ---------- Word-rise heading line ---------- */
interface NBRiseLineProps { text: string; delay?: number; color?: string; italic?: boolean; size?: string; }
function NBRiseLine({ text, delay = 0, color, italic = false, size }: NBRiseLineProps) {
  const [ref, seen] = useNBReveal();
  const words = text.split(" ");
  return (
    <div ref={ref} style={{ fontFamily: "var(--g-font-display)", fontSize: size || "clamp(40px, 6.4vw, 96px)", lineHeight: 1.04, letterSpacing: "-0.022em", color: color || "var(--g-beige)", fontStyle: italic ? "italic" : "normal", fontWeight: 400, margin: 0 }}>
      {words.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)", verticalAlign: "top", paddingTop: "0.32em", paddingBottom: "0.32em", marginTop: "-0.32em", marginBottom: "-0.32em", lineHeight: 1.04, marginRight: wi === words.length - 1 ? 0 : "0.28em" }}>
          <span style={{ display: "inline-block", transform: seen ? "translateY(0) skewY(0)" : "translateY(112%) skewY(6deg)", opacity: seen ? 1 : 0, filter: seen ? "blur(0)" : "blur(6px)", transition: `transform 900ms cubic-bezier(.2,.7,.2,1) ${delay + wi * 90}ms, opacity 900ms ${delay + wi * 90}ms, filter 900ms ${delay + wi * 90}ms` }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/* ===================================================================== */

const RAW_PILLARS: SanityNBPillar[] = [
  { icon: "dna",        title: "Genética",  description: "que funciona" },
  { icon: "leaf",       title: "Nutrición", description: "que sostiene el sistema" },
  { icon: "settings-2", title: "Manejo",    description: "que estabiliza la producción" },
];

const RAW_INDEX: SanityNBIndex[] = [
  { num: "01", title: "Búfalos de trabajo", desc: "Fuerza · resistencia · docilidad" },
  { num: "02", title: "Búfalas para leche", desc: "Tecnología · registro · gestión" },
  { num: "03", title: "Búfalos para carne", desc: "Nutrición · genética · manejo" },
];

const RAW_TRABAJO_TRAITS: SanityNBTrait[] = [
  { key: "Fuerza",      desc: "Tracción y capacidad operativa",         pct: 92 },
  { key: "Resistencia", desc: "Adaptados a sistemas rurales exigentes", pct: 78 },
  { key: "Docilidad",   desc: "Manejo seguro y predecible",             pct: 64 },
];

const RAW_LECHE_STATS: SanityNBStat[] = [
  { numValue: 2,    numSuffix: '',   numSep: false, label: "salas de ordeño",    sublabel: "Tecnología de punta" },
  { numValue: 950,  numSuffix: '+',  numSep: false, label: "búfalas ordeñadas",  sublabel: "2 veces al día" },
  { numValue: 4500, numSuffix: '',   numSep: true,  label: "litros diarios",     sublabel: "Producción medida y cercana" },
  { numValue: 5,    numSuffix: ' L', numSep: false, label: "promedio por animal", sublabel: "Medido y registrado" },
];

const RAW_CARNE_CHIPS = ["Sal proteinada propia", "Pasto Brachiaria Humidicola"];

const RAW_CARNE_LINEA: SanityNBLinea[] = [
  { key: "Machos de levante",   desc: "Crecimiento eficiente bajo manejo planificado.",           pct: 88 },
  { key: "Toros reproductores", desc: "75% mediterráneos, de búfalas élite de nuestros ordeños.", pct: 75 },
  { key: "Bubillas preñadas",   desc: "Hembras de reposición listas para el sistema.",            pct: 62 },
];

/**
 * Página completa de Nuestros Búfalos.
 * Acepta contenido opcional de Sanity; todos los campos caen al contenido
 * hardcodeado si Sanity no ha sido publicado aún.
 */
export default function NuestrosBufalos({ sanityData }: { sanityData?: SanityNuestrosBufalosPage | null }) {
  const d = sanityData ?? null;
  return (
    <>
      <style>{`
        @keyframes nb-floatBg { 0%{transform:translate3d(0,0,0) scale(1.04)} 100%{transform:translate3d(-3%,2%,0) scale(1.12)} }
        @keyframes nb-scrollDot { 0%{transform:translateY(0);opacity:0} 30%{opacity:1} 75%{transform:translateY(13px);opacity:0} 100%{opacity:0} }
        @keyframes nb-cueFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes nb-pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.55);opacity:.5} }
      `}</style>
      <BufHero
        heroImageUrl={d?.heroImageUrl}
        eyebrow={d?.heroEyebrow}
        title1={d?.heroTitle1}
        title2={d?.heroTitle2}
        description={d?.heroDescription}
      />
      <SistemaIntro
        label={d?.sistemaLabel}
        heading1={d?.sistemaHeading1}
        heading2={d?.sistemaHeading2}
        pillars={d?.sistemaPillars}
        body={d?.sistemaBody}
      />
      <PilaresIndex items={d?.pilaresIndex} />
      <BufalosTrabajo
        photoUrl={d?.trabajoPhotoUrl}
        subtitle={d?.trabajoSubtitle}
        heading={d?.trabajoHeading}
        body={d?.trabajoBody}
        traits={d?.trabajoTraits}
      />
      <BufalasLeche
        photoUrl={d?.lechePhotoUrl}
        heading={d?.lecheHeading}
        description={d?.lecheDescription}
        stats={d?.lecheStats}
      />
      <BufalosCarne
        photoUrl={d?.carnePhotoUrl}
        heading={d?.carneHeading}
        body={d?.carneBody}
        chips={d?.carneChips}
        linea={d?.carneLinea}
      />
      <BufalosCTA heading={d?.ctaHeading} />
    </>
  );
}

/* =====================================================================
   HERO
===================================================================== */
interface BufHeroProps { heroImageUrl?: string | null; eyebrow?: string; title1?: string; title2?: string; description?: string; }
function BufHero({ heroImageUrl, eyebrow, title1, title2, description }: BufHeroProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const pad = isMobile ? "64px 24px 40px" : "72px 56px 40px";
  const bgSrc = heroImageUrl ?? '/assets/photography/bufalos-pastura-cordillera.jpg';
  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "var(--g-petroleo-900)", color: "var(--g-beige)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `url('${bgSrc}')`, backgroundSize: "cover", backgroundPosition: "center", animation: "nb-floatBg 22s ease-in-out infinite alternate" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,16,26,0.78) 0%, rgba(8,16,26,0.42) 38%, rgba(8,16,26,0.72) 78%, rgba(8,16,26,0.96) 100%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 78% 30%, rgba(61,79,114,0.30), transparent 52%)" }} />

      <div style={{ position: "relative", maxWidth: contentMax, margin: "0 auto", width: "100%", padding: pad, flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <NBReveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 26, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--g-petroleo-200)" }}>
            <span style={{ width: 40, height: 1, background: "var(--g-petroleo-200)" }} />
            {eyebrow ?? 'Hato Guaicaramo · Sistema bufalino'}
          </div>
        </NBReveal>

        <h1 style={{ margin: 0 }}>
          <NBRiseLine text={title1 ?? 'Nuestros'} color="rgba(249,246,232,0.62)" size="clamp(28px, 4vw, 58px)" />
          <NBRiseLine text={title2 ?? 'Búfalos'} delay={120} size="clamp(64px, 11vw, 168px)" />
        </h1>

        <NBReveal delay={520}>
          <p style={{ marginTop: 30, maxWidth: "44ch", fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px, 1.5vw, 21px)", lineHeight: 1.6, color: "rgba(249,246,232,0.86)", textWrap: "pretty" }}>
            {description
              ? description
              : <>No trabajamos el búfalo como una especie más. Lo integramos como un <strong style={{ color: "var(--g-beige)" }}>sistema productivo real</strong>.</>
            }
          </p>
        </NBReveal>
      </div>

      <div aria-hidden style={{ position: "absolute", bottom: 38, left: "50%", zIndex: 3, animation: "nb-cueFloat 3s ease-in-out infinite", width: 27, height: 43, borderRadius: 999, border: "1.5px solid rgba(249,246,232,0.45)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
        <span style={{ width: 4, height: 8, borderRadius: 999, background: "rgba(249,246,232,0.85)", animation: "nb-scrollDot 1.9s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* =====================================================================
   SISTEMA — manifest intro (light)
===================================================================== */
interface SistemaIntroProps { label?: string; heading1?: string; heading2?: string; pillars?: SanityNBPillar[] | null; body?: string; }
function SistemaIntro({ label, heading1, heading2, pillars, body }: SistemaIntroProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const pad = isMobile ? "clamp(40px,6vw,72px) 24px" : "clamp(40px,6vw,72px) 56px";
  const resolvedPillars = pillars?.length ? pillars : RAW_PILLARS;
  return (
    <section style={{ background: "var(--g-bg)", padding: `clamp(40px,6vw,72px) 0`, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, transparent calc(50% - .5px), rgba(61,79,114,0.05) calc(50% - .5px), rgba(61,79,114,0.05) calc(50% + .5px), transparent calc(50% + .5px))", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: contentMax, margin: "0 auto", padding: pad }}>
        <div style={{ maxWidth: isWide ? 1420 : 1080 }}>
          <NBReveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 30, fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)" }}>
              <span style={{ width: 28, height: 1, background: "var(--g-petroleo-700)" }} />
              {label ?? 'El enfoque'}
            </div>
          </NBReveal>
          <NBRiseLine text={heading1 ?? 'Producimos carne y leche'} color="var(--g-petroleo-900)" size="clamp(34px, 5vw, 78px)" />
          <NBRiseLine text={heading2 ?? 'con una lógica clara.'} delay={120} color="var(--g-petroleo-700)" italic size="clamp(34px, 5vw, 78px)" />
        </div>

        <div style={{ marginTop: "clamp(48px,6vw,84px)", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: "var(--g-line)", border: "1px solid var(--g-line)", borderRadius: 18, overflow: "hidden" }}>
          {resolvedPillars.map((p, i) => (
            <NBReveal key={p.title} delay={i * 110} style={{ background: "var(--g-bg-elevated)" }}>
              <div style={{ padding: "34px 30px 38px", height: "100%" }}>
                <span style={{ display: "inline-flex", width: 46, height: 46, borderRadius: 12, background: "var(--g-petroleo-50)", color: "var(--g-petroleo-700)", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <HatoIcon name={p.icon} size={22} />
                </span>
                <div style={{ fontFamily: "var(--g-font-display)", fontSize: 30, lineHeight: 1.05, color: "var(--g-petroleo-900)", marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 15, color: "var(--g-cafe-700)" }}>{p.description}</div>
              </div>
            </NBReveal>
          ))}
        </div>

        <NBReveal delay={200}>
          <p style={{ marginTop: "clamp(40px,5vw,64px)", maxWidth: "60ch", fontFamily: "var(--g-font-sans)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "var(--g-cafe-700)", textWrap: "pretty" }}>
            {body ?? 'Manejo que mantiene la producción estable todo el año — y tres frentes que se sostienen entre sí dentro de un mismo modelo.'}
          </p>
        </NBReveal>
      </div>
    </section>
  );
}

/* =====================================================================
   ÍNDICE DE PILARES
===================================================================== */
function PilaresIndex({ items }: { items?: SanityNBIndex[] | null }) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const pad = isMobile ? "clamp(54px,7vw,90px) 24px" : "clamp(54px,7vw,90px) 56px";
  const resolvedItems = items?.length ? items : RAW_INDEX;
  return (
    <section style={{ background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: `clamp(36px,5vw,60px) 0` }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: pad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 0 }}>
          {resolvedItems.map((it, i) => (
            <NBReveal key={it.num} delay={i * 110} style={{
              padding: isMobile ? "16px 24px" : isTablet ? "8px 18px" : "8px 36px",
              borderLeft: !isMobile && i > 0 ? "1px solid rgba(249,246,232,0.16)" : "none",
              borderTop: isMobile && i > 0 ? "1px solid rgba(249,246,232,0.16)" : "none",
            }}>
              <div style={{ fontFamily: "var(--g-font-display)", fontSize: 15, letterSpacing: "0.12em", color: "var(--g-petroleo-200)", marginBottom: 14 }}>{it.num}</div>
              <div style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.08, marginBottom: 10 }}>{it.title}</div>
              <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 13, letterSpacing: "0.04em", color: "rgba(249,246,232,0.62)", textTransform: "uppercase" }}>{it.desc}</div>
            </NBReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   01 · BÚFALOS DE TRABAJO
===================================================================== */
function NBTraitRow({ k, d, delay, pct }: { k: string; d: string; delay: number; pct?: number }) {
  const [ref, seen] = useNBReveal();
  return (
    <NBReveal delay={delay}>
      <div style={{ padding: "14px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: pct !== undefined ? 10 : 0, borderBottom: pct !== undefined ? "none" : "1px solid var(--g-line)" }}>
          <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(18px,1.8vw,22px)", color: "var(--g-petroleo-900)", flexShrink: 0 }}>{k}</span>
          <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 13, color: "var(--g-cafe-700)", textAlign: "right" }}>{d}</span>
        </div>
        {pct !== undefined && (
          <div ref={ref} style={{ height: 3, borderRadius: 2, background: "var(--g-petroleo-100)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              width: seen ? `${pct}%` : "0%",
              background: "linear-gradient(90deg, var(--g-petroleo-800), var(--g-petroleo-600))",
              transition: `width 1000ms cubic-bezier(.2,.7,.2,1) ${delay + 120}ms`,
            }} />
          </div>
        )}
      </div>
    </NBReveal>
  );
}

interface BufTrabajoProps { photoUrl?: string | null; subtitle?: string; heading?: string; body?: string; traits?: SanityNBTrait[] | null; }
function BufalosTrabajo({ photoUrl, subtitle, heading, body, traits }: BufTrabajoProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const hPad = isMobile ? "24px" : isTablet ? "clamp(32px,4vw,56px)" : "clamp(56px,6vw,96px)";
  const resolvedTraits = traits?.length ? traits : RAW_TRABAJO_TRAITS;
  return (
    <section style={{ background: "var(--g-bg)", padding: `clamp(64px,8vw,112px) 0`, overflow: "hidden" }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: `0 ${hPad}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", gap: "clamp(40px,5vw,88px)", alignItems: "center" }}>
          <NBTiltPhoto src={photoUrl ?? '/assets/photography/bufalo-trabajo-palma.jpg'} badge={subtitle ?? 'Búfalos de trabajo'} objectPosition="center" />
          <div>
            <NBReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-200)", lineHeight: 1 }}>01</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)" }}>{subtitle ?? 'Línea de trabajo'}</span>
              </div>
            </NBReveal>
            <NBReveal delay={80}>
              <h2 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(34px,4.4vw,62px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--g-petroleo-900)", fontWeight: 400, margin: "0 0 24px", textWrap: "balance" }}>
                {heading
                  ? heading
                  : <>Fuerza, resistencia y <em style={{ fontStyle: "italic", color: "var(--g-petroleo-700)" }}>adaptabilidad</em>.</>
                }
              </h2>
            </NBReveal>
            <NBReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 36px", maxWidth: "52ch", textWrap: "pretty" }}>
                {body
                  ? body
                  : <>Desarrollamos una línea específica de búfalos de trabajo, adaptados a sistemas productivos rurales que requieren <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>tracción, capacidad operativa y docilidad</strong>.</>
                }
              </p>
            </NBReveal>
            <div style={{ display: "grid", gap: 0 }}>
              {resolvedTraits.map((t, i) => <NBTraitRow key={t.key} k={t.key} d={t.desc} pct={t.pct} delay={i * 120} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NBTiltPhoto({ src, badge, objectPosition = "center", aspectRatio = "4 / 5" }: { src: string; badge: string; objectPosition?: string; aspectRatio?: string }) {
  const [ref, seen] = useNBReveal();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ position: "relative", aspectRatio, opacity: seen ? 1 : 0, transform: `translateY(${seen ? 0 : 26}px) perspective(1200px) rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`, transition: "opacity 900ms var(--g-ease-soft), transform 500ms var(--g-ease-soft)", transformStyle: "preserve-3d" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden", background: "var(--g-stone-100)", boxShadow: "0 30px 80px rgba(8,16,26,0.22)" }}>
        <img src={src} alt={badge} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, transform: `scale(1.07) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`, transition: "transform 600ms var(--g-ease-soft)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(8,16,26,0.5) 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: isMobile ? 16 : -22, bottom: 30, background: "var(--g-beige)", border: "1px solid var(--g-line)", borderRadius: 14, padding: "14px 20px", boxShadow: "0 18px 40px rgba(8,16,26,0.14)", transform: "translateZ(60px)" }}>
        <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--g-petroleo-700)", marginBottom: 4 }}>Hato Guaicaramo</div>
        <div style={{ fontFamily: "var(--g-font-display)", fontSize: 19, color: "var(--g-petroleo-900)" }}>{badge}</div>
      </div>
    </div>
  );
}

/* =====================================================================
   02 · BÚFALAS PARA LECHE
===================================================================== */
interface BufalasLecheProps { photoUrl?: string | null; heading?: string; description?: string; stats?: SanityNBStat[] | null; }
function BufalasLeche({ photoUrl, heading, description, stats }: BufalasLecheProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const hPad = isMobile ? "24px" : isTablet ? "clamp(32px,4vw,56px)" : "clamp(56px,6vw,96px)";
  const resolvedStats = stats?.length ? stats : RAW_LECHE_STATS;

  return (
    <section style={{ background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: `clamp(64px,8vw,112px) 0`, overflow: "hidden" }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: `0 ${hPad}` }}>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr", gap: "clamp(40px,5vw,72px)", alignItems: "center", marginBottom: "clamp(32px,4vw,52px)" }}>
          <div>
            <NBReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-400)", lineHeight: 1 }}>02</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-300)" }}>Búfalas para leche</span>
              </div>
            </NBReveal>
            <NBReveal delay={80}>
              <h2 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(34px,4.4vw,62px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--g-beige)", fontWeight: 400, margin: "0 0 20px", textWrap: "balance" }}>
                {heading
                  ? heading
                  : <>La producción no se <em style={{ fontStyle: "italic", color: "var(--g-petroleo-200)" }}>deja al azar</em>.</>
                }
              </h2>
            </NBReveal>
            <NBReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "rgba(249,246,232,0.72)", margin: 0, maxWidth: "52ch", textWrap: "pretty" }}>
                {description ?? 'Cada búfala está identificada. Sabemos cuánto produce, cómo responde al manejo y cómo se comporta dentro del sistema.'}
              </p>
            </NBReveal>
          </div>

          <NBTiltPhoto src={photoUrl ?? '/assets/illustrations/lecheria.webp'} badge="Búfalas para leche" objectPosition="center" aspectRatio="5 / 4" />
        </div>

        <NBReveal delay={120} style={{ background: "rgba(249,246,232,0.04)", border: "1px solid rgba(249,246,232,0.08)", borderRadius: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 0 }}>
            {resolvedStats.map((s, i) => (
              <NBReveal key={s.label} delay={i * 100 + 120} style={{ padding: isMobile ? "20px 16px" : "28px 24px" }}>
                <div style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(26px,3vw,42px)", color: "var(--g-beige)", lineHeight: 1, marginBottom: 6 }}>
                  <NBCount to={s.numValue} suffix={s.numSuffix ?? ''} sep={s.numSep ?? false} />
                </div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 13, color: "rgba(249,246,232,0.65)", lineHeight: 1.3, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, color: "var(--g-petroleo-300)", letterSpacing: "0.04em" }}>{s.sublabel}</div>
              </NBReveal>
            ))}
          </div>
        </NBReveal>

      </div>
    </section>
  );
}

/* =====================================================================
   03 · BÚFALOS PARA CARNE
===================================================================== */
interface BufalosCarneProps { photoUrl?: string | null; heading?: string; body?: string; chips?: string[] | null; linea?: SanityNBLinea[] | null; }
function BufalosCarne({ photoUrl, heading, body, chips, linea }: BufalosCarneProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1900 : 1440;
  const hPad = isMobile ? "24px" : isTablet ? "clamp(32px,4vw,56px)" : "clamp(56px,6vw,96px)";
  const resolvedChips = chips?.length ? chips : RAW_CARNE_CHIPS;
  const resolvedLinea = linea?.length ? linea : RAW_CARNE_LINEA;
  return (
    <section style={{ background: "var(--g-bg)", padding: `clamp(64px,8vw,112px) 0`, overflow: "hidden" }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: `0 ${hPad}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", gap: "clamp(40px,5vw,88px)", alignItems: "center" }}>
          <NBTiltPhoto src={photoUrl ?? '/assets/photography/bufalas-grupo-pastura.jpg'} badge="Búfalos para carne" objectPosition="center" />
          <div>
            <NBReveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(40px,5vw,64px)", color: "var(--g-petroleo-200)", lineHeight: 1 }}>03</span>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-petroleo-700)" }}>Búfalos para carne</span>
              </div>
            </NBReveal>
            <NBReveal delay={80}>
              <h2 style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(34px,4.6vw,66px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--g-petroleo-900)", fontWeight: 400, margin: "0 0 24px", textWrap: "balance" }}>
                {heading
                  ? heading
                  : <>Una especie <em style={{ fontStyle: "italic", color: "var(--g-petroleo-700)" }}>altamente eficiente</em>.</>
                }
              </h2>
            </NBReveal>
            <NBReveal delay={160}>
              <p style={{ fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 28px", maxWidth: "52ch", textWrap: "pretty" }}>
                {body
                  ? body
                  : <>Lo desarrollamos bajo un sistema basado en <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>nutrición estratégica, genética funcional y manejo planificado</strong>.</>
                }
              </p>
            </NBReveal>
            <NBReveal delay={220}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
                {resolvedChips.map((c) => (
                  <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--g-petroleo-50)", color: "var(--g-petroleo-700)", borderRadius: 999, padding: "9px 16px", fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 7, background: "var(--g-petroleo-500)", animation: "nb-pulseDot 2.4s ease-in-out infinite" }} />
                    {c}
                  </span>
                ))}
              </div>
            </NBReveal>
            <div style={{ display: "grid", gap: 0 }}>
              {resolvedLinea.map((l, i) => <NBTraitRow key={l.key} k={l.key} d={l.desc} pct={l.pct} delay={i * 120} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   CTA
===================================================================== */
function BufalosCTA({ heading }: { heading?: string }) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isWide = bp === "wide";
  const contentMax = isWide ? 1300 : 1000;
  const pad = isMobile ? "clamp(48px,6vw,80px) 24px" : "clamp(48px,6vw,80px) 56px";
  return (
    <section style={{ position: "relative", background: "var(--g-petroleo-900)", color: "var(--g-beige)", padding: `clamp(48px,6vw,80px) 0`, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 120%, rgba(61,79,114,0.32), transparent 60%)" }} />
      <div style={{ position: "relative", maxWidth: contentMax, margin: "0 auto", padding: pad, textAlign: "center" }}>
        <NBRiseLine text={heading ?? 'Aquí la producción se construye.'} color="var(--g-beige)" size="clamp(32px,4.6vw,68px)" />
        <NBReveal delay={260}>
          <div style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <NBCtaLink href="/" solid>Volver al inicio</NBCtaLink>
            <NBCtaLink href="/nutricion-animal">Nutrición animal</NBCtaLink>
          </div>
        </NBReveal>
      </div>
    </section>
  );
}

function NBCtaLink({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--g-font-sans)", fontSize: 15, fontWeight: 500, letterSpacing: "0.02em", padding: "14px 28px", borderRadius: 999, textDecoration: "none", transition: "all 200ms var(--g-ease-soft)", border: "1px solid transparent" };
  const solidStyle: CSSProperties = { background: h ? "#ffffff" : "var(--g-beige)", color: "var(--g-petroleo-800)", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 14px 30px rgba(8,16,26,0.32)" : "0 6px 16px rgba(8,16,26,0.2)" };
  const outlineStyle: CSSProperties = { background: h ? "rgba(249,246,232,0.12)" : "transparent", color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.42)" };
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...(solid ? solidStyle : outlineStyle) }}>{children}</a>
  );
}
