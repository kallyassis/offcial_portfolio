import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  position: relative;
  overflow: hidden;
  padding: 50px;
  min-height:100vh;

  @media (max-width: 768px) {
    min-height: 95vh;
    padding: 24px;
    margin-top: 50px; 
  }

  @media (min-width: 769px)  and (max-width: 1024px)  {
    min-height: 70vh;
    
  }

  .container {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8%;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      max-width: 90%;
      margin: 0 auto;
    }
  }
`;

export const BoxPrin = styled.div`
  width: 500px;

  p {
    margin: 20px 0;
    font-size: 16px;
    line-height: 24px;
    color: ${cores.CorTexto};
  }

  @media (max-width: 768px) {
    width: 100%;

    p {
      margin: 0px;
      font-size: 14px;
      line-height: 22px;  
    }

    .titulo span {
      font-size: 24px;
      line-height: 40px;
    }
  }
`;

export const BoxIcons = styled.div`
  display: flex;
  gap: 20px;

  
  .icon {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(20px);
    animation: blurFade 0.6s ease forwards;

    &:nth-child(1) {
      animation-delay: 0.2s;
    }

    &:nth-child(2) {
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
    
    @keyframes blurFade {
      to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
      }
    }

  }

  @media (max-width: 768px) {
    justify-content: center;
    margin: 20px;
    
    
  }
`;

export const Image = styled.div`
  width: 300px;
  img {
    border-radius: 300px;
    width: 100%;
    border: 2px solid ${cores.CorPrincipal};
    box-shadow: 0 0 10px ${cores.CorPrincipal};
  }

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (min-width: 769px)  and (max-width: 1024px) {
    margin-left: 50px;
  }
`;
