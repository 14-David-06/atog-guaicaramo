'use client'

import { useState } from "react";
import type { CSSProperties } from "react";
import { HatoIcon } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/* staggered fade-up animation helper */
function qsRise(i = 0): CSSProperties {
  return {
    animation: `qsFadeUp 700ms cubic-bezier(.4,.05,.2,1) ${0.08 * i}s both`,
  };
}

export default function QuienesSomos() {
  const bp        = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const noParallax = isMobile || isTablet;

  const secPad = isMobile ? "32px 20px" : isTablet ? "40px 32px" : "48px 56px";

  return (
    <div id="quienes" style={{ background: "var(--g-bg)" }}>

      {/* 1 · HERO — image left, copy right */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.92), rgba(249,246,232,0.92)), url('/assets/photography/bufalas-grupo-pastura.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: isMobile ? "72px 20px 40px" : isTablet ? "60px 32px 40px" : "32px 56px 56px",
        borderBottom: "1px solid var(--g-line)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.95fr 1.05fr",
            gap: isMobile ? 32 : 64,
            alignItems: "stretch",
            minHeight: isMobile ? "auto" : 480,
          }}>
            {/* Image side */}
            <div style={{ position: "relative", ...qsRise(0) }}>
              <div style={{
                position: "relative",
                height: "100%",
                minHeight: isMobile ? 240 : 460,
                borderRadius: 14, overflow: "hidden",
                background: "var(--g-stone-100)",
              }}>
                <img
                  src="/assets/photography/hero-nelore-hato.jpg"
                  alt="Hato Guaicaramo — sabana llanera"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <a
                  href="https://www.instagram.com/reel/DMIYlnxRTdh/?igsh=cThsdWt5dnd4Nnhj"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    position: "absolute", left: 20, bottom: 20,
                    textDecoration: "none",
                    animation: "qsFloat 5s ease-in-out infinite",
                  }}
                >
                  <VideoCtaButton />
                </a>
              </div>
            </div>

            {/* Copy side */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", ...qsRise(1) }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-verde-500)", marginBottom: 20,
              }}>
                <span style={{ width: 24, height: 1, background: "var(--g-verde-500)" }} />
                Sobre nosotros
              </div>

              <h1 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(44px, 5vw, 72px)",
                lineHeight: 1.02, letterSpacing: "-0.022em",
                color: "var(--g-verde-800)", fontWeight: 400, margin: 0,
                textWrap: "balance",
              }}>
                Hato <em style={{ fontStyle: "italic", color: "var(--g-verde-700)" }}>Guaicaramo.</em>
              </h1>

              <p style={{
                marginTop: 20,
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.55,
                color: "var(--g-fg-muted)", maxWidth: "52ch", textWrap: "pretty",
              }}>
                Empresa ganadera especializada en genética de talla mundial y sistemas
                eficientes de producción animal para el trópico colombiano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · QUIÉNES SOMOS — split layout */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(183,173,145,0.88), rgba(183,173,145,0.88)), url('/assets/photography/bufalos-pastura-cordillera.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: noParallax ? "scroll" : "fixed",
        padding: secPad,
        borderTop: "1px solid var(--g-line)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr",
            gap: isMobile ? 32 : 64,
            alignItems: "start",
          }}>
            <div style={{ ...qsRise(0) }}>
              <div style={{
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-petroleo-900)", marginBottom: 20,
              }}>Quiénes somos</div>

              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(32px, 3.4vw, 48px)",
                lineHeight: 1.02, letterSpacing: "-0.018em",
                color: "var(--g-petroleo-900)", fontWeight: 400, margin: 0,
              }}>
                Genética, nutrición y manejo.{" "}
                <em style={{ color: "var(--g-beige)", fontStyle: "italic" }}>
                  El sistema completo.
                </em>
              </h2>

              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { icon: "flask-conical", label: "Genética mundial" },
                  { icon: "trending-up",   label: "Más kg / ha" },
                  { icon: "layers",        label: "Enfoque integral" },
                ].map((p) => (
                  <PillarChip key={p.label} icon={p.icon} label={p.label} />
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 18, ...qsRise(2) }}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.6,
                color: "var(--g-petroleo-900)", margin: 0, textWrap: "pretty",
              }}>
                Somos una empresa ganadera especializada en <strong style={{ color: "var(--g-petroleo-900)" }}>genética de talla mundial</strong> y
                en la creación de sistemas eficientes de producción animal para el trópico.
              </p>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.6,
                color: "var(--g-petroleo-900)", margin: 0, textWrap: "pretty",
              }}>
                Nuestro propósito es claro: contribuir con el desarrollo del trópico,
                produciendo más kilos de carne y litros de leche por hectárea, con un
                enfoque social, ambiental y económico.
              </p>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.6,
                color: "var(--g-petroleo-900)", margin: 0, textWrap: "pretty",
              }}>
                Invertimos en genética, nutrición y manejo porque entendemos que la
                <strong style={{ color: "var(--g-petroleo-900)" }}> rentabilidad está en los ciclos productivos</strong>, no en la improvisación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · MÉTRICAS — capability strip con íconos flotantes */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.91), rgba(249,246,232,0.91)), url('/assets/photography/bufalas-pastoreo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: noParallax ? "scroll" : "fixed",
        padding: secPad,
        borderTop: "1px solid var(--g-line)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
            gap: 24, textAlign: "center",
          }}>
            {[
              { name: "flask-conical", label: "Genética",       color: "#233653", delay: "0s" },
              { name: "sprout",        label: "Sabana",         color: "#627761", delay: "0.6s" },
              { name: "heart-pulse",   label: "Bienestar",      color: "#9AAD99", delay: "1.2s" },
              { name: "award",         label: "Calidad",        color: "#B7AD91", delay: "0.3s" },
              { name: "leaf",          label: "Sostenibilidad", color: "#233653", delay: "0.9s" },
            ].map((it) => (
              <div key={it.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 56, height: 56, borderRadius: 999,
                  border: "1px solid " + it.color,
                  background: it.color,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: "var(--g-beige)",
                  animation: `qsFloat 4.2s ease-in-out ${it.delay} infinite`,
                }}>
                  <HatoIcon name={it.name} size={24} />
                </span>
                <div style={{
                  fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.10em", textTransform: "uppercase",
                  color: it.color,
                }}>{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · MISIÓN Y VISIÓN */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.90), rgba(249,246,232,0.90)), url('/assets/photography/nelore-grupo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: noParallax ? "scroll" : "fixed",
        padding: secPad,
        borderTop: "1px solid var(--g-line)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 32, ...qsRise(0) }}>
            <div style={{
              fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--g-verde-700)",
            }}>Propósito</div>
            <span style={{ flex: 1, height: 1, background: "var(--g-line)" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 16 : 22,
          }}>
            {[
              {
                icon: "target",
                title: "Misión",
                body: "Guaicaramo es una empresa dedicada al desarrollo de la agroindustria, con énfasis en la palma de aceite y sus derivados, comprometida con la sostenibilidad, la comunidad, sus empleados, socios y clientes, siguiendo principios de calidad y eficiencia.",
              },
              {
                icon: "eye",
                title: "Visión",
                body: "Ser una empresa líder reconocida en Colombia en el sector de la palma de aceite, biocombustibles, ganadería, derivados lácteos y agricultura, satisfaciendo mercados nacionales e internacionales en beneficio de los clientes, la comunidad y sus socios.",
              },
            ].map((card, i) => <MisionVisionCard key={card.title} {...card} delay={i} />)}
          </div>
        </div>
      </section>

      {/* 6 · VALORES CORPORATIVOS */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(249,246,232,0.90), rgba(249,246,232,0.90)), url('/assets/photography/bufalas-grupo-pastura.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: noParallax ? "scroll" : "fixed",
        padding: secPad,
        borderTop: "1px solid var(--g-line)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: 32, flexWrap: "wrap", marginBottom: 32,
          }}>
            <div>
              <div style={{
                fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--g-verde-700)", marginBottom: 12,
              }}>Valores corporativos</div>
              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.05, color: "var(--g-verde-800)", fontWeight: 400,
                margin: 0, maxWidth: "20ch",
              }}>
                Cuatro principios que <em style={{ color: "var(--g-verde-700)", fontStyle: "italic" }}>guían</em> cada decisión.
              </h2>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 18,
          }}>
            {[
              { icon: "flame",        num: "01", title: "Pasión",         desc: "Caminamos hacia la excelencia en cada acción.",                    tone: "#233653", tint: "rgba(35,54,83,0.16)" },
              { icon: "shield-check", num: "02", title: "Transparencia",  desc: "Promovemos la confianza en todas las partes interesadas.",        tone: "#627761", tint: "rgba(98,119,97,0.18)" },
              { icon: "rocket",       num: "03", title: "Emprendimiento", desc: "Retamos al statu quo en toda la organización.",                  tone: "#9AAD99", tint: "rgba(154,173,153,0.28)" },
              { icon: "compass",      num: "04", title: "Liderazgo",      desc: "Motivamos, inspiramos y empoderamos para encontrar soluciones.", tone: "#B7AD91", tint: "rgba(183,173,145,0.28)" },
            ].map((v, i) => <ValorCard key={v.title} {...v} delay={i} />)}
          </div>
        </div>
      </section>

      {/* 7 · CITA EDITORIAL */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(40,55,42,0.88), rgba(40,55,42,0.88)), url('/assets/photography/bufalo-trabajo-palma.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: noParallax ? "scroll" : "fixed",
        padding: isMobile ? "40px 20px" : "64px 56px",
        borderTop: "1px solid var(--g-verde-800)", overflow: "hidden",
      }}>
        {!isMobile && (
          <span aria-hidden="true" style={{
            position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
            fontFamily: "var(--g-font-display)", fontSize: 360, lineHeight: 1,
            color: "var(--g-verde-700)", opacity: 0.35, pointerEvents: "none",
            userSelect: "none",
          }}>{'"'}</span>
        )}

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--g-font-display)",
            fontSize: "clamp(28px, 3vw, 40px)",
            lineHeight: 1.25, letterSpacing: "-0.012em",
            color: "var(--g-beige)", fontWeight: 400, fontStyle: "italic",
            margin: 0, textWrap: "pretty",
          }}>
            La rentabilidad está en los <em style={{ fontStyle: "italic", color: "var(--g-cafe-300)" }}>ciclos productivos</em>, no en la improvisación.
          </p>
          <div style={{
            marginTop: 28, display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.20em", textTransform: "uppercase",
            color: "var(--g-cafe-300)",
          }}>
            <span style={{ width: 32, height: 1, background: "var(--g-cafe-400)" }} />
            Hato Guaicaramo
            <span style={{ width: 32, height: 1, background: "var(--g-cafe-400)" }} />
          </div>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes qsFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes qsFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes qsPlayPulse {
          0%   { transform: scale(1);    opacity: 0.55; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- VideoCtaButton ---------- */
function VideoCtaButton() {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "12px 20px 12px 12px",
        background: "rgba(249,246,232,0.94)",
        backdropFilter: "blur(8px)",
        border: "1px solid " + (h ? "var(--g-verde-500)" : "var(--g-line)"),
        borderRadius: 999,
        boxShadow: h ? "0 14px 30px rgba(8,16,26,0.18)" : "0 6px 16px rgba(8,16,26,0.10)",
        transition: "all 240ms var(--g-ease-soft)",
        transform: h ? "translateY(-2px)" : "none",
        cursor: "pointer",
      }}
    >
      <span style={{
        position: "relative",
        width: 42, height: 42, borderRadius: 999,
        background: "var(--g-verde-500)", color: "var(--g-beige)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <span aria-hidden="true" style={{
          position: "absolute", inset: 0, borderRadius: 999,
          border: "1px solid var(--g-verde-500)",
          animation: "qsPlayPulse 2.2s ease-out infinite",
        }} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span>
        <span style={{
          display: "block",
          fontFamily: "var(--g-font-sans)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--g-cafe-700)", marginBottom: 2,
        }}>CONOCE NUESTRA HISTORIA</span>
        <span style={{
          display: "block",
          fontFamily: "var(--g-font-display)", fontSize: 17,
          color: h ? "var(--g-verde-700)" : "var(--g-verde-800)",
          lineHeight: 1.1,
          transition: "color 240ms var(--g-ease-soft)",
        }}>Ver video</span>
      </span>
    </span>
  );
}

