import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  text-align: center;
  padding: 40px 0 96px;

  .aura {
    width: 100%;
    height: 220px;
    opacity: 0.85;
  }

  @media (min-width: 320px) and (max-width: 1024px) {
    padding: 24px 0 72px;

    .aura {
      width: 100%;
      height: 150px;
    }
  }

  .container {
    p {
      padding-top: 20px;
      color: ${cores.CorTexto};
      line-height: 1.9;
      font-size: 18px;
      max-width: 820px;
      margin: 0 auto;
    }

    @media (min-width: 320px) and (max-width: 1024px) {
      padding: 24px 0;

      h2 {
        margin-top: 20px;
      }

      p {
        padding-top: 10px;
        line-height: 22px;
        font-size: 16px;
      }
    }
  }
`;
