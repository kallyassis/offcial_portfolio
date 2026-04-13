import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { BoxItem, Foot } from "./styles";

const Footer = () => {
  return (
    <>
      <Foot>
        <div className="container">
          <BoxItem>
            <a
              className="icon"
              href="https://www.instagram.com/kallyhbs/"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon sx={{ fontSize: 30, color: "#ff2d95" }} />
            </a>
            <a
              className="icon"
              href="https://github.com/kallyassis"
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon sx={{ fontSize: 30, color: "#ff2d95" }} />
            </a>
            <a
              className="icon"
              href="https://www.linkedin.com/in/kalinka-assis/"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon sx={{ fontSize: 30, color: "#ff2d95" }} />
            </a>
          </BoxItem>
          &copy; {new Date().getFullYear()} - Kaly Assis. Todos os direitos
          reservados.
        </div>
      </Foot>
    </>
  );
};

export default Footer;
