import styled from "styled-components";
import { cores } from "../../stylesGlobal";

export const Content = styled.section`
  padding: 50px;
  min-height: 60vh;

    @media (max-width: 768px) {   
      padding: 20px;
    }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border: 1px solid ${cores.CorPrincipal};
    box-shadow: 0 0 15px ${cores.CorPrincipal};
    border-radius: 10px;

    @media (max-width: 768px) {
      width: 100%;
      padding: 15px;
      margin-bottom: 50px;
    }

    h2 {
      text-align: center;
      margin-bottom: 50px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }

  div {
    width: 100%;
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 18px;
    }
  }
`;

export const Input = styled.input`
  padding: 20px;
  width: 100%;
  outline: none;
  border: 1px solid ${cores.CorTexto};
  border-radius: 20px;
  font-size: 16px;
  background-color: transparent;
  color: ${cores.CorTexto};
`;
export const Textarea = styled.textarea`
  padding: 20px;
  width: 100%;
  outline: none;
  resize: none;
  height: 150px;
  font-size: 16px;
  border: 1px solid ${cores.CorTexto};
  border-radius: 20px;
  background-color: transparent;
  color: ${cores.CorTexto};
`;

export const Button = styled.button`
  padding: 20px;
  width: 100%;
  font-size: 18px;
  border-radius: 20px;
  border: none;
  background: ${cores.CorCardSkill};
  color: ${cores.CorTexto};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
