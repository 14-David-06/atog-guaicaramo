'use client'

import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const practices = [
  { id: "riegos",   title: "Riegos",                       photo: "/assets/photography/bufalas-pastoreo.jpg",         anchor: "bp-02" },
  { id: "vacuna",   title: "Vacunación y desparasitación", photo: "/assets/photography/testimonio-trabajador-bufalo.jpg", anchor: "bp-03" },
  { id: "insem",    title: "Inseminación artificial",      photo: "/assets/photography/nelore-ejemplar.jpg",           anchor: "bp-04" },
  { id: "pastoreo", title: "Pastoreo rotacional",          photo: "/assets/photography/bufalas-grupo-pastura.jpg",     anchor: "bp-01" },
];

export default function BuenasPracticas() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const secPad   = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, minmax(0, 1fr))";

  return (
    <section id="practicas" style={{
      position: "relative",
      backgroundColor: "#bdb997",
      backgroundImage: "url('/assets/photography/buenas-practicas-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: isMobile ? "60px 0" : "80px 0",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(249,246,232,0.18) 60%, rgba(249,246,232,0.40) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: secPad }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <h2 style={{
            display: "inline-block",
            fontFamily: "var(--g-font-display)",
            fontSize: "clamp(28px, 3.8vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--g-petroleo-900)",
            fontWeight: 400,
            margin: 0,
          }}>
            Nuestras{" "}
            <em style={{ fontStyle: "italic", color: "var(--g-verde-700)" }}>buenas prácticas</em>
          </h2>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            marginTop: 14,
          }}>
            <span style={{ width: 40, height: 1.5, background: "var(--g-petroleo-900)", opacity: 0.35, borderRadius: 2 }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--g-verde-600)", opacity: 0.7 }} />
            <span style={{ width: 40, height: 1.5, background: "var(--g-petroleo-900)", opacity: 0.35, borderRadius: 2 }} />
          </div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: isMobile ? 48 : 22,
          marginTop: 0,
          alignItems: "stretch",
        }}>
          {practices.map((p, i) => <PracticeCard key={p.id} {...p} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ title, photo, anchor, delay: _delay }: { title: string; photo: string; anchor: string; delay: number }) {
  const [hover, setHover] = useState(false);
  const radius = hover ? 30 : 24;

  return (
    <a
      href={`/buenas-practicas#${anchor}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        transform: hover ? "translateY(-6px)" : "none",
        transition: "transform 300ms var(--g-ease-out)",
        cursor: "pointer", textDecoration: "none",
        display: "flex", flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{
        background: "var(--g-bg-elevated)",
        border: "1px solid var(--g-line)",
        borderRadius: radius,
        padding: "30px 26px 30px",
        textAlign: "center",
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: hover
          ? "0 18px 40px -12px rgba(8,16,26,0.22)"
          : "0 6px 18px -10px rgba(8,16,26,0.16)",
        transition: "box-shadow 300ms var(--g-ease-out), border-radius 300ms var(--g-ease-out)",
      }}>
        {/* Circular photo */}
        <div style={{
          width: 132, height: 132, borderRadius: "50%",
          boxShadow: "0 0 0 3px var(--g-verde-300), 0 0 0 6px rgba(154,173,153,0.18)",
          overflow: "hidden", flexShrink: 0,
        }}>
          <img src={photo} alt={title} style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "saturate(0.96) contrast(1.02)",
            transform: hover ? "scale(1.08)" : "scale(1)",
            transition: "transform 600ms var(--g-ease-out)",
          }} />
        </div>

        {/* Accent rule */}
        <div style={{
          height: 2, marginTop: 20, borderRadius: 2,
          width: hover ? 44 : 26, background: "var(--g-verde-300)",
          transition: "width 300ms var(--g-ease-out)",
        }} />

        <h3 style={{
          fontFamily: "var(--g-font-display)", fontSize: 19, lineHeight: 1.2,
          letterSpacing: "0.01em", color: "var(--g-petroleo-900)", fontWeight: 400,
          margin: "14px 0 16px",
        }}>
          {title}
        </h3>

        {/* Botón Ver más */}
        <span style={{
          marginTop: "auto",
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "9px 20px",
          borderRadius: 8,
          border: `1.5px solid ${hover ? "var(--g-verde-600)" : "var(--g-verde-400)"}`,
          background: hover ? "var(--g-verde-500)" : "transparent",
          color: hover ? "var(--g-beige)" : "var(--g-verde-600)",
          transition: "all 220ms var(--g-ease-soft)",
        }}>
          Ver más
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              transform: hover ? "translateX(3px)" : "none",
              transition: "transform 280ms var(--g-ease-out)",
            }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </a>
  );
}
