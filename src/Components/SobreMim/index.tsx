import SoftAurora from "../Ui/Aura/SoftAurora";
import BorderGlow from "../Ui/Sobre/BorderGlow";
import { Content } from "./styles";

const SobreMim = () => {
  return (
    <>
      <Content id="about">
        <div className="container">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#060010"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={["#c084fc", "#f472b6", "#38bdf8"]}
          >
            <div style={{ padding: "2em" }}>
              <h2 className="style-text">Sobre Mim</h2>
              <p>
                Gosto de transformar ideias em projetos concretos, seja criando
                sites interativos, lojas online funcionais ou projetos de
                front-end com atenção aos detalhes e usabilidade. Cada projeto é
                uma oportunidade de aprender, experimentar novas tecnologias e
                entregar soluções que realmente fazem diferença para os
                usuários. Além das habilidades técnicas, valorizo muito
                colaboração, comunicação e criatividade. Trabalhar em equipe e
                aprender com outros profissionais faz parte do meu dia a dia,
                assim como buscar constantemente me atualizar e explorar
                tendências de desenvolvimento e design. Meu objetivo é continuar
                crescendo como desenvolvedora, participando de projetos
                desafiadores e contribuindo para experiências digitais de alto
                impacto, sempre com atenção aos detalhes e ao usuário final.
              </p>{" "}
            </div>
          </BorderGlow>
        </div>

        <div className="aura">
          <SoftAurora  />
        </div>
      </Content>
    </>
  );
};

export default SobreMim;