/* ---------- PillarChip ---------- */
function PillarChip({ icon, label }: { icon: string; label: string }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500,
        color: h ? "var(--g-beige)" : "var(--g-verde-700)",
        background: h ? "var(--g-verde-500)" : "var(--g-beige)",
        border: "1px solid " + (h ? "var(--g-verde-500)" : "var(--g-verde-200)"),
        borderRadius: 999, padding: "10px 16px",
        transition: "all 220ms var(--g-ease-soft)",
        cursor: "default",
      }}
    >
      <HatoIcon name={icon} size={14} />
      {label}
    </span>
  );
}

/* ---------- MisionVisionCard ---------- */
function MisionVisionCard({ icon, title, body, delay }: { icon: string; title: string; body: string; delay: number }) {
  const [h, setH] = useState(false);
  const initial = title.charAt(0);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: 18, padding: "40px 36px 38px 40px",
        background: h
          ? "linear-gradient(135deg, rgba(252,247,235,0.88) 0%, rgba(216,224,212,0.85) 100%)"
          : "rgba(216,224,212,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid " + (h ? "#D8E0D4" : "rgba(255,255,255,0.5)"),
        transition: "all 360ms var(--g-ease-soft)",
        transform: h ? "translateY(-6px)" : "none",
        boxShadow: h
          ? "0 30px 60px rgba(216,224,212,0.85), 0 0 0 10px rgba(216,224,212,0.45), 0 8px 20px rgba(98,119,97,0.18)"
          : "0 8px 22px rgba(216,224,212,0.40)",
        cursor: "default",
        ...qsRise(delay),
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", top: -40, right: -40,
        width: 220, height: 220, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(216,224,212,0.85) 0%, transparent 70%)",
        opacity: h ? 1 : 0,
        transition: "opacity 360ms var(--g-ease-soft)",
        pointerEvents: "none",
      }} />

      <span aria-hidden="true" style={{
        position: "absolute", right: -16, bottom: -64,
        fontFamily: "var(--g-font-display)", fontSize: 280, lineHeight: 1,
        color: "#D8E0D4",
        opacity: h ? 0.85 : 0.55,
        userSelect: "none", pointerEvents: "none",
        transform: h ? "translateY(-6px)" : "none",
        transition: "all 480ms var(--g-ease-soft)",
        fontStyle: "italic",
      }}>{initial}</span>

      <span aria-hidden="true" style={{
        position: "absolute", left: 0, top: 36, width: 3,
        height: h ? "calc(100% - 72px)" : "60%",
        background: "linear-gradient(180deg, var(--g-verde-500) 0%, #D8E0D4 100%)",
        borderRadius: 999,
        transition: "height 420ms var(--g-ease-soft)",
      }} />

      <span aria-hidden="true" style={{
        position: "absolute", top: 18, right: 22,
        width: 32, height: 32,
        opacity: h ? 1 : 0.5,
        transform: h ? "rotate(45deg)" : "rotate(0deg)",
        transition: "all 480ms var(--g-ease-soft)",
        color: "var(--g-verde-700)",
      }}>
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M16 4v24M4 16h24" opacity="0.6" />
          <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <div style={{ position: "relative" }}>
        <span style={{
          position: "relative",
          width: 56, height: 56, borderRadius: 999,
          background: h ? "var(--g-verde-500)" : "var(--g-verde-50)",
          color: h ? "var(--g-beige)" : "var(--g-verde-700)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 22,
          boxShadow: h ? "0 0 0 8px rgba(98,119,97,0.14)" : "none",
          transition: "all 360ms var(--g-ease-soft)",
        }}>
          <HatoIcon name={icon} size={26} />
        </span>

        <h3 style={{
          fontFamily: "var(--g-font-display)",
          fontSize: 36, lineHeight: 1.0, letterSpacing: "-0.018em",
          color: h ? "var(--g-verde-800)" : "var(--g-verde-700)",
          fontWeight: 400, margin: "0 0 18px",
          transition: "color 320ms var(--g-ease-soft)",
        }}>
          <em style={{ fontStyle: "italic" }}>{title}</em>
          <span style={{
            display: "block", marginTop: 8,
            width: h ? 48 : 28, height: 1,
            background: "#D8E0D4",
            transition: "width 360ms var(--g-ease-soft)",
          }} />
        </h3>

        <p style={{
          fontFamily: "var(--g-font-sans)", fontSize: 15.5, lineHeight: 1.65,
          color: "var(--g-cafe-700)", margin: 0, textWrap: "pretty",
        }}>{body}</p>
      </div>
    </div>
  );
}

