import { cores } from "./../../stylesGlobal";
import styled from "styled-components";

export const Content = styled.section`
  padding: 24px 0 96px;

  @media (min-width: 320px)  and (max-width: 767px)  { 
    padding: 24px 0 72px;
  }

  .container {
    padding: 24px 0;

    h2 {
      text-align: center;
      margin-bottom: 56px;
    }

    > div {
      margin-bottom: 56px;

      &:last-child {
        margin-bottom: 0;
      }

      h3 {
        font-size: 22px;
        margin-bottom: 24px;
      }

      @media (min-width: 320px)  and (max-width: 767px)  { 
        h3 {
          margin-bottom: 20px;  
        }
      }
    }

    @media (min-width: 320px) and (max-width: 767px) {
      h2 {
        margin-bottom: 40px;
      }
    }
  }
`;

export const Box = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  list-style: none;
  gap: 24px;

  @media (min-width: 320px) and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .icon {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(20px);
    transition: ease 2s;

    &:nth-child(1) {
      animation-delay: 0.2s;
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
  border: 1px solid rgba(125, 211, 252, 0.18);
  box-shadow: 0px 18px 40px rgba(7, 10, 30, 0.45);
  border-radius: 30px;
  min-height: 100%;
  width: 100%;
  padding: 24px;

  p {
    color: ${cores.CorTexto};
    line-height: 28px;
  }

  @media (min-width: 320px)  and (max-width: 767px)  { 
    width: 100%;
  }
`;
