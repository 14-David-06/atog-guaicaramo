'use client'

import { useState } from "react";
import type { CSSProperties } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  FlaskConical, TrendingUp, Layers, Sprout, HeartPulse, Award, Leaf,
  Target, Eye, Flame, ShieldCheck, Rocket, Compass, Droplet, Atom,
  Wheat, Diamond, CircleDot,
  Dna, Settings2, Beef, Check, TimerReset, Sparkles, ArrowUpRight,
  Venus, GitMerge, RefreshCw, Droplets, ShieldPlus,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "flask-conical":  FlaskConical,
  "trending-up":    TrendingUp,
  "layers":         Layers,
  "sprout":         Sprout,
  "heart-pulse":    HeartPulse,
  "award":          Award,
  "leaf":           Leaf,
  "target":         Target,
  "eye":            Eye,
  "flame":          Flame,
  "shield-check":   ShieldCheck,
  "rocket":         Rocket,
  "compass":        Compass,
  "droplet":        Droplet,
  "atom":           Atom,
  "wheat":          Wheat,
  "diamond":        Diamond,
  "circle-dot":     CircleDot,
  "dna":            Dna,
  "settings-2":     Settings2,
  "beef":           Beef,
  "check":          Check,
  "timer-reset":    TimerReset,
  "sparkles":       Sparkles,
  "arrow-up-right": ArrowUpRight,
  "venus":          Venus,
  "git-merge":      GitMerge,
  "refresh-cw":     RefreshCw,
  "droplets":       Droplets,
  "shield-plus":    ShieldPlus,
};

/* ---------- HatoIcon ---------- */
interface HatoIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}
export function HatoIcon({ name, size = 22, color = "currentColor", style }: HatoIconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon width={size} height={size} color={color} style={style} />;
}

/* ---------- HatoBtn ---------- */
type BtnVariant =
  | "primary" | "secondary" | "outline" | "invertedOutline" | "ghost"
  | "pillLight" | "pillDark" | "pillMuted";
type BtnSize = "sm" | "md" | "lg";

interface HatoBtnProps {
  children: React.ReactNode;
  variant?: BtnVariant;
  onClick?: () => void;
  size?: BtnSize;
  href?: string;
}
export function HatoBtn({ children, variant = "primary", onClick, size = "md", href }: HatoBtnProps) {
  const [h, setH] = useState(false);
  const sizes: Record<BtnSize, CSSProperties> = {
    sm: { padding: "7px 14px",  fontSize: 12 },
    md: { padding: "11px 22px", fontSize: 14 },
    lg: { padding: "14px 28px", fontSize: 15 },
  };
  const variants: Record<BtnVariant, CSSProperties> = {
    primary:        { background: h ? "var(--g-petroleo-700)" : "var(--g-petroleo-600)", color: "var(--g-beige)" },
    secondary:      { background: h ? "var(--g-verde-700)"   : "var(--g-verde-500)",    color: "var(--g-beige)" },
    outline:        { background: h ? "var(--g-cafe-100)"    : "transparent", color: "var(--g-petroleo-700)", border: "1px solid var(--g-line-strong)" },
    invertedOutline:{ background: h ? "rgba(249,246,232,0.12)" : "transparent", color: "var(--g-beige)", border: "1px solid rgba(249,246,232,0.4)" },
    ghost:          { background: h ? "var(--g-cafe-100)"    : "transparent", color: "var(--g-petroleo-700)" },
    pillLight:      { background: h ? "#fffef5" : "var(--g-beige)", color: "var(--g-verde-500)", border: "1px solid rgba(0,0,0,0.06)", padding: "10px 26px" },
    pillDark:       { background: h ? "var(--g-petroleo-700)" : "var(--g-petroleo-800)", color: "var(--g-beige)", border: "1px solid var(--g-petroleo-800)", padding: "10px 24px" },
    pillMuted:      { background: h ? "var(--g-cafe-500)" : "var(--g-cafe-400)", color: "var(--g-petroleo-900)", border: "none", padding: "6px 18px" },
  };
  const baseStyle: CSSProperties = {
    fontFamily: "var(--g-font-sans)", fontWeight: 500, borderRadius: 999,
    border: "1px solid transparent", cursor: "pointer", transition: "all 180ms var(--g-ease-soft)",
    lineHeight: 1, display: "inline-flex", alignItems: "center", gap: 8,
    textDecoration: "none", whiteSpace: "nowrap",
    ...sizes[size], ...variants[variant],
  };
  if (href) {
    return (
      <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={baseStyle}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={baseStyle}>
      {children}
    </button>
  );
}

/* ---------- HatoWordmark ---------- */
interface HatoWordmarkProps {
  size?: number;
  inverse?: boolean;
  height?: number;
}
export function HatoWordmark({ size = 22, inverse = false, height }: HatoWordmarkProps) {
  const h = height ?? size * 2.9;
  const src = inverse
    ? "/assets/logo/logo-hato-negativo.png"
    : "/assets/logo/logo-hato-positivo.png";
  return (
    <img
      src={src}
      alt="Hato Guaicaramo"
      style={{ display: "block", height: h, width: "auto", objectFit: "contain", userSelect: "none" }}
      draggable={false}
    />
  );
}

/* ---------- HatoEyebrow ---------- */
interface HatoEyebrowProps {
  children: React.ReactNode;
  inverse?: boolean;
}
export function HatoEyebrow({ children, inverse = false }: HatoEyebrowProps) {
  return (
    <div style={{
      fontFamily: "var(--g-font-sans)", fontSize: 12, fontWeight: 500,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: inverse ? "var(--g-verde-300)" : "var(--g-verde-500)",
    }}>{children}</div>
  );
}

/* ---------- Manifest ---------- */
interface ManifestProps {
  lines: string[];
  color?: string;
  size?: number;
}
export function Manifest({ lines, color = "var(--g-petroleo-800)", size = 28 }: ManifestProps) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontFamily: "var(--g-font-display)", fontSize: size,
          lineHeight: 1.1, letterSpacing: "-0.015em", color, fontWeight: 400,
        }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* ---------- Section ---------- */
interface SectionProps {
  children: React.ReactNode;
  bg?: string;
  id?: string;
  pad?: string;
}
export function Section({ children, bg = "var(--g-bg)", id, pad = "96px 0" }: SectionProps) {
  const isWide = useBreakpoint() === "wide";
  const contentMax = isWide ? 1700 : 1280;
  return (
    <section id={id} style={{ background: bg, padding: pad }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: "0 48px" }}>
        {children}
      </div>
    </section>
  );
}

/* ---------- SectionTitle ---------- */
interface SectionTitleProps {
  children: React.ReactNode;
  color?: string;
  align?: CSSProperties["textAlign"];
}
export function SectionTitle({ children, color = "var(--g-verde-500)", align = "center" }: SectionTitleProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  return (
    <div style={{ textAlign: align, marginBottom: 56 }}>
      <h2 style={{
        display: "inline-block",
        fontFamily: "var(--g-font-display)", fontSize: "clamp(20px, 3vw, 40px)",
        lineHeight: 1.05, letterSpacing: "0.005em",
        color, fontWeight: 400,
        margin: 0, paddingBottom: 6, borderBottom: "1.5px solid currentColor",
        whiteSpace: isMobile ? "normal" : "nowrap",
        maxWidth: isMobile ? "100%" : "none",
      }}>
        {children}
      </h2>
    </div>
  );
}
