'use client'

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { HatoIcon } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/* ---------- Types ---------- */
type Ingredient = { k: string; d: string; icon: string };

/* ---------- Data ---------- */
const SAL_INGREDIENTS: Ingredient[] = [
  { k: "Torta de palmiste",   d: "Energía y proteína vegetal",           icon: "leaf"       },
  { k: "Sal marina",          d: "Macroelementos y palatabilidad",       icon: "droplet"    },
  { k: "Torta de soya",       d: "Proteína de alta calidad",             icon: "sprout"     },
  { k: "Urea",                d: "Nitrógeno no proteico para rumen",     icon: "atom"       },
  { k: "Harina de arroz",     d: "Energía y digestibilidad",             icon: "wheat"      },
  { k: "Fosfato monocálcico", d: "Fósforo y calcio biodisponibles",      icon: "diamond"    },
  { k: "Carbonato de calcio", d: "Mineralización ósea y reproducción",   icon: "circle-dot" },
  { k: "Azufre molido",       d: "Síntesis de proteína microbiana",      icon: "flame"      },
];

/* ---------- useReveal hook — IntersectionObserver ---------- */
function useReveal(opts: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      },
      { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

/* ---------- Reveal wrapper ---------- */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  y?: number;
  dur?: number;
  style?: CSSProperties;
}
function Reveal({ children, delay = 0, as = "div", y = 16, dur = 720, style }: RevealProps) {
  const [ref, seen] = useReveal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${dur}ms var(--g-ease-soft) ${delay}ms, transform ${dur}ms var(--g-ease-soft) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* =====================================================================
   MAIN EXPORT
===================================================================== */
export default function NutricionAnimal() {
  return (
    <>
      <NutricionHero />
      <FabricaIntro />
      <ManifestoFabrica />
      <SalProteinada />
      <PastosBrachiaria />
    </>
  );
}

/* =====================================================================
   1 · HERO — video de fondo (sin cambios — ya es responsive)
===================================================================== */
function NutricionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // canplay fires when the browser has buffered enough to start — most reliable on mobile
    v.addEventListener("canplay", tryPlay);

    // Low Power Mode / Data Saver fallback: play on first user interaction
    const onInteraction = () => tryPlay();
    document.addEventListener("touchstart", onInteraction, { once: true, passive: true });
    document.addEventListener("click", onInteraction, { once: true, passive: true });

    // Resume after tab switch or page restore
    const onVisibility = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", tryPlay);
    window.addEventListener("focus", tryPlay);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <section className="nutricion-video-hero" style={{
      position: "relative", width: "100%",
      overflow: "hidden", background: "#0d130f",
    }}>
      {/* 100svh respeta la barra del navegador móvil; 100vh como fallback */}
      <style>{`
        .nutricion-video-hero {
          height: 100vh;
          height: 100svh;
          min-height: 560px;
        }
        @keyframes g-scrollHint {
          0%   { transform: scaleY(0); opacity: 0; }
          40%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1) translateY(20px); opacity: 0; }
        }
      `}</style>

      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        disablePictureInPicture
        preload="auto"
        poster="/assets/photography/bufalos-pastura-cordillera.jpg"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: "brightness(0.55)",
          zIndex: 0,
        }}
      >
        <source src="/assets/illustrations/DJI_0837.MP4" type="video/mp4" />
      </video>

      <div style={{
        position: "relative", zIndex: 2,
        height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 32px",
      }}>
        <h1 style={{
          fontFamily: "var(--g-font-display)",
          fontSize: "clamp(48px, 7vw, 108px)",
          lineHeight: 1.05, letterSpacing: "-0.018em",
          color: "var(--g-beige)", fontWeight: 400,
          margin: "0 0 28px",
          textWrap: "balance", maxWidth: "16ch",
        }}>
          Alimentación que <em style={{ fontStyle: "italic", color: "#C7D4B5" }}>transforma</em> vidas
        </h1>

        <p style={{
          fontFamily: "var(--g-font-sans)",
          fontSize: "clamp(15px, 1.15vw, 18px)",
          lineHeight: 1.55,
          color: "rgba(249,246,232,0.88)",
          margin: 0, maxWidth: "54ch", textWrap: "pretty",
        }}>
          Soluciones nutricionales de alto rendimiento para el bienestar y productividad de su ganado.
        </p>

        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          color: "rgba(249,246,232,0.7)",
          fontFamily: "var(--g-font-sans)", fontSize: 10,
          letterSpacing: "0.24em", textTransform: "uppercase",
        }}>
          Descubra
          <span style={{
            width: 1, height: 36,
            background: "rgba(249,246,232,0.5)",
            animation: "g-scrollHint 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }} />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   2 · NUESTRA FÁBRICA — manifest intro
===================================================================== */
function FabricaIntro() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const hPad     = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";

  return (
    <section id="nutricion" style={{
      position: "relative", background: "var(--g-bg)",
      padding: isMobile ? "72px 0 60px" : "120px 0 80px",
      borderTop: "1px solid var(--g-line)", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(90deg, transparent calc(50% - 0.5px), rgba(98,119,97,0.06) calc(50% - 0.5px), rgba(98,119,97,0.06) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: hPad, position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
          gap: isMobile ? 48 : 96,
          alignItems: "center",
        }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                fontFamily: "var(--g-font-sans)", fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--g-verde-700)", marginBottom: 28, fontSize: "12px",
              }}>
                <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--g-verde-700)" }} />
                Nuestra fábrica
              </div>
            </Reveal>

            <h2 style={{
              fontFamily: "var(--g-font-display)",
              fontSize: "clamp(40px, 5.2vw, 76px)",
              lineHeight: 1.02, letterSpacing: "-0.022em",
              color: "var(--g-petroleo-900)", fontWeight: 400,
              margin: "0 0 36px", textWrap: "balance",
            }}>
              <Reveal delay={60} as="span" style={{ display: "block" }}>En nuestra fábrica</Reveal>
              <Reveal delay={160} as="span" style={{ display: "block" }}>no solo mezclamos</Reveal>
              <Reveal delay={260} as="span" style={{ display: "block", fontStyle: "italic", color: "var(--g-verde-700)" }}>alimento.</Reveal>
            </h2>

            <Reveal delay={420}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 17, lineHeight: 1.65,
                color: "var(--g-cafe-700)", margin: "0 0 24px",
                maxWidth: "52ch", textWrap: "pretty",
              }}>
                Mezclamos experiencia, precisión y propósito. La planta nace de una
                necesidad real: mejorar nuestros índices reproductivos, elevar la
                productividad y aumentar la carga animal con{" "}
                <em style={{ color: "var(--g-petroleo-900)", fontStyle: "italic" }}>
                  resultados medibles, no promesas
                </em>.
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
                marginTop: 44, paddingTop: 32, borderTop: "1px dashed var(--g-line)",
              }}>
                {[
                  { k: "Reproducción", v: "+ Índices" },
                  { k: "Productividad", v: "Medible" },
                  { k: "Carga animal", v: "Sostenida" },
                ].map((s) => (
                  <div key={s.k}>
                    <div style={{
                      fontFamily: "var(--g-font-sans)", fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "var(--g-fg-subtle)", marginBottom: 8,
                    }}>
                      {s.k}
                    </div>
                    <div style={{
                      fontFamily: "var(--g-font-display)", fontSize: 22,
                      color: "var(--g-petroleo-900)", lineHeight: 1.1,
                    }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <FloatingPhoto isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

function FloatingPhoto({ isMobile = false }: { isMobile?: boolean }) {
  const [ref, seen] = useReveal();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative", aspectRatio: "4 / 5",
        opacity: seen ? 1 : 0,
        transform: `translateY(${seen ? 0 : 24}px) perspective(1200px) rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 4}deg)`,
        transition: "opacity 900ms var(--g-ease-soft), transform 600ms var(--g-ease-soft)",
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: 14,
        overflow: "hidden", background: "var(--g-stone-100)",
        boxShadow: "0 30px 80px rgba(8,16,26,0.18)",
      }}>
        <img
          src="/assets/photography/bufalas-pastoreo.jpg"
          alt="Fábrica de nutrición Hato Guaicaramo"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(1.06) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
            transition: "transform 600ms var(--g-ease-soft)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 55%, rgba(8,16,26,0.55) 100%)",
        }} />
      </div>

      {/* Chips absolutas — ocultas en móvil para evitar overflow del viewport */}
      {!isMobile && (
        <div style={{
          position: "absolute", left: -28, bottom: 36, width: "82%",
          background: "var(--g-petroleo-800)", color: "var(--g-beige)",
          borderRadius: 14, padding: "22px 26px",
          boxShadow: "0 24px 48px rgba(8,16,26,0.28)",
          transform: "translateZ(40px)",
        }}>
          <div style={{
            fontFamily: "var(--g-font-sans)", fontSize: 10,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--g-verde-300)", marginBottom: 10,
          }}>Filosofía</div>
          <div style={{
            fontFamily: "var(--g-font-display)", fontSize: 22,
            lineHeight: 1.2, fontStyle: "italic", textWrap: "balance",
          }}>
            Lo que come el animal define su futuro.
          </div>
        </div>
      )}

      {!isMobile && (
        <div style={{
          position: "absolute", top: 24, right: -28,
          background: "var(--g-beige)", border: "1px solid var(--g-line)",
          borderRadius: 14, padding: "16px 20px",
          boxShadow: "0 16px 40px rgba(8,16,26,0.10)",
          transform: "translateZ(60px)", minWidth: 160,
        }}>
          <div style={{
            fontFamily: "var(--g-font-sans)", fontSize: 10,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--g-verde-700)", marginBottom: 6,
          }}>Planta propia</div>
          <div style={{ fontFamily: "var(--g-font-display)", fontSize: 28, color: "var(--g-petroleo-900)", lineHeight: 1 }}>
            100 %
          </div>
          <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 12, color: "var(--g-cafe-700)", marginTop: 4 }}>
            formulación in-situ
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   3 · MANIFESTO — dark band
===================================================================== */
function ManifestoFabrica() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const hPad     = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";

  const lines = [
    { t: "Aquí no formulamos productos.", strike: true },
    { t: "Diseñamos resultados.",          accent: true },
  ];

  return (
    <section style={{
      position: "relative", background: "var(--g-petroleo-900)",
      color: "var(--g-beige)",
      padding: isMobile ? "80px 0" : "140px 0",
      overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 30%, rgba(98,119,97,0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgba(183,173,145,0.14), transparent 50%)",
        animation: "g-floatBg 16s ease-in-out infinite alternate",
      }} />
      <style>{`
        @keyframes g-floatBg {
          0%   { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-3%,2%,0) scale(1.08); }
        }
        @keyframes g-wordRise {
          0%   { transform: translateY(110%) skewY(6deg); opacity: 0; filter: blur(6px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { transform: translateY(0) skewY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes g-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes g-fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: hPad, textAlign: "center" }}>
        <Reveal>
          <div aria-hidden style={{
            width: 80, height: 1, background: "var(--g-verde-300)",
            margin: "0 auto 44px", transformOrigin: "center",
            animation: "g-rule 900ms cubic-bezier(.2,.7,.2,1) 120ms both",
          }} />
        </Reveal>

        {lines.map((l, lineIdx) => {
          const baseDelay = lineIdx * 240;
          const words = l.t.split(" ");
          return (
            <Reveal key={lineIdx}>
              <div style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(42px, 6.4vw, 96px)",
                lineHeight: 1.05, letterSpacing: "-0.022em",
                color: l.accent ? "var(--g-verde-300)" : "var(--g-beige)",
                fontStyle: l.accent ? "italic" : "normal",
                fontWeight: 400, margin: "0 0 8px",
              }}>
                {words.map((w, wi) => (
                  <span key={wi} style={{
                    display: "inline-block",
                    clipPath: "polygon(-100% 0, 200% 0, 200% 100%, -100% 100%)",
                    verticalAlign: "top",
                    paddingTop: "0.35em", paddingBottom: "0.35em",
                    marginTop: "-0.35em", marginBottom: "-0.35em",
                    lineHeight: 1.05,
                    marginRight: wi === words.length - 1 ? 0 : "0.28em",
                  }}>
                    <span style={{
                      display: "inline-block",
                      animation: `g-wordRise 900ms cubic-bezier(.2,.7,.2,1) ${baseDelay + wi * 90}ms both`,
                    }}>
                      {w}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={520}>
          <p style={{
            fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.7,
            color: "rgba(249,246,232,0.78)",
            maxWidth: "58ch", margin: "44px auto 0", textWrap: "pretty",
          }}>
            Mejor reproducción, mayor productividad, más carga animal por hectárea. Una planta integrada al modelo productivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =====================================================================
   4 · SAL PROTEINADA
===================================================================== */
function SalProteinada() {
  const [active, setActive] = useState(0);
  const [auto, setAuto]     = useState(true);

  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const hPad     = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SAL_INGREDIENTS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <section style={{
      position: "relative", background: "var(--g-bg)",
      padding: isMobile ? "72px 0 60px" : "140px 0 120px",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: hPad }}>

        {/* Section header */}
        <div style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "auto 1fr",
          gap: isMobile ? 12 : 96,
          alignItems: isMobile ? "flex-start" : "end",
          marginBottom: isMobile ? 40 : 80,
        }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--g-font-sans)", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--g-verde-700)", fontSize: "12px",
            }}>PRODUCTO</div>
          </Reveal>
          <div style={{ borderBottom: "1px dashed var(--g-line)", paddingBottom: 4 }}>
            <Reveal delay={120}>
              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(44px, 6vw, 92px)",
                lineHeight: 0.98, letterSpacing: "-0.024em",
                color: "var(--g-petroleo-900)", fontWeight: 400,
                margin: 0, textTransform: "uppercase",
              }}>
                Sal <em style={{ fontStyle: "italic", color: "var(--g-verde-700)" }}>Proteinada</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.05fr",
          gap: isMobile ? 48 : 80,
          alignItems: "center",
        }}>

          {/* LEFT — manifest copy */}
          <div>
            <Reveal>
              <div style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(26px, 2.6vw, 36px)",
                lineHeight: 1.18, letterSpacing: "-0.012em",
                color: "var(--g-petroleo-900)", fontStyle: "italic",
                margin: "0 0 28px", textWrap: "balance",
              }}>
                No es un suplemento.<br />
                <span style={{ color: "var(--g-verde-700)" }}>Es parte del sistema productivo.</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.65,
                color: "var(--g-cafe-700)", margin: "0 0 18px",
                maxWidth: "54ch", textWrap: "pretty",
              }}>
                La sal proteinada acompaña al animal{" "}
                <em style={{ color: "var(--g-petroleo-900)", fontStyle: "italic" }}>
                  desde la madre hasta la cría
                </em>
                . No es consumo ocasional — es nutrición integrada al modelo productivo.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.65,
                color: "var(--g-cafe-700)", margin: 0,
                maxWidth: "54ch", textWrap: "pretty",
              }}>
                Esto no es solo alimento. Es un sistema que impulsa{" "}
                <strong style={{ color: "var(--g-petroleo-900)", fontWeight: 500 }}>
                  genética, eficiencia y productividad
                </strong>.
              </p>
            </Reveal>

            {/* Active ingredient detail */}
            <Reveal delay={320}>
              <div style={{
                marginTop: 44, padding: "24px 28px",
                background: "var(--g-bg-elevated, var(--g-stone-50))",
                border: "1px solid var(--g-line)",
                borderRadius: 14, minHeight: 132,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: 3,
                  width: `${(active + 1) / SAL_INGREDIENTS.length * 100}%`,
                  background: "var(--g-verde-500)",
                  transition: "width 600ms var(--g-ease-soft)",
                }} />
                <div style={{
                  fontFamily: "var(--g-font-sans)", fontSize: 10,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "var(--g-verde-700)", marginBottom: 10,
                }}>
                  Ingrediente {String(active + 1).padStart(2, "0")} de {SAL_INGREDIENTS.length}
                </div>
                <div key={active} style={{ animation: "g-fadeUp 500ms var(--g-ease-soft) both" }}>
                  <div style={{
                    fontFamily: "var(--g-font-display)", fontSize: 28,
                    lineHeight: 1.1, color: "var(--g-petroleo-900)", marginBottom: 6,
                  }}>
                    {SAL_INGREDIENTS[active].k}
                  </div>
                  <div style={{
                    fontFamily: "var(--g-font-sans)", fontSize: 14,
                    lineHeight: 1.5, color: "var(--g-cafe-700)",
                  }}>
                    {SAL_INGREDIENTS[active].d}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <IngredientChips
                ingredients={SAL_INGREDIENTS}
                active={active}
                onHover={(i) => { setAuto(false); setActive(i); }}
                onLeave={() => setAuto(true)}
              />
            </Reveal>
          </div>

          {/* RIGHT — product bag */}
          <SalBagView
            active={active}
            ingredients={SAL_INGREDIENTS}
            onHover={(i) => { setAuto(false); setActive(i); }}
            onLeave={() => setAuto(true)}
          />
        </div>
      </div>
    </section>
  );
}

function IngredientChips({ ingredients, active, onHover, onLeave }: {
  ingredients: Ingredient[];
  active: number;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  return (
    <div onMouseLeave={onLeave} style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ingredients.map((ing, i) => {
        const isActive = i === active;
        return (
          <button
            key={ing.k}
            onMouseEnter={() => onHover(i)}
            onFocus={() => onHover(i)}
            style={{
              fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.04em",
              color: isActive ? "var(--g-beige)" : "var(--g-petroleo-800)",
              background: isActive ? "var(--g-verde-500)" : "transparent",
              border: "1px solid " + (isActive ? "var(--g-verde-500)" : "var(--g-line)"),
              borderRadius: 999, padding: "8px 14px",
              cursor: "pointer",
              transition: "all 280ms var(--g-ease-soft)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            <HatoIcon name={ing.icon} size={13} />
            {ing.k}
          </button>
        );
      })}
    </div>
  );
}

function SalBagView({ active: _active, ingredients: _ingredients, onHover: _onHover, onLeave }: {
  active: number;
  ingredients: Ingredient[];
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const [ref, seen]       = useReveal();
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [btnHover, setBtnHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };
  const handleLeave = () => { setTilt({ x: 0, y: 0 }); onLeave?.(); };

  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      opacity: seen ? 1 : 0,
      transform: `translateY(${seen ? 0 : 24}px)`,
      transition: "opacity 900ms var(--g-ease-soft), transform 600ms var(--g-ease-soft)",
    }}>
      <div
        onMouseMove={onMove}
        onMouseLeave={handleLeave}
        style={{
          position: "relative", width: "100%", maxWidth: 820,
          aspectRatio: "1024 / 700",
          transform: `perspective(1200px) rotateX(${tilt.y * -3}deg) rotateY(${tilt.x * 3}deg)`,
          transition: "transform 600ms var(--g-ease-soft)",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src="/assets/photography/sal-proteinada-sacks.png"
          alt="Sacos de Sal Proteinada Hato Guaicaramo"
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(-50%, -50%) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
            width: "118%", height: "auto", objectFit: "contain",
            filter: "drop-shadow(0 30px 50px rgba(8,16,26,0.22))",
            transition: "transform 600ms var(--g-ease-soft)",
            pointerEvents: "none",
          }}
        />
      </div>

      <a
        href="/assets/pdf/Raciones HG Hato Guaicaramo.pdf"
        download="Raciones HG Hato Guaicaramo.pdf"
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          background: btnHover ? "var(--g-petroleo-900)" : "var(--g-petroleo-800)",
          color: "var(--g-beige)", textDecoration: "none",
          borderRadius: 999,
          fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500,
          letterSpacing: "0.04em",
          boxShadow: btnHover ? "0 18px 36px rgba(8,16,26,0.30)" : "0 8px 20px rgba(8,16,26,0.18)",
          transform: btnHover ? "translateY(-2px)" : "translateY(0)",
          transition: "all 240ms var(--g-ease-soft)",
          height: "60px", flexDirection: "row", padding: "15px 22px 14px 18px",
        }}
      >
        <span style={{
          width: 28, height: 28, borderRadius: 999,
          background: "var(--g-verde-500)", color: "var(--g-beige)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </span>
        <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(249,246,232,0.55)",
          }}>Ficha técnica · PDF</span>
          <span style={{ fontFamily: "var(--g-font-display)", fontSize: 17, marginTop: 2 }}>
            Descargar ficha técnica de raciones
          </span>
        </span>
      </a>
    </div>
  );
}

/* =====================================================================
   5 · PASTOS BRACHIARIA HUMIDICOLA
===================================================================== */
function PastosBrachiaria() {
  const SECTORS        = 6;
  const DAYS_PER_SECTOR = 28;
  const TICK_MS        = 220;

  const [day, setDay]   = useState(1);
  const grazing         = Math.floor((day - 1) / DAYS_PER_SECTOR);
  const dayInSector     = (day - 1) % DAYS_PER_SECTOR + 1;
  const totalDays       = SECTORS * DAYS_PER_SECTOR;

  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const hPad     = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";

  useEffect(() => {
    const id = setInterval(() => setDay((d) => d % totalDays + 1), TICK_MS);
    return () => clearInterval(id);
  }, [totalDays]);

  return (
    <section style={{
      position: "relative", background: "var(--g-petroleo-900)",
      color: "var(--g-beige)",
      padding: isMobile ? "72px 0 0" : "140px 0 0",
      overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/assets/photography/pastura-amanecer.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.18, filter: "saturate(0.8)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(8,16,26,0.85) 0%, rgba(8,16,26,0.75) 60%, rgba(8,16,26,0.95) 100%)",
      }} />

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", padding: hPad }}>
        {/* Header — columna única en móvil */}
        <div style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "auto 1fr",
          gap: isMobile ? 12 : 96,
          alignItems: isMobile ? "flex-start" : "end",
          marginBottom: isMobile ? 40 : 80,
        }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--g-verde-300)",
            }}>PASTOS</div>
          </Reveal>
          <div style={{ borderBottom: "1px dashed rgba(249,246,232,0.18)", paddingBottom: 4 }}>
            <Reveal delay={120}>
              <h2 style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(40px, 5.4vw, 84px)",
                lineHeight: 0.98, letterSpacing: "-0.024em",
                color: "var(--g-beige)", fontWeight: 400,
                margin: 0, textTransform: "uppercase",
              }}>
                Barichara <em style={{ fontStyle: "italic", color: "var(--g-verde-300)" }}>HUMIDÍCOLA</em>
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Body — diagrama + copy */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? 64 : 96,
          alignItems: "center",
          paddingBottom: isMobile ? 24 : 120,
        }}>
          <PastureRotation
            grazing={grazing} sectors={SECTORS}
            day={day} dayInSector={dayInSector}
            daysPerSector={DAYS_PER_SECTOR} totalDays={totalDays}
            isMobile={isMobile}
          />

          {/* Copy */}
          <div>
            <Reveal>
              <div style={{
                fontFamily: "var(--g-font-display)",
                fontSize: "clamp(28px, 2.8vw, 40px)",
                lineHeight: 1.18, letterSpacing: "-0.014em",
                color: "var(--g-beige)", fontStyle: "italic",
                margin: "0 0 28px", textWrap: "balance",
              }}>
                Nuestro pasto es <span style={{ color: "var(--g-verde-300)" }}>la base de todo</span>.
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p style={{
                fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.7,
                color: "rgba(249,246,232,0.82)", margin: "0 0 18px",
                maxWidth: "52ch", textWrap: "pretty",
              }}>
                Lo cuidamos y rotamos para garantizar forraje fresco y nutritivo,
                optimizando crecimiento y reproducción. Cada potrero descansa, se
                recupera y vuelve a producir en el momento preciso.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div style={{
                marginTop: 36,
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                gap: 4,
                borderTop: "1px solid rgba(249,246,232,0.12)",
                borderLeft: "1px solid rgba(249,246,232,0.12)",
                maxWidth: isMobile ? 340 : "100%",
                marginInline: isMobile ? "auto" : undefined,
              }}>
                {[
                  { k: "Rotación",     v: "Planificada" },
                  { k: "Forraje",      v: "Fresco continuo" },
                  { k: "Carga animal", v: "Estable" },
                  { k: "Recuperación", v: "Medida" },
                ].map((s) => (
                  <div key={s.k} style={{
                    padding: "20px 18px",
                    borderRight: "1px solid rgba(249,246,232,0.12)",
                    borderBottom: "1px solid rgba(249,246,232,0.12)",
                    textAlign: isMobile ? "center" : "left",
                  }}>
                    <div style={{
                      fontFamily: "var(--g-font-sans)", fontSize: 10,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      color: "var(--g-verde-300)", marginBottom: 6,
                    }}>{s.k}</div>
                    <div style={{
                      fontFamily: "var(--g-font-display)", fontSize: 20,
                      lineHeight: 1.1, color: "var(--g-beige)",
                    }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Closing image band */}
      <div style={{
        position: "relative", width: "100%",
        marginTop: isMobile ? 0 : 200,
        aspectRatio: "24 / 9", maxHeight: 460, overflow: "hidden",
      }}>
        <img
          src="/assets/photography/pastura-sabana.jpg"
          alt="Pastura llanera con cielo abierto"
          loading="lazy" decoding="async"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 92%",
          }}
        />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #08101A 0%, rgba(8,16,26,0.65) 14%, rgba(8,16,26,0.18) 32%, transparent 55%)",
          pointerEvents: "none",
        }} />
      </div>
    </section>
  );
}

/* ---------- PastureRotation SVG ---------- */
function PastureRotation({ grazing, sectors, day: _day, dayInSector, daysPerSector, totalDays: _totalDays, isMobile }: {
  grazing: number; sectors: number; day: number; dayInSector: number;
  daysPerSector: number; totalDays: number; isMobile: boolean;
}) {
  const size   = 520;
  const cx     = size / 2;
  const cy     = size / 2;
  const rOuter = 230;
  const rInner = 90;
  const [ref, seen] = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  type SectorState = { fill: string; label: string; txt: string };
  const sectorState = (i: number): SectorState => {
    const diff = (i - grazing + sectors) % sectors;
    if (diff === 0) return { fill: "var(--g-verde-500)", label: "Pastoreo",         txt: "var(--g-beige)" };
    if (diff === 1) return { fill: "rgba(183,173,145,0.55)", label: "Recuperación", txt: "var(--g-petroleo-900)" };
    return                 { fill: "rgba(154,173,153,0.22)", label: "En reposo",    txt: "var(--g-beige)" };
  };

  const daysUntilGrazing = (i: number) => {
    const diff = (i - grazing + sectors) % sectors;
    if (diff === 0) return 0;
    return (diff - 1) * daysPerSector + (daysPerSector - dayInSector + 1);
  };

  const f = (n: number) => n.toFixed(3);

  const arcPath = (i: number) => {
    const startAng = i / sectors * Math.PI * 2 - Math.PI / 2;
    const endAng   = (i + 1) / sectors * Math.PI * 2 - Math.PI / 2;
    const xs1 = f(cx + Math.cos(startAng) * rOuter); const ys1 = f(cy + Math.sin(startAng) * rOuter);
    const xe1 = f(cx + Math.cos(endAng)   * rOuter); const ye1 = f(cy + Math.sin(endAng)   * rOuter);
    const xs2 = f(cx + Math.cos(startAng) * rInner); const ys2 = f(cy + Math.sin(startAng) * rInner);
    const xe2 = f(cx + Math.cos(endAng)   * rInner); const ye2 = f(cy + Math.sin(endAng)   * rInner);
    return `M ${xs1} ${ys1} A ${rOuter} ${rOuter} 0 0 1 ${xe1} ${ye1} L ${xe2} ${ye2} A ${rInner} ${rInner} 0 0 0 ${xs2} ${ys2} Z`;
  };

  /* ---- Shared sub-elements ---- */
  const regimeRows = [
    { kind: "Con fertiriego",  grazing: "1 día",    rest: "20 días",    tone: "var(--g-verde-500)" },
    { kind: "Sin fertiriego",  grazing: "1–2 días", rest: "30–35 días", tone: "rgba(183,173,145,0.85)" },
  ];

  const regimeCardsEl = (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 16,
      maxWidth: isMobile ? 320 : "100%",
      marginInline: isMobile ? "auto" : undefined,
    }}>
      {regimeRows.map((r) => (
        <div key={r.kind} style={{
          background: "linear-gradient(180deg, rgba(249,246,232,0.06) 0%, rgba(249,246,232,0.02) 100%)",
          border: "1px solid rgba(249,246,232,0.14)",
          borderLeft: "3px solid " + r.tone,
          borderRadius: 10, padding: "16px 18px",
          boxShadow: "0 18px 36px rgba(0,0,0,0.25)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: "1px dashed rgba(249,246,232,0.16)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: r.tone, flexShrink: 0 }} />
            <div style={{ fontFamily: "var(--g-font-sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--g-beige)" }}>
              {r.kind}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontFamily: "var(--g-font-sans)", fontSize: 11, color: "rgba(249,246,232,0.82)" }}>
            <span>
              <span style={{ display: "block", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>Pastoreo</span>
              <b style={{ fontFamily: "var(--g-font-display)", fontWeight: 400, fontSize: 19, color: "var(--g-beige)", lineHeight: 1 }}>{r.grazing}</b>
            </span>
            <span>
              <span style={{ display: "block", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>Descanso</span>
              <b style={{ fontFamily: "var(--g-font-display)", fontWeight: 400, fontSize: 19, color: "var(--g-beige)", lineHeight: 1 }}>{r.rest}</b>
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const labelEl = (
    <div style={{
      textAlign: "center", fontFamily: "var(--g-font-sans)", fontSize: 10,
      letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--g-verde-300)",
    }}>
      Pasto · Búfalos
    </div>
  );

  const legendEl = (
    <div style={{
      display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
      fontFamily: "var(--g-font-sans)", fontSize: 11,
      letterSpacing: "0.06em", color: "rgba(249,246,232,0.78)",
    }}>
      {[
        { c: "var(--g-verde-500)",          l: "Pastoreo",     d: "Vacas comiendo" },
        { c: "rgba(183,173,145,0.85)",       l: "Recuperación", d: "Próximo turno" },
        { c: "rgba(154,173,153,0.35)",       l: "En reposo",    d: "Forraje creciendo" },
      ].map((it) => (
        <div key={it.l} style={{ display: "flex", alignItems: "center", gap: 8 }} title={it.d}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: it.c, display: "inline-block" }} />
          {it.l}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={ref} style={{
      position: "relative", maxWidth: size, margin: "0 auto",
      opacity: seen ? 1 : 0,
      transform: `scale(${seen ? 1 : 0.92}) rotate(${seen ? 0 : -8}deg)`,
      transition: "opacity 900ms var(--g-ease-soft), transform 900ms var(--g-ease-soft)",
    }}>
      {/* SVG cuadrado */}
      <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <radialGradient id="pastureCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1f3050" />
              <stop offset="100%" stopColor="#0d1726" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={rOuter + 24} fill="none" stroke="rgba(249,246,232,0.14)" strokeDasharray="2 8" />

          {Array.from({ length: sectors }).map((_, i) => {
            const s = sectorState(i);
            const isHover = hovered === i;
            return (
              <g key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => h === i ? null : h)}
                style={{ cursor: "default" }}
              >
                <path
                  d={arcPath(i)}
                  fill={s.fill}
                  stroke="var(--g-petroleo-900)"
                  strokeWidth="2"
                  style={{
                    transition: "fill 700ms var(--g-ease-soft), filter 200ms var(--g-ease-soft)",
                    filter: isHover ? "brightness(1.18)" : "none",
                  }}
                />
                {(() => {
                  const ang = (i + 0.5) / sectors * Math.PI * 2 - Math.PI / 2;
                  const tr  = (rOuter + rInner) / 2;
                  const tx  = f(cx + Math.cos(ang) * tr);
                  const ty  = f(cy + Math.sin(ang) * tr);
                  return (
                    <text
                      x={tx} y={ty}
                      textAnchor="middle" dominantBaseline="central"
                      fontFamily="var(--g-font-display)" fontSize="22"
                      fill={s.txt}
                      style={{ transition: "fill 700ms var(--g-ease-soft)", pointerEvents: "none" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={rInner - 4} fill="url(#pastureCenter)" stroke="rgba(249,246,232,0.18)" />

          <g style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${(grazing + 0.5) * (360 / sectors)}deg)`,
            transition: "transform 900ms var(--g-ease-soft)",
          }}>
            <line x1={cx} y1={cy} x2={cx} y2={cy - rOuter + 4} stroke="var(--g-verde-300)" strokeWidth="2" />
            <circle cx={cx} cy={cy - rOuter + 4} r={6} fill="var(--g-verde-300)" />
          </g>
          <circle cx={cx} cy={cy} r={6} fill="var(--g-verde-300)" />
        </svg>

        {/* Buffalo icon */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center", pointerEvents: "none",
          width: 150, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src="/assets/photography/bufalo-line-white.png"
            alt="Búfalo"
            style={{ width: 96, height: "auto", display: "block", opacity: 0.92,
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.35))" }}
          />
        </div>

        {/* Sector hover tooltip */}
        {hovered != null && (() => {
          const s    = sectorState(hovered);
          const wait = daysUntilGrazing(hovered);
          return (
            <div style={{
              position: "absolute", top: -8, left: "50%",
              transform: "translate(-50%, -100%)",
              background: "var(--g-beige)", color: "var(--g-petroleo-900)",
              padding: "10px 14px", borderRadius: 10,
              fontFamily: "var(--g-font-sans)", fontSize: 12,
              whiteSpace: "nowrap", boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
              zIndex: 3, pointerEvents: "none",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--g-verde-700)", marginBottom: 3 }}>
                Potrero {String(hovered + 1).padStart(2, "0")}
              </div>
              <div style={{ fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
              <div style={{ color: "var(--g-cafe-700)", fontSize: 11 }}>
                {wait === 0 ? `Día ${dayInSector} de ${daysPerSector}` : `En ${wait} días entra al pastoreo`}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Móvil: label + leyenda + tarjetas en flujo normal */}
      {isMobile && (
        <div style={{ marginTop: 28 }}>
          {labelEl}
          <div style={{ marginTop: 12 }}>{legendEl}</div>
          <div style={{ marginTop: 24 }}>{regimeCardsEl}</div>
        </div>
      )}

      {/* Desktop: posición absoluta bajo el SVG (comportamiento original) */}
      {!isMobile && (
        <>
          <div style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            bottom: -260, width: 480, maxWidth: "100%",
          }}>
            {regimeCardsEl}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: -34 }}>
            {labelEl}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: -76 }}>
            {legendEl}
          </div>
        </>
      )}
    </div>
  );
}
