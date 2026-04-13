import { useEffect, useRef, useState } from "react";
import { BoxProject, BoxText, Content, Link, Project } from "./styles";
import Event from "../../assets/evento.png";
import Nike from "../../assets/nike.png";
import Food from "../../assets/restaurante.png";
import Disney from "../../assets/disney.png";

const Projetos = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Content id="project" ref={sectionRef} className={isVisible ? "is-visible" : ""}>
        <div className="container">
          <h2 className="style-text">Projetos</h2>
          <BoxProject>
            <Project className="project-card">
              <div>
                <img src={Event} alt="" />
              </div>
              <BoxText>
                <h3 className="style-text">Página de Evento</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perferendis illum magnam voluptatem, tempore sit eveniet qui
                  quod nulla corporis totam molestiae molestias consequuntur
                  nisi omnis aspernatur inventore placeat nostrum et!
                </p>
                <Link
                  href="https://event-ficticio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link do Projeto
                </Link>
              </BoxText>
            </Project >
            <Project className="project project-card">
                <div>
                  <img src={Food} alt="" />
                </div>
              <BoxText>
                <h3 className="style-text">E-food</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perferendis illum magnam voluptatem, tempore sit eveniet qui
                  quod nulla corporis totam molestiae molestias consequuntur
                  nisi omnis aspernatur inventore placeat nostrum et!
                </p>
                <Link
                  href="https://e-food-seven-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link do Projeto
                </Link>
              </BoxText>
            </Project>
            <Project className="project-card">
              <div>
                <img src={Disney} alt="" />
              </div>
              <BoxText>
                <h3 className="style-text">Clone Disney+</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perferendis illum magnam voluptatem, tempore sit eveniet qui
                  quod nulla corporis totam molestiae molestias consequuntur
                  nisi omnis aspernatur inventore placeat nostrum et!
                </p>
                <Link
                  href="https://clone-disneyplus-mu-pied.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link do Projeto
                </Link>
              </BoxText>
            </Project>
            <Project className="project project-card">
              <div>
                <img src={Nike} alt="" />
              </div>
              <BoxText>
                <h3 className="style-text">E-commerce Nike</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perferendis illum magnam voluptatem, tempore sit eveniet qui
                  quod nulla corporis totam molestiae molestias consequuntur
                  nisi omnis aspernatur inventore placeat nostrum et!
                </p>
                <Link
                  href="https://tenis-nike-indol.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link do Projeto
                </Link>
              </BoxText>
            </Project>
          </BoxProject>
        </div>
      </Content>
    </>
  );
};

export default Projetos;
