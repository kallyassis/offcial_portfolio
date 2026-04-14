import Event from "../../assets/evento.png";
import Nike from "../../assets/nike.png";
import Efood from "../../assets/restaurant.png";
import Disney from "../../assets/disney.png";
import { BoxList, BoxText, Content, List } from "./styles";

const groutProject = [
  {
    title: "Pagina de Evento",
    description:
      "Projeto desenvolvido para um evento de tecnologia, onde o objetivo era criar uma página de divulgação do evento, com informações sobre palestrantes, programação e inscrições. O projeto foi desenvolvido utilizando React e Tailwind CSS, seguindo as melhores práticas de desenvolvimento web e design responsivo.",
    imagem: Event,
    url: "https://event-ficticio.vercel.app/",
  },
  {
    title: "Clone Disney+",
    description:
      "Projeto desenvolvido para um evento de tecnologia, onde o objetivo era criar uma página de divulgação do evento, com informações sobre palestrantes, programação e inscrições. O projeto foi desenvolvido utilizando React e Tailwind CSS, seguindo as melhores práticas de desenvolvimento web e design responsivo.",
    imagem: Disney,
    url: "https://clone-disneyplus-mu-pied.vercel.app/",
  },
  {
    title: "Ecommerce Nike",
    description:
      "Projeto desenvolvido para um evento de tecnologia, onde o objetivo era criar uma página de divulgação do evento, com informações sobre palestrantes, programação e inscrições. O projeto foi desenvolvido utilizando React e Tailwind CSS, seguindo as melhores práticas de desenvolvimento web e design responsivo.",
    imagem: Nike,
    url: "https://tenis-nike-indol.vercel.app/",
  },
  {
    title: "E-food",
    description:
      "Projeto desenvolvido para um evento de tecnologia, onde o objetivo era criar uma página de divulgação do evento, com informações sobre palestrantes, programação e inscrições. O projeto foi desenvolvido utilizando React e Tailwind CSS, seguindo as melhores práticas de desenvolvimento web e design responsivo.",
    imagem: Efood,
    url: "https://restaurante-boot.vercel.app/",
  },
];


const Projeto = () => {
  return (
    <>
      <Content id="project">
            <div className="container">
              <h2>Projetos</h2>
              <BoxList>
                {groutProject.map((project) => (
                  <List key={project.title}>
                    <div>
                      <img src={project.imagem} alt="" />
                    </div>
                    <BoxText>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Projeto
                      </a>
                    </BoxText>
                  </List>
                ))}
              </BoxList>
            </div>
      </Content>
    </>
  );
};

export default Projeto;
