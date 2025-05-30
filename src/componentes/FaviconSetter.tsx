// src/components/FaviconSetter.tsx
"use client";

import { useEffect } from "react";
import { useDatosGenerales } from "../contextos/DatosAgenciaContext";

export default function FaviconSetter() {
  const datosGenerales = useDatosGenerales();
  const logoAgencia = datosGenerales?.logoAgencia;

  useEffect(() => {
    if (!logoAgencia) return;

    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logoAgencia;
  }, [logoAgencia]);

  return null;
}
