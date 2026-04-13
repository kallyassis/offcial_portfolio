import { BoxNav, Content, Heade, NavLink } from "./styles";
import LogoKali from "../../assets/euKali.png";
import { useState, useEffect } from "react";

const sectionsId = ["home", "about", "skills", "project", "contact"];

const Header = () => {
  const [sectionActive, setSectionActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setSectionActive(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sectionsId.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Heade>
        <Content className="container">
          <img src={LogoKali} alt="" />
          <nav>
            <BoxNav>
              <NavLink
                href="#home"
                className={sectionActive === "home" ? "active" : ""}
                onClick={() => setSectionActive("home")}
              >
                <li>Início</li>
              </NavLink>
              <NavLink
                href="#about"
                className={sectionActive === "about" ? "active" : ""}
                onClick={() => setSectionActive("about")}
              >
                <li>Sobre Mim</li>
              </NavLink>

              <NavLink
                href="#skills"
                className={sectionActive === "skills" ? "active" : ""}
                onClick={() => setSectionActive("skills")}
              >
                <li>Habilidade</li>
              </NavLink>

              <NavLink
                href="#project"
                className={sectionActive === "project" ? "active" : ""}
                onClick={() => setSectionActive("project")}
              >
                <li>Projetos</li>
              </NavLink>

              <NavLink
                href="#contact"
                className={sectionActive === "contact" ? "active" : ""}
                onClick={() => setSectionActive("contact")}
              >
                <li>Contato</li>
              </NavLink>
            </BoxNav>
          </nav>
        </Content>
      </Heade>
    </>
  );
};

export default Header;
