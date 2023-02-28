import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getInitials } from "../utilities/getInitials"; //MOD json
import { ContextGlobal } from "../utilities/globalContext";

export const Header = () => {
  const { isLogged, setIsLogged, token, setToken } = useContext(ContextGlobal);

  const logoutHandler = () => {
    setIsLogged(false);
    setToken({
      token: "",
      userInfo: {},
    });
  };

  return (
    <header className="header">
      {isLogged === true ? (
        <div className="header__aux">
          <figure className="header__right__picture">
            <img
              // src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
              src="./img/dsdsdsd.jpg"
              alt="Logo"
              style={{
                height: 100 + "%",
                transform: "translate(" + 1.1 + "rem" + ")",
                backfaceVisibility: "hidden",
                transition: "all" + 0.5 + "s",
              }}
            />
            <figcaption className="header__right__caption">
              {getInitials(token.userInfo.name, token.userInfo.lastName)}
            </figcaption>
          </figure>
        </div>
      ) : (
        <Link className="header__aux" to="/home">
          <div className="header__left__logo">
            <img src="../img/DestiAutos_dorado-02.png" alt="" />
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
            <img src="../img/DestiAutos_dorado-02.png" alt="" />
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
            <div className="header__right__username">
              <p className="">
                Welcome {`${token.userInfo.name} ${token.userInfo.lastName}`}
              </p>
            </div>
            <figure className="header__right__picture">
              <img
                // src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
                src="./img/dsdsdsd.jpg"
                alt="Logo"
              />
              <figcaption className="header__right__caption">
                {getInitials(token.userInfo.name, token.userInfo.lastName)}
              </figcaption>
            </figure>
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
