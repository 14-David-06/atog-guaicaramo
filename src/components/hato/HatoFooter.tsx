'use client'

import { useState } from "react";
import { HatoWordmark } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { SanityFooter } from "@/sanity/queries/footer";

const RAW: SanityFooter = {
  heading: "Tu éxito comienza aquí",
  description: "Si quieres conocer más sobre nuestros sistemas, animales o proyectos, estamos listos para responder y acompañarte.\nHablemos y construyamos juntos.",
  address: "Kilómetro 7 Vía Barranca de Upía – Cabuyaro\nManí, Casanare",
  phone: "+57 312 401 25 10",
  email: "comunicaciones@guaicaramo.com",
  instagramUrl: "https://www.instagram.com/hatoguaicaramo",
  tiktokUrl: "https://www.tiktok.com/@hato.guaicaramo",
  facebookUrl: "https://www.facebook.com/share/18KDMautQH/",
  footerImageUrl: null,
  privacyPolicyUrl: "#aviso-privacidad",
  dataProtectionFileUrl: "/assets/pdf/POLITICA_DE_TRATAMIENTO_DE_DATOS_PERSONALES.pdf",
}

/** Divide un texto multilinea en spans con <br /> entre líneas */
function Multiline({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
      ))}
    </>
  )
}

/* ---------- FooterLink ---------- */
function FooterLink({ href, children, download }: { href: string; children: React.ReactNode; download?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      download={download || undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        color: h ? "var(--g-verde-500)" : "var(--g-fg-muted)",
        textDecoration: h ? "underline" : "none",
        textUnderlineOffset: "3px",
        transition: "color 160ms var(--g-ease-soft)",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}

export default function HatoFooter({ sanityData }: { sanityData?: SanityFooter | null }) {
  const d = sanityData ?? RAW;
  const addressLines = d.address.split("\n");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide   = bp === "wide";
  const isSmall  = isMobile || isTablet;

  const contentMax = isWide ? 1900 : 1440;
  const secPad    = isMobile ? "40px 20px 0" : isTablet ? "40px 32px 0" : "56px 56px 0";
  const creditPad = isMobile ? "14px 20px" : isTablet ? "14px 32px" : "14px 56px";
  const gridCols  = isSmall ? "1fr" : "1.05fr 1fr";
  const gridGap   = isMobile ? 40 : isTablet ? 48 : 80;

  return (
    <footer id="contacto" style={{ background: "var(--g-beige)", color: "var(--g-fg)", position: "relative" }}>
      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: secPad }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, alignItems: "start" }}>
          <div>
            <HatoWordmark height={isMobile ? 64 : 96} />
            <h2 style={{
              fontFamily: "var(--g-font-display)", fontSize: isMobile ? 28 : 36, lineHeight: 1.05,
              color: "var(--g-verde-500)", fontWeight: 400, margin: "36px 0 18px",
              letterSpacing: "0.005em",
            }}>
              {d.heading}
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.6,
              color: "var(--g-fg)", margin: 0, maxWidth: 480, textWrap: "pretty",
              fontFamily: '"Atlas Grotesk"',
            }}>
              <Multiline text={d.description} />
            </p>
          </div>

          <div>
            <h3 style={{
              fontFamily: "var(--g-font-display)", fontSize: isMobile ? 22 : 28, lineHeight: 1.1,
              color: "var(--g-verde-500)", fontWeight: 400, margin: "0 0 22px",
            }}>
              Información de contacto
            </h3>
            <ContactRow icon="pin"   lines={addressLines} />
            <ContactRow icon="phone" lines={[d.phone]} />
            <ContactRow icon="mail"  lines={[d.email]} />

            <h3 style={{
              fontFamily: "var(--g-font-display)", fontSize: isMobile ? 22 : 28, lineHeight: 1.1,
              color: "var(--g-verde-500)", fontWeight: 400, margin: "40px 0 18px",
            }}>
              Síguenos en redes sociales
            </h3>
            <div style={{ display: "flex", gap: 14 }}>
              {d.instagramUrl && (
                <SocialCircle url={d.instagramUrl} title="Instagram">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </SocialCircle>
              )}
              {d.tiktokUrl && (
                <SocialCircle url={d.tiktokUrl} title="TikTok">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.5 3v3.2a4.3 4.3 0 0 0 4.3 4.3v3.2a7.5 7.5 0 0 1-4.3-1.36V16.5a5.5 5.5 0 1 1-5.5-5.5h.7v3.2H11a2.3 2.3 0 1 0 2.3 2.3V3h3.2z" />
                  </svg>
                </SocialCircle>
              )}
              {d.facebookUrl && (
                <SocialCircle url={d.facebookUrl} title="Facebook">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.6H7.7v3.2h2.7V22z" />
                  </svg>
                </SocialCircle>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manada — full-bleed */}
      <div style={{ marginTop: 64, width: "100%", position: "relative", lineHeight: 0 }}>
        <img
          src={d.footerImageUrl ?? "/assets/photography/manada-footer.jpg"}
          alt="Manada de búfalos y Nelore del Hato Guaicaramo"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>

      {/* Bottom credit */}
      <div style={{
        background: "var(--g-cafe-100)", padding: creditPad,
        fontFamily: "var(--g-font-sans)", fontSize: 12, color: "var(--g-fg-muted)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobile ? "flex-start" : "center",
        gap: 12, flexWrap: "wrap",
      }}>
        <span>Todos los derechos reservados</span>
        <strong style={{ color: "var(--g-verde-500)", fontWeight: 600 }}>Hato Guaicaramo</strong>
        <span>·</span>
        <FooterLink href={d.privacyPolicyUrl ?? "#aviso-privacidad"}>Aviso de privacidad</FooterLink>
        <span>·</span>
        <FooterLink href={d.dataProtectionFileUrl ?? "/assets/pdf/POLITICA_DE_TRATAMIENTO_DE_DATOS_PERSONALES.pdf"} download>
          Política de tratamiento de datos
        </FooterLink>
      </div>
    </footer>
  );
}

/* ---------- ContactIcon ---------- */
function ContactIcon({ name }: { name: string }) {
  const props = {
    width: 20, height: 20, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.6 as number,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "pin") return (
    <svg {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="3" fill="var(--g-beige)" stroke="none" />
    </svg>
  );
  if (name === "phone") return (
    <svg {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
  if (name === "mail") return (
    <svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
  return null;
}

/* ---------- ContactRow ---------- */
function ContactRow({ icon, lines }: { icon: string; lines: string[] }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
      <div style={{
        width: 22, height: 22, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "flex-start",
        color: "var(--g-verde-500)",
      }}>
        <ContactIcon name={icon} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            fontFamily: "var(--g-font-sans)", fontSize: 16, lineHeight: 1.45,
            color: "var(--g-fg)",
          }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------- SocialCircle ---------- */
function SocialCircle({ url, children, title }: { url: string; children: React.ReactNode; title: string }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={url} target="_blank" rel="noopener" title={title} aria-label={title}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 48, height: 48, borderRadius: 999,
        border: "1.5px solid var(--g-verde-500)",
        background: h ? "var(--g-verde-500)" : "#ffffff",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        color: h ? "#ffffff" : "var(--g-verde-500)",
        transition: "all 180ms var(--g-ease-soft)",
      }}
    >
      {children}
    </a>
  );
}
