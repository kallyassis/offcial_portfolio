import { BoxIcons, BoxPrin, Content, Image } from "./styles";

import Kali from "../../assets/kalinka.jpeg";

import SplitText from "../Ui/SplitText";
import LiquidEther from "../Ui/Fundo/LiquidEther";

import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Hero = () => {
  return (
    <>
      <Content id="home">
        <LiquidEther
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        />
        <div className="container">
          <BoxPrin>
            <h1 className="titulo">
              <SplitText
                text={
                  <>
                    Olá, eu sou{" "} {" "}
                    <span className="style-text">Kalinka {" "} Assis!</span>
                  </>
                }

                className="titulo"
              />
            </h1>
            <p>
              Sou desenvolvedora Full Stack focada em criar aplicações web
              moderna utilizando React, TypeScript, e boas práticas de
              desenvolvimento.
            </p>
            <BoxIcons>
              <a className="icon" href="https://www.instagram.com/kallyhbs/" target="_blank" rel="noopener">
                <InstagramIcon sx={{ fontSize: 30, color: "#ff2d95" }}  />
              </a>
              <a className="icon" href="https://github.com/kallyassis" target="_blank" rel="noopener">
                <GitHubIcon sx={{ fontSize: 30, color: "#ff2d95" }} />
              </a>
              <a className="icon" href="https://www.linkedin.com/in/kalinka-assis/" target="_blank" rel="noopener">
                <LinkedInIcon sx={{ fontSize: 30, color: "#ff2d95" }} />
              </a>
            </BoxIcons>
          </BoxPrin>
          <Image>
            <img src={Kali} alt="" />
          </Image>
        </div>
      </Content>
    </>
  );
};

export default Hero;
