import React from "react";
import { Box, Typography } from "@mui/material";
import { useDatosGenerales, useTarjetas } from "../../../contextos/DatosAgenciaContext";

interface CartaMesPrecioProps {
  precio: number;
  moneda: string; // 👈 NUEVO
  estilos: {
    tarjetaTipografia: string | null;
    tarjetaTipografiaColor: string | null;
    tarjetaColorPrimario: string | null;
  };
}

const CartaMesPrecio: React.FC<CartaMesPrecioProps> = ({ precio, moneda, estilos }) => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();

  const tipografia =
    estilos.tarjetaTipografia || tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";

  const tipografiaColor =
    tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";

  const colorPrimario =
    estilos.tarjetaColorPrimario || tarjetas?.color?.primario || datosGenerales?.color?.primario || "#FFFFFF";

 // 👇 Normalización robusta
const monedaNormalizada = moneda.trim().toLowerCase();
const codigoMoneda = monedaNormalizada.includes("dolar") ? "USD" : "ARS";

  return (
    <Box
      sx={{
        backgroundColor: colorPrimario,
        color: tipografiaColor,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: tipografia,
        borderRadius: "0 0 16px 16px",
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
        Desde
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontSize: "2.4rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span style={{ fontFamily: tipografia, color: tipografiaColor }}>{codigoMoneda}</span>
        {precio.toLocaleString("es-AR")}
      </Typography>
    </Box>
  );
};

export default CartaMesPrecio;
