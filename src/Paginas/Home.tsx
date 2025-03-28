import React from "react";
import { Box } from "@mui/material";
import Header from "../componentes/generales/Header";
import ContenedorBusqueda from "../componentes/generales/buscador/ContenedorBusqueda";
import Footer from "../componentes/generales/Footer";


import PublicidadCliente from "../componentes/especificos/puclibidadCliente/PublicidadCliente";
import DestacadosDelMes from "../componentes/especificos/destacadosMes/DestacadosDelMes";
import BannerRegistro from "../componentes/generales/BannerRegistro";
import ZocaloPoweredBy from "../componentes/generales/ZocaloPoweredBy"; // Ensure this path is correct

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Header />
      <ContenedorBusqueda />
      <Box sx={{ height: "100vh" }} />
      
      {/* Componentes comentados temporalmente */}
       <PublicidadCliente /> 
      <DestacadosDelMes /> 
       <BannerRegistro /> 

      
      <Footer /> {/* ✅ Faltaba Footer, lo agregué aquí */}
      <ZocaloPoweredBy />
    </Box>
  );
};

export default Home;
