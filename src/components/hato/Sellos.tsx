'use client'

import { SectionTitle } from "./primitivos";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { SanitySello } from "@/sanity/queries/sellos";

type SelloItem = { name: string; src: string; delay: string; dur: string };

const ANIMATION_PARAMS = ["0s/4.2s", "0.6s/3.8s", "1.1s/4.6s", "0.3s/3.5s", "0.9s/4.0s"];

const RAW_SELLOS: SelloItem[] = [
  { name: "CIA Melhoramento", src: "/assets/certificados/cia-melhoramento.png", delay: "0s",    dur: "4.2s" },
  { name: "100% Precoce",     src: "/assets/certificados/100-precoce.png",      delay: "0.6s",  dur: "3.8s" },
  { name: "100% Genômica",    src: "/assets/certificados/100-genomica.png",     delay: "1.1s",  dur: "4.6s" },
  { name: "CESUG",            src: "/assets/certificados/cesug.png",            delay: "0.3s",  dur: "3.5s" },
  { name: "USDA Organic",     src: "/assets/certificados/usda-organic.png",     delay: "0.9s",  dur: "4.0s" },
];

function sanityToSello(s: SanitySello, i: number): SelloItem {
  const [delay, dur] = (ANIMATION_PARAMS[i % ANIMATION_PARAMS.length] ?? "0s/4.0s").split("/")
  return { name: s.name, src: s.logoUrl, delay: delay ?? "0s", dur: dur ?? "4.0s" }
}

export default function Sellos({ sanitySellos }: { sanitySellos?: SanitySello[] }) {
  const sellos: SelloItem[] =
    sanitySellos && sanitySellos.length > 0
      ? sanitySellos.map(sanityToSello)
      : RAW_SELLOS;
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isWide   = bp === "wide";

  const contentMax = isWide ? 1900 : 1440;
  const secPad   = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 56px";
  const gridCols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)";

  return (
    <section style={{ background: "var(--g-bg)", padding: "56px 0" }}>
      <style>{`
        @keyframes sello-float {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
        @keyframes sello-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div style={{ maxWidth: contentMax, margin: "0 auto", padding: secPad }}>
        <SectionTitle color="var(--g-verde-500)">Nuestros sellos de excelencia</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: isMobile ? 16 : 24,
          alignItems: "center", justifyItems: "center", marginTop: isMobile ? 32 : 56,
        }}>
          {sellos.map((s) => (
            <div key={s.name} style={{
              height: isMobile ? 110 : 160,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
              animation: `sello-fadein 600ms var(--g-ease-out) ${s.delay} both`,
            }}>
              <img
                src={s.src}
                alt={s.name}
                style={{
                  maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
                  animation: `sello-float ${s.dur} ease-in-out ${s.delay} infinite`,
                  willChange: "transform",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
