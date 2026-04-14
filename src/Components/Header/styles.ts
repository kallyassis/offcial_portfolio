import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Heade = styled.header`
  background-color: ${cores.CorDoHeader};
  border-bottom: 1px solid rgba(125, 211, 252, 0.12);
  backdrop-filter: blur(18px);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 16px 24px;

    img {
      width: 132px;
    }
  }
`;

export const BoxNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  list-style: none;
  font-size: 16px;

  @media  (max-width: 768px) {
    gap: 8px;  
    margin-top: 0;
  }
`;

export const NavLink = styled.a`
  color: ${cores.CorTexto};
  text-decoration: none;
  text-align: center;
  padding: 10px 14px;
  border: 1px solid rgba(255, 45, 149, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  transition: 0.3s ease;

  &:hover {
    border-color: rgba(255, 45, 149, 0.55);
    transform: translateY(-1px);
  }

  &.active {
    background: linear-gradient(135deg, rgba(255, 45, 149, 0.9), rgba(125, 211, 252, 0.5));
    color: ${cores.CorTexto};
    box-shadow: 0 10px 30px rgba(255, 45, 149, 0.22);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
