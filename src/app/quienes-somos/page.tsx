import type { Metadata } from "next";
import QuienesSomos from "@/components/hato/QuienesSomos";

export const metadata: Metadata = {
  title: "Quiénes Somos · Hato Guaicaramo",
  description:
    "Conoce la historia, el equipo y la filosofía detrás del Hato Guaicaramo: una empresa ganadera familiar comprometida con la genética y la producción sostenible en los Llanos Orientales de Colombia.",
};

export default function QuienesSomosPage() {
  return (
    <div data-screen-label="Quiénes Somos · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <QuienesSomos />
      </main>
    </div>
  );
}
