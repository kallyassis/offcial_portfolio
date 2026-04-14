import styled from "styled-components";
import { cores } from "../../stylesGlobal";
import { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translatex(-40px);
  }

  to {
    opacity: 1;
    transform: translatex(0);
  }
`;

export const Content = styled.section`
  padding: 40px 0 60px;
  .container {
    h2 {
      text-align: center;
      font-size: 2rem;
      color: ${cores.CorPrincipal};
      text-shadow: 0 0 20px ${cores.CorPrincipal};
      margin-bottom: 40px;
    }
  }
`;

export const BoxList = styled.ul`
  list-style: none;
`;

export const List = styled.li<{invert? : boolean}>`
  display: flex;
  align-items: center;
  border: 1px solid ${cores.CorPrincipal};
  box-shadow: 0 0 10px ${cores.CorPrincipal};
  gap: 50px;
  padding: 20px;
  margin: 40px 0 60px;

  opacity: 0;

  flex-direction: ${({invert}) => invert ? "row-reverse" : "row"};
  animation: ${fadeUp} 0.8s ease forwards; 

  &:nth-child(1) {
    animation-delay: 0.2s;

  }
  &:nth-child(2) {
    animation-delay: 0.8s;
    transform: translatey(40px);
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.4s;
    transform: translatey(40px);
  }  

  &:nth-child(4) {
    animation-delay: 1.4s;
  }

  img {
    max-width: 600px;

    aspect-ratio: 100/49;
    object-fit: cover;

  transition:  transform  0.3s ease;
  }

`;

export const BoxText = styled.div`
  display: block;
  h3 {
    font-size: 1.5rem;
    color: ${cores.CorPrincipal};
  }

  p {
    padding: 25px 0;
    line-height: 28px;
    font-size: 1.1rem;
  }

  a {
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(255, 45, 149, 0.9), rgba(125, 211, 252, 0.5));
    color: ${cores.CorTexto};
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.5s  ease-in-out, color 0.3s ease-in-out;


    &:active {
      transform: scale(0.95);
    }
    
  }
`;
