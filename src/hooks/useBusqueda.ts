import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormulario } from "../contextos/formulario/FormularioContext";
// 👇 Importamos el contexto de la agencia
import { useDatosGenerales } from "../contextos/agencia/DatosAgenciaContext";
import type { PaqueteData } from "../interfaces/PaqueteData";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://travelconnect.com.ar";

export const useBusqueda = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Formularios (tal cual)
  const {
    ciudadOrigen,
    destino,
    fechaSalida,
    viajeros, // { adultos, menores }
    resetFormulario,
  } = useFormulario();

  // 🔹 Datos de la agencia (para obtener el ID)
  const datosGenerales = useDatosGenerales();

  // Intentamos distintas llaves posibles donde puedas tener guardado el ID
  const agenciaId =
    (datosGenerales as any)?.idAgencia ??
    (datosGenerales as any)?.agenciaId ??
    (datosGenerales as any)?.agencia_id ??
    (datosGenerales as any)?.id ??
    (datosGenerales as any)?.agencia?.id ??
    // último recurso: si lo guardaste alguna vez en localStorage
    (() => {
      const fromLs = localStorage.getItem("agenciaId");
      return fromLs ? Number(fromLs) || fromLs : null;
    })();

  const guardarValoresPrevios = () => {
    localStorage.setItem(
      "valoresPrevios",
      JSON.stringify({
        ciudadOrigen,
        destino,
        fechaSalida,
        viajeros,
      })
    );
  };

  const handleClick = async () => {
    setLoading(true);

    if (!agenciaId) {
      console.error("❌ No se pudo determinar el ID de la agencia.");
      alert("No se pudo identificar la agencia para la búsqueda.");
      setLoading(false);
      return;
    }

    const payload = {
      agencia_id: agenciaId, // 👈 inyectamos el ID de la agencia
      ciudadOrigen: ciudadOrigen ?? "",
      destino: destino ?? "",
      fechaSalida: fechaSalida ? fechaSalida.toISOString() : null,
      viajeros, // { adultos, menores }
    };

    console.log("📤 Enviando solicitud con los siguientes datos:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/importar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let paquetes: PaqueteData[] = [];

      if (response.status === 404) {
        console.warn("⚠️ No se encontraron paquetes para la búsqueda.");
        paquetes = [];
      } else if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      } else {
        paquetes = (await response.json()) as PaqueteData[];
      }

      console.log("📦 Paquetes recibidos:", paquetes);

      localStorage.setItem("resultadosBusqueda", JSON.stringify(paquetes));
      guardarValoresPrevios();
      resetFormulario();
      window.dispatchEvent(new Event("actualizarPaquetes"));
      navigate("/paquetes-busqueda");
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleClick };
};
