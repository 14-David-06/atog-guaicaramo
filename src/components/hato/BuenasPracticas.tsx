'use client'

import { useState } from "react";
import { HatoBtn, SectionTitle } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const practices = [
  { id: "riegos",   title: "Riegos",                       photo: "/assets/photography/bufalas-pastoreo.jpg" },
  { id: "vacuna",   title: "Vacunación y desparasitación", photo: "/assets/photography/testimonio-trabajador-bufalo.jpg" },
  { id: "insem",    title: "Inseminación artificial",      photo: "/assets/photography/nelore-ejemplar.jpg" },
  { id: "pastoreo", title: "Pastoreo rotacional",          photo: "/assets/photography/bufalas-grupo-pastura.jpg" },
];

export default function BuenasPracticas() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const secPad  = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, minmax(0, 1fr))";

  return (
    <section id="practicas" style={{
      position: "relative",
      backgroundColor: "#bdb997",
      backgroundImage: "url('/assets/photography/buenas-practicas-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: isMobile ? "60px 0" : "80px 0 80px",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(249,246,232,0.18) 60%, rgba(249,246,232,0.40) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: secPad }}>
        <SectionTitle color="var(--g-petroleo-900)">Nuestras buenas prácticas</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: isMobile ? 48 : 22,
          marginTop: isMobile ? 40 : 72,
        }}>
          {practices.map((p, i) => <PracticeCard key={p.id} {...p} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ title, photo, delay: _delay }: { title: string; photo: string; delay: number }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "50% 50% 20px 20px",
        overflow: "hidden",
        background: "var(--g-beige)",
        boxShadow: hover
          ? "0 22px 50px rgba(8,16,26,0.22)"
          : "0 6px 20px rgba(8,16,26,0.12)",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 300ms var(--g-ease-soft), box-shadow 300ms var(--g-ease-soft)",
      }}
    >
      {/* Imagen — el domo de la card la recorta en arco */}
      <div style={{ position: "relative", height: 220 }}>
        <img
          src={photo} alt={title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "saturate(0.90) contrast(1.04)",
            transform: hover ? "scale(1.07)" : "scale(1)",
            transition: "transform 500ms var(--g-ease-soft)",
          }}
        />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(8,16,26,0.22) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Contenido */}
      <div style={{
        padding: "22px 24px 30px",
        textAlign: "center",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 20,
      }}>
        <h3 style={{
          fontFamily: "var(--g-font-sans)",
          fontSize: 13, lineHeight: 1.35,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--g-petroleo-800)", fontWeight: 500,
          margin: 0,
        }}>
          {title}
        </h3>
        <HatoBtn variant="pillMuted" size="sm">Ver más</HatoBtn>
      </div>
    </div>
  );
}
