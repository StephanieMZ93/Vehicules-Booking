import { useContext } from "react";
import { Link } from "react-router-dom";
import { getInitials } from "../utilities/getInitials"; //MOD json
import { ContextGlobal } from "../utilities/globalContext";
import { nameLength } from "../utilities/nameLength";
export const Header = () => {
  const { isLogged, setIsLogged, token, setToken, navigation } =
    useContext(ContextGlobal);

  const logoutHandler = () => {
    setIsLogged(false);
    setToken({
      token: "",
      userInfo: {},
    });
    navigation("/home");
  };

  return (
    <header className="header">
      {isLogged === true ? (
        <div className="header__aux">
          <figure className="header__right__picture">
            <img
              src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/user.png"
              alt="Logo"
              style={{
                height: 80 + "%",
                transform: `translate(1rem, 1rem)`,
                backfaceVisibility: "hidden",
                transition: "all" + 0.5 + "s",
              }}
            />
            <figcaption className="header__right__caption">
              {getInitials(token?.userInfo?.name, token?.userInfo?.lastName)}
            </figcaption>
          </figure>
        </div>
      ) : (
        <Link className="header__aux" to="/home">
          <div className="header__left__logo">
            <img
              src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/DestiAutosImagotipo.png"
              alt=""
            />
          </div>
        </Link>
      )}
      {/* REAL LEFT HEADER */}
      <div className="header__left">
        <Link to="/home">
          <div
            className="header__left__logo"
            // style={{
            //   backgroundImage: `url("../img/DestiAutos_dorado-02.png")`,
            // }}
          >
            <img
              src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/DestiAutosImagotipo.png"
              alt=""
            />
          </div>
        </Link>

        <Link className="header__slogan" to="/home">
          <p>A vehicle to your destiny</p>
        </Link>
      </div>

      {/* REAL RIGHT HEADER */}
      <div className="header__right">
        {isLogged === true ? (
          <>
            {token?.userInfo?.rol?.name === "ADMIN" ? (
              <div
                className="header__manager"
                onClick={() => navigation("./manager")}
              >
                <h4>Manager</h4>
              </div>
            ) : (
              false
            )}
            <div className="header__right__username">
              <p className="header__userName">
                Welcome{" "}
                {nameLength(token.userInfo?.name, token.userInfo?.lastName)}
              </p>
            </div>
            <figure className="header__right__picture">
              <img
                // src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
                src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/user.png"
                alt="Logo"
              />
              <figcaption className="header__right__caption">
                {getInitials(token.userInfo.name, token.userInfo.lastName)}
              </figcaption>
            </figure>

            <div
              onClick={() => navigation(`/reservas/${token.userInfo.id}`)}
              className="logo-booking"
            >
              <img
                src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/DESTIAUTOS+CALENDARIO.png"
                alt="logo-booking"
              />
            </div>
            <button
              className="button--4 header__right__button"
              onClick={logoutHandler}
            >
              Logout
            </button>
            {/* </a> */}
          </>
        ) : (
          <div className="header__right__buttons__container">
            <Link className="inline-block" to="/signin">
              <button className="button--4">Signin</button>
            </Link>
            <Link className="inline-block" to="/login">
              <button className="button--4">Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
