import { useState } from "react";
import { Button, Content, Form, Input, Textarea } from "./styles";
import Footer from "../Footer";

const Contato = () => {
  const [name, setName] = useState("");
  const [messege, setMessege] = useState("");

  const handleForm = () => {
    const numero = "5573998104335";

    const texto = `Olá, me chamo ${name}. ${messege}`;

    const url = `http://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

    setName("");
    setMessege("");
  };
  return (
    <>
      <Content id="contact">
        <div className="container">
          <h2 className="style-text">Entre em Contato</h2>
          <Form onSubmit={handleForm}>
            <div>
              <label htmlFor="name">Nome:</label>
              <Input
                type="text"
                name="name"
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Mensagem:</label>
              <Textarea
                name="message"
                placeholder="Sua menssagem"
                onChange={(e) => setMessege(e.target.value)}
              />
            </div>
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default Contato;
