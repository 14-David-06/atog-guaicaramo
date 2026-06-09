'use client'

import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop" | "wide";

/**
 * Devuelve el breakpoint activo según el ancho del viewport.
 * mobile  < 640px
 * tablet  640px – 1023px
 * desktop 1024px – 1919px
 * wide    ≥ 1920px  (iMac 24", Studio Display, 4K+)
 * SSR-safe: devuelve "desktop" hasta que el cliente hidrate.
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    function get(): Breakpoint {
      if (window.innerWidth < 640)  return "mobile";
      if (window.innerWidth < 1024) return "tablet";
      if (window.innerWidth < 1920) return "desktop";
      return "wide";
    }
    const handler = () => setBp(get());
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, []);

  return bp;
}
