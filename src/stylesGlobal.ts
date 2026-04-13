import { createGlobalStyle } from "styled-components";

export const cores = {
  CorDeFundo: "#000",
  CorPrincipal: "#ff2d95",
  CorCardSkill: "linear-gradient(135deg, #692eff6c, #ff2d95)",
  CorTexto: "#FFFDD0",
  CorDoHeader: "#0f0e0e",
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

  body {
    background-color: ${cores.CorDeFundo};
    color: ${cores.CorTexto} ;
  }
  
  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;

    @media (max-width: 768px) {
      overflow-x: hidden;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      overflow-x: hidden;
    }

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
