'use client'

import { useState, useEffect } from "react";
import { HatoWordmark } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface HatoHeaderProps {
  onNavigate: (id: string) => void;
  active: string;
  inverse?: boolean;
  forceLight?: boolean;
}

const items = [
  { id: "quienes",   label: "QUIÉNES SOMOS",             href: "/quienes-somos"          },
  { id: "practicas", label: "NUESTRAS BUENAS PRÁCTICAS", href: "/buenas-practicas"       },
  { id: "genetica",  label: "GENÉTICA DE TALLA MUNDIAL", href: "/genetica-talla-mundial" },
  { id: "bufalos",   label: "NUESTROS BÚFALOS",          href: "/nuestros-bufalos"       },
  { id: "nutricion", label: "NUTRICIÓN ANIMAL",           href: "/nutricion-animal"      },
];

export default function HatoHeader({ onNavigate, active: _active, inverse: _inverse = true, forceLight = false }: HatoHeaderProps) {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [narrowDesktop, setNarrow]    = useState(true);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isSmall  = isMobile || isTablet;
  // Mantiene hamburger hasta 1200px para evitar overflow del nav
  const showMobileNav = isSmall || narrowDesktop;

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Cierra el drawer al navegar */
  const handleNav = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  const onLight     = forceLight || scrolled;
  const logoInverse = !onLight;
  const linkColor   = onLight ? "var(--g-petroleo-700)" : "var(--g-beige)";

  const containerPad = isMobile ? "14px 20px" : isTablet ? "16px 32px" : "20px 56px";
  const logoHeight   = isMobile ? 36 : isTablet ? 44 : 52;
  const navGap       = isTablet ? 18 : 30;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: onLight ? "rgba(249,246,232,0.95)" : "transparent",
      backdropFilter: onLight ? "blur(12px)" : "none",
      borderBottom: onLight ? "1px solid var(--g-line)" : "1px solid transparent",
      transition: "all 220ms var(--g-ease-soft)",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: containerPad,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav("top"); }} style={{ textDecoration: "none" }}>
          <HatoWordmark height={logoHeight} inverse={logoInverse} />
        </a>

        {/* Nav horizontal — ≥ 1200px */}
        {!showMobileNav && (
          <nav style={{ display: "flex", alignItems: "center", gap: navGap, flexWrap: "nowrap" }}>
            {items.map((it) => (
              <a
                key={it.id}
                href={it.href || "#" + it.id}
                onClick={(e) => {
                  if (it.href) return;
                  e.preventDefault();
                  handleNav(it.id);
                }}
                style={{
                  fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
                  color: linkColor, textDecoration: "none", padding: "6px 0",
                  letterSpacing: "0.03em", whiteSpace: "nowrap",
                }}
              >
                {it.label}
              </a>
            ))}
          </nav>
        )}

        {/* Botón hamburger — < 1200px */}
        {showMobileNav && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 8, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 5,
              color: onLight ? "var(--g-petroleo-700)" : "var(--g-beige)",
            }}
          >
            <span style={{
              display: "block", width: 24, height: 2, background: "currentColor",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              transition: "transform 220ms var(--g-ease-soft)",
            }} />
            <span style={{
              display: "block", width: 24, height: 2, background: "currentColor",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 180ms var(--g-ease-soft)",
            }} />
            <span style={{
              display: "block", width: 24, height: 2, background: "currentColor",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              transition: "transform 220ms var(--g-ease-soft)",
            }} />
          </button>
        )}
      </div>

      {/* Drawer móvil / tablet / desktop estrecho < 1200px */}
      {showMobileNav && (
        <nav
          aria-hidden={!menuOpen}
          style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(249,246,232,0.97)", backdropFilter: "blur(12px)",
            borderBottom: menuOpen ? "1px solid var(--g-line)" : "none",
            maxHeight: menuOpen ? 400 : 0,
            overflow: "hidden",
            transition: "max-height 320ms var(--g-ease-soft)",
          }}
        >
          <div style={{ padding: menuOpen ? "12px 0 20px" : "0" }}>
            {items.map((it) => (
              <a
                key={it.id}
                href={it.href || "#" + it.id}
                onClick={(e) => {
                  if (it.href) { setMenuOpen(false); return; }
                  e.preventDefault();
                  handleNav(it.id);
                }}
                style={{
                  display: "block", padding: "14px 24px",
                  fontFamily: "var(--g-font-sans)", fontSize: 13, fontWeight: 500,
                  color: "var(--g-petroleo-700)", textDecoration: "none",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  borderBottom: "1px solid var(--g-line)",
                }}
              >
                {it.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
