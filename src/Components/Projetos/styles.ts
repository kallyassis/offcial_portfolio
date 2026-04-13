import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  padding: 50px;
  min-height: 90vh;

  h2 {
    margin-bottom: 50px;
    text-align: center;
  }

  &.is-visible .project-card {
    animation: fadeSide 1.2s ease forwards;
  }

  @media (max-width: 768px) {
    padding: 0;
    min-height: 100vh;

    h2 {
      margin: 20px 24px;
    }
  }
`;

export const BoxProject = styled.div`
  display: flex;
  flex-direction: column;

  .project {
    &:nth-child(2) {
      flex-direction: row-reverse;
    }

    &:nth-child(4) {
      flex-direction: row-reverse;
    }
  }
`;

export const Project = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
  padding: 20px;
  border: 2px solid ${cores.CorPrincipal};
  opacity: 0;
  transform: translateX(-80px);

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    display: block;
    width: 100%;
  }

  &:nth-child(even) {
    transform: translateX(80px);
  }

  &:nth-child(1) {
    animation-delay: 0.2s;
  }

  &:nth-child(2) {
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.8s;
  }

  div {
    width: 600px;
    img {
      width: 100%;
    }

    @media (max-width: 768px) {
      display: block;
      width: 100%;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
  }

  @keyframes fadeSide {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
export const BoxText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  p {
    width: 600px;
    height: 130px;
    font-size: 18px;
    line-height: 24px;
    color: ${cores.CorTexto};
  }

  @media (max-width: 768px) {
    h3 {
      margin-top: 10px;
    }
    p {
      width: 100%;
      height: auto;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    
    p {
      width: 100%;
      height: auto;
      margin: 15px 0;
    }
  }
`;

export const Link = styled.a`
  color: ${cores.CorPrincipal};
  text-decoration: none;
  text-shadow: 0 8px 10px ${cores.CorPrincipal};

  &:hover {
    font-size: 18px;
  }
`;
