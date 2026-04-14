import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  position: relative;
  overflow: hidden;
  padding: 72px 0 96px;
  min-height: calc(100vh - 88px);
  display: flex;
  align-items: center;

  @media (min-width: 768px)  and (max-width: 1024px)  {
    padding: 56px 0 80px;
  }

  @media (max-width: 768px) {
    padding: 40px 0 64px;
  }

  .container {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(260px, 360px);
    gap: 56px;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 32px;
    }
  }
`;

export const BoxPrin = styled.div`
  max-width: 580px;

  .titulo {
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  p {
    margin: 24px 0 28px;
    font-size: 1.05rem;
    line-height: 1.8;
    color: ${cores.CorTexto};
    max-width: 540px;
  }

  @media (max-width: 768px) {
    width: 100%;

    p {
      margin: 18px auto 0;
      font-size: 14px;
      line-height: 22px;  
    }

    .titulo,
    .titulo span {
      font-size: clamp(2.2rem, 12vw, 3.2rem);
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
    margin: 24px 0 0;
  }
`;

export const Image = styled.div`
  width: min(100%, 340px);
  justify-self: end;

  img {
    aspect-ratio: 20/ 30;
    object-fit: cover;
    border-radius: 150px;
    width: 100%;
    border: 2px solid ${cores.CorPrincipal};
    box-shadow:
      0 0 0 1px rgba(125, 211, 252, 0.2),
      0 24px 60px rgba(255, 45, 149, 0.25);
  }

  @media (max-width: 768px) {
    width: min(100%, 280px);
    justify-self: center;
  }
`;
