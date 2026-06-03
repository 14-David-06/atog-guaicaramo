'use client'

import { useState, useEffect, useRef } from "react";
import { HatoBtn } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { HatoIcon } from "./primitivos";

const STATS = [
  { val: "18m",  label: "Ciclo de producción",    icon: "trending-down" },
  { val: "+30%", label: "Ganancia de peso diaria", icon: "trending-up"   },
  { val: "CIA",  label: "Programa certificado",    icon: "award"         },
];

export default function Genetica() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isSmall = bp === "mobile" || bp === "tablet";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVis(true); return; }
    const io = new IntersectionObserver(
      (e) => { e.forEach((x) => { if (x.isIntersecting) { setVis(true); io.disconnect(); } }); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const en = (d: number) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.65s var(--g-ease-out) ${d}ms, transform 0.65s var(--g-ease-out) ${d}ms`,
  });

  return (
    <section id="genetica" ref={ref} style={{ background: "var(--g-bg)", padding: isMobile ? "20px 0" : "clamp(14px,1.8vw,24px) 0" }}>
      <style>{`@keyframes g-spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{
        margin: isMobile ? 0 : "0 auto",
        maxWidth: isMobile ? "none" : "min(calc(100% - clamp(160px,20vw,320px)), 1440px)",
        borderRadius: isMobile ? 0 : "clamp(14px,1.2vw,22px)",
        overflow: "hidden",
        display: isSmall ? "flex" : "grid",
        gridTemplateColumns: isSmall ? undefined : "1fr 1.1fr",
        flexDirection: isSmall ? "column" : undefined,
        minHeight: isSmall ? "auto" : "clamp(400px,42vw,520px)",
        boxShadow: "0 24px 64px rgba(8,16,26,0.12)",
      }}>

        {/* ── LEFT: Foto ── */}
        <div style={{ position: "relative", minHeight: isSmall ? 220 : "auto", overflow: "hidden" }}>
          <img src="/assets/photography/nelore-novo.jpg" alt="Nelore CIA" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "60% 38%",
            opacity: vis ? 1 : 0, transition: "opacity 1.2s var(--g-ease-out)",
          }} />
          {/* Gradiente oscuro */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,42,30,0.55) 0%, rgba(26,42,30,0.25) 50%, rgba(26,42,30,0.65) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(26,42,30,0.5) 0%, transparent 60%)" }} />
          {/* Badge */}
          <div style={{ position: "absolute", bottom: 20, left: 20, background: "var(--g-verde-700)", borderRadius: 10, padding: "9px 16px" }}>
            <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--g-beige)" }}>Hato Guaicaramo</span>
          </div>
        </div>

        {/* ── RIGHT: Panel claro ── */}
        <div style={{
          background: "var(--g-bg)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: isSmall ? "28px 24px 36px" : "clamp(32px,4vw,52px) clamp(32px,4vw,52px)",
          borderLeft: isSmall ? "none" : "1px solid var(--g-line)",
        }}>
          {/* Título */}
          <div style={{ ...en(0), marginBottom: "clamp(10px,1.4vw,18px)" }}>
            <h2 style={{
              fontFamily: "var(--g-font-display)",
              fontSize: isSmall ? "clamp(34px,8vw,48px)" : "clamp(38px,5vw,66px)",
              lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "var(--g-verde-700)", fontWeight: 400, margin: 0,
            }}>
              Nelore CIA<br />
              <em style={{ fontStyle: "italic", color: "var(--g-verde-500)" }}>Ciclo Corto</em>
            </h2>
          </div>

          {/* Línea acento */}
          <div style={{ ...en(80), width: 40, height: 3, background: "var(--g-verde-500)", borderRadius: 2, marginBottom: "clamp(14px,1.8vw,22px)" }} />

          {/* Cuerpo */}
          <p style={{ ...en(140), fontFamily: "var(--g-font-sans)", fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.7, color: "var(--g-cafe-700)", margin: "0 0 clamp(20px,2.5vw,32px)", textWrap: "pretty", maxWidth: "40ch" }}>
            Invertimos en <strong style={{ color: "var(--g-verde-800)" }}>genética de talla mundial</strong> que <strong style={{ color: "var(--g-verde-800)" }}>reduce los ciclos de producción</strong> y acelera los resultados. Trabajamos bajo el <strong style={{ color: "var(--g-verde-800)" }}>programa CIA</strong>, el estándar más exigente de la ganadería tropical.
          </p>

          {/* Stats */}
          <div style={{ ...en(200), display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, paddingTop: "clamp(16px,2vw,24px)", borderTop: "1px solid var(--g-line)", marginBottom: "clamp(20px,2.5vw,32px)" }}>
            {STATS.map((s) => (
              <div key={s.val} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <HatoIcon name={s.icon} size={13} color="var(--g-verde-500)" />
                  <span style={{ fontFamily: "var(--g-font-display)", fontSize: "clamp(18px,2.2vw,26px)", color: "var(--g-petroleo-900)", lineHeight: 1 }}>{s.val}</span>
                </div>
                <span style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, color: "var(--g-cafe-700)", lineHeight: 1.4 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ ...en(300) }}>
            <HatoBtn variant="secondary" size="md" href="/genetica-talla-mundial">Ver más &nbsp;→</HatoBtn>
          </div>
        </div>

      </div>
    </section>
  );
}
