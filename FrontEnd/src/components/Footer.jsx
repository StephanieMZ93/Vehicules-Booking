import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__right">
        <div className="footer__Logo">
          <img src="../img/DestiAutos_dorado-02.png" alt="logo" />
        </div>
        <p className="footer__copyright">
          2023 ©DestiAutos all rights reserved
        </p>
      </div>

      <div className="footer__left">
        <div className="footer__icons-container">
          <span>
            <a href="https://es-la.facebook.com/digitalhouseschool/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon  className="footer__icons face" icon={faFacebook} />
            </a>
          </span>
          <span>
            <a href="https://www.linkedin.com/school/digitalhouseschool/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="footer__icons in" icon={faLinkedin} />
            </a>
          </span>
          <span>
            <a href="https://www.instagram.com/_digitalhouse/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="footer__icons insta" icon={faInstagram} />
            </a>
          </span>
          <span>
            <a href="https://twitter.com/_digitalhouse" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="footer__icons twi" icon={faTwitter} />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

/* 
Crear un footer al 100 % del ancho de la pantalla y al pie de la misma que se verá en todas las pantallas de la aplicación, siguiendo el modelo de referencia.

Dentro del footer armar un bloque alineado a la izquierda que incluya el isologotipo, el año y el copyright.
Dentro del footer armar un bloque alineado a la derecha que incluya íconos de redes sociales. Los íconos no necesitan ser vinculados a ninguna página.

*/
