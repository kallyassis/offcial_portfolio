import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Heade = styled.header`
  background-color: ${cores.CorDoHeader};
  height: 100px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 4;

`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;


  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;

    img {
      width: 120px;
    }
  }
  `;

export const BoxNav = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  font-size: 18px;

  @media (max-width: 768px) {
    gap: 8px;  
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  color: ${cores.CorTexto};
  padding: 10px 10px;
  text-decoration: none;
  

  &.active {
    
    box-shadow:   0px 2px 4px ${cores.CorPrincipal} ;
    background-color: ${cores.CorPrincipal};
    border-radius: 4px;
    color: ${cores.CorTexto};
  }

  @media (max-width: 768px) {
    padding: 4px;
    font-size: 14px;
  }
`;