/* ---------- ValorCard ---------- */
function ValorCard({ icon, num, title, desc, tone, delay }: {
  icon: string; num: string; title: string; desc: string;
  tone: string; tint: string; delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const isTouch = useBreakpoint() !== "desktop";
  const toggle = () => setFlipped((f) => !f);
  return (
    <div style={{ ...qsRise(delay) }}>
      <div
        onMouseEnter={isTouch ? undefined : () => setFlipped(true)}
        onMouseLeave={isTouch ? undefined : () => setFlipped(false)}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
        tabIndex={0}
        role="button"
        aria-pressed={flipped}
        aria-label={`${title} — ${desc}`}
        style={{ position: "relative", minHeight: 220, perspective: 1200, cursor: "pointer", touchAction: "manipulation" }}
      >
        <div style={{
          position: "relative", width: "100%", height: "100%", minHeight: 220,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d" as "preserve-3d",
          transition: "transform 600ms cubic-bezier(.4,.05,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* FRONT */}
          <div style={{
            position: "absolute", inset: 0,
            background: tone,
            border: "1px solid " + tone,
            borderRadius: 14, padding: "28px 24px",
            overflow: "hidden",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            boxShadow: "0 14px 30px rgba(8,16,26,0.18)",
          }}>
            <span aria-hidden="true" style={{
              position: "absolute", top: 16, right: 18,
              fontFamily: "var(--g-font-display)", fontSize: 38,
              color: "rgba(249,246,232,0.85)", lineHeight: 1,
            }}>{num}</span>
            <span style={{
              width: 48, height: 48, borderRadius: 999,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "rgba(249,246,232,0.22)", color: "var(--g-beige)",
              alignSelf: "flex-start",
            }}>
              <HatoIcon name={icon} size={22} />
            </span>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center",
            }}>
              <h3 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(34px, 2.6vw, 42px)",
                lineHeight: 1.0, letterSpacing: "-0.018em",
                color: "var(--g-beige)", fontWeight: 400, margin: 0,
              }}>{title}</h3>
            </div>
          </div>

          {/* BACK */}
          <div style={{
            position: "absolute", inset: 0,
            background: tone,
            border: "1px solid " + tone,
            borderRadius: 14, padding: "28px 24px",
            overflow: "hidden",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            boxShadow: "0 16px 40px rgba(8,16,26,0.22)",
          }}>
            <span aria-hidden="true" style={{
              position: "absolute", top: 16, right: 18,
              fontFamily: "var(--g-font-display)", fontSize: 38,
              color: "rgba(249,246,232,0.35)", lineHeight: 1,
            }}>{num}</span>
            <span style={{
              width: 48, height: 48, borderRadius: 999,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "rgba(249,246,232,0.18)", color: "var(--g-beige)",
              alignSelf: "flex-start",
            }}>
              <HatoIcon name={icon} size={22} />
            </span>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.55,
                color: "var(--g-beige)", margin: 0, textWrap: "pretty", fontWeight: 400,
              }}>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
