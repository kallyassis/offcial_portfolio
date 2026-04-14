import { useEffect, useRef, useState } from "react";
import { Box, BoxItem, Content } from "./styles";

const skillGroups = [
  {
    title: "Hard Skills",
    items: [
      {
        title: "Frontend",
        description: [
          "HTML",
          "CSS3",
          "JavaScript (ES6+)",
          "TypeScript",
          "ReactJS",
          "Styled Components",
          "SASS",
          "Responsividade",
        ],
      },
      {
        title: "Backend & Banco de Dados",
        description: [
          "Node.js",
          "Express.js",
          "MongoDB",
          "Sequelize",
          "Python",
          "APIs REST",
        ],
      },
      {
        title: "Ferramentas & Workflow",
        description: [
          "Git & GitHub",
          "VS Code",
          "Vite",
          "Figma",
          "UI/UX básica",
          "Yarn & npm",
        ],
      },
    ],
  },
  {
    title: "Soft Skills",
    items: [
      {
        title: "Comunicação",
        description: [
          "Clareza na troca com time e cliente",
          "Escuta ativa",
          "Boa documentação",
        ],
      },
      {
        title: "Colaboração",
        description: [
          "Trabalho em equipe",
          "Compartilhamento de conhecimento",
          "Abertura para feedback",
        ],
      },
      {
        title: "Mentalidade de Crescimento",
        description: [
          "Aprendizado contínuo",
          "Organização",
          "Resolução de problemas",
        ],
      },
    ],
  },
];

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
          <h2 className="style-text">Habilidades</h2>
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="style-text">{group.title}</h3>
              <Box>
                {group.items.map((item) => (
                  <BoxItem key={item.title} className="icon">
                    <h4 className="cor-texto-sec">{item.title}</h4>
                    <p>{item.description.join(" • ")}</p>
                  </BoxItem>
                ))}
              </Box>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
};
export default Skills;
