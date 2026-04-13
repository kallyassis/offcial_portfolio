import { cores } from "./../../stylesGlobal";
import styled from "styled-components";

export const Content = styled.section`
  padding: 50px;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 0;
    min-height: 100vh;
  }

  @media (min-width: 769px)  and (max-width: 1024px)  { 
    min-height: 80vh;
  }


  .container {
    h2 {
      text-align: center;
      margin-bottom: 50px;
    }

    div {
      margin-bottom: 100px;
      h3 {
        font-size: 22px;
        margin-bottom: 40px;
      }

      @media (max-width: 768px) {
        div {
          margin-bottom: 20px;

          h3 {
            margin-bottom: 24px;
          }
        }
      }
    }

    @media (max-width: 768px) {
      h2 {
        margin-bottom: 24px;
      }
    }
  }
`;

export const Box = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
  }

  @media (min-width: 769px)  and (max-width: 1024px)  { 
    grid-template-columns: repeat(2, 1fr);
  }


  .icon {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(20px);
    transition: ease 2s;

    &:nth-child(1) {
      animation-delay: 0.4s;
    }

    &:nth-child(2) {
      animation-delay: 0.6s;
    }

    &:nth-child(3) {
      animation-delay: 0.8s;
    }

    @keyframes blurFade {
      to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
      }
    }
  }

  .is-visible & {
    .icon {
      animation: blurFade 2s ease forwards;
    }
  }
`;

export const BoxItem = styled.li`
  background: ${cores.CorCardSkill};
  border: 5px solid ${cores.CorCardSkill};
  box-shadow: 0px 0px 20px rgba(255, 45, 149, 0.35);
  border-radius: 30px;

  width: 370px;
  padding: 20px;

  p {
    color: ${cores.CorTexto};
    line-height: 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 769px)  and (max-width: 1024px)  { 
    width: 100%;
  }

`;
