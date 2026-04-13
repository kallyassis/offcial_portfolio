import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Foot = styled.footer`
  padding: 20px 0;
  background-color: ${cores.CorDoHeader};
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const BoxItem = styled.div`
  margin-bottom: 10px;

  a {
    margin-right: 10px;

    transition: 0.3s;
    &:hover svg {
      transform: scale(1.2);
    }
  }
`;
