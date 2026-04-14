import { createGlobalStyle } from "styled-components";

export const cores = {
  CorDeFundo: "#050816",
  CorDeFundoSec: "#0c1224",
  CorPrincipal: "#ff2d95",
  CorSecundaria: "#7dd3fc",
  CorCardSkill: "linear-gradient(135deg, rgba(125, 211, 252, 0.16), rgba(255, 45, 149, 0.2))",
  CorTexto: "#FFFDD0",
  CorDoHeader: "rgba(5, 8, 22, 0.88)",
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background:
      radial-gradient(circle at top, rgba(125, 211, 252, 0.08), transparent 30%),
      linear-gradient(180deg, ${cores.CorDeFundo} 0%, ${cores.CorDeFundoSec} 100%);
    color: ${cores.CorTexto} ;
  }

  body::selection {
    background: ${cores.CorPrincipal};
    color: ${cores.CorTexto};
  }

  img {
    display: block;
    max-width: 100%;
  }

  section {
    scroll-margin-top: 120px;
  }
  
  .container {
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
  }

  .style-text {
    color: ${cores.CorPrincipal};
    text-shadow: 0 0 20px ${cores.CorPrincipal};
    background-color: transparent;
  }

  .cor-texto-sec {
    color: ${cores.CorTexto};
    font-size: 22px;
    margin-bottom: 20px;
  }
`;
