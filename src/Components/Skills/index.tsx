import { useEffect, useRef, useState } from "react";
import { Box, BoxItem, Content } from "./styles";

const Skills = () => {
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
        threshold: 0.25,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Content id="skills" ref={sectionRef} className={isVisible ? "is-visible" : ""}>
        <div className="container">
          <h2 className="style-text">Habilidade</h2>
          <div>
            <h3 className="style-text">Hard Skills</h3>
            <Box>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Frontend</h4>
                <p>
                  HTML <br />
                  CSS3 <br />
                  JavaScript(ES6+) <br />
                  TypeScript <br />
                  ReactJS <br />
                  Styled Components <br />
                  SASS <br />
                  Rsponsividade(intermediario)
                </p>
              </BoxItem>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Backend & Banco de Dados</h4>
                <p>
                  NodeJS <br />
                  ExpessJS(iniciante) <br />
                  MonogoDB/Sequelize(iniciante) <br />
                  Python(iniciante) <br />
                </p>
              </BoxItem>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Ferramentas & Workflow</h4>
                <p>
                  Git/Github <br />
                  Vs Code
                  <br />
                  Webpack(vite)
                  <br />
                  Figma/Design Tools(Protipação e UI/UX básica)
                  <br />
                  Yarn/npm
                  <br />
                </p>
              </BoxItem>
            </Box>
          </div>
          <div>
            <h3 className="style-text">Soft Skills</h3>
            <Box>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Frontend</h4>
                <p>
                  HTML <br />
                  CSS3 <br />
                  JavaScript(ES6+) <br />
                  TypeScript <br />
                  ReactJS <br />
                  Styled Components <br />
                  SASS <br />
                  Rsponsividade(intermediario)
                </p>
              </BoxItem>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Backend & Banco de Dados</h4>
                <p>
                  NodeJS <br />
                  ExpessJS(iniciante) <br />
                  MonogoDB/Sequelize(iniciante) <br />
                  Python(iniciante) <br />
                </p>
              </BoxItem>
              <BoxItem className="icon">
                <h4 className="cor-texto-sec">Ferramentas & Workflow</h4>
                <p>
                  Git/Github <br />
                  Vs Code
                  <br />
                  Webpack(vite)
                  <br />
                  Figma/Design Tools(Protipação e UI/UX básica)
                  <br />
                  Yarn/npm
                  <br />
                </p>
              </BoxItem>
            </Box>
          </div>
        </div>
      </Content>
    </>
  );
};
export default Skills;
