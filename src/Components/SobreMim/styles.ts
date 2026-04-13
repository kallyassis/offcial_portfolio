import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  padding: 50px 0;
  text-align: center;
  min-height: 100vh;
  display: block;
  align-items: center;
  justify-content: center;
  margin-top: 150px;

  .aura {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 768px) {
    padding:  8px;

  }

  @media (min-width: 769px)  and (max-width: 1024px)  {
    min-height: 70vh;
    
  }

  .container {
    margin-bottom: 50px;
    P {
      margin-top: 20px;
      color: ${cores.CorTexto};
      line-height: 24px;
      font-size: 18px;

      @media (max-width: 768px) {
        margin-top: 10px;
        line-height: 22px;
        font-size: 16px;
      }
    }
  }
`;
