import React, { useContext, useState } from "react";
import { ContextGlobal } from "../utilities/globalContext";
import { Link } from "react-router-dom";

export const BurgerMenu = () => {
  const { isLogged, setIsLogged,token } = useContext(ContextGlobal);

  const logoutHandler = () => {
    return setIsLogged(false);
  };

  const [deativateI, setDeativateI] = useState(false);
  const deactivateIHandler = () => {
    setDeativateI(!deativateI);
  };

  return (
    <>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
          checked={deativateI}
          readOnly
          onClick={deactivateIHandler}
        />
        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <ul className="navigation__list">
            {isLogged === true ? (
              <>
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    to="/home"
                    className="navigation__link"
                    onClick={deactivateIHandler}
                  >
                    Home
                  </Link>
                </li>
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    to={`/reservas/${token.userInfo.id}`}
                    className="navigation__link"
                    onClick={deactivateIHandler}
                  >
                    My Bookings 
                  </Link>
                </li>
               
                {token.userInfo?.rol?.name=== "ADMIN"? <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    to="/manager"
                    className="navigation__link"
                    onClick={deactivateIHandler}
                  >
                    Manager
                  </Link>
                </li>:null}
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    to="/signin"
                    className="navigation__link"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li>
               
              </>
            ) : (
              <>
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link to="/home" className="navigation__link">
                    Home
                  </Link>
                </li>
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    htmlFor="navigation__checkbox"
                    to="/signin"
                    className="navigation__link"
                  >
                    Signin
                  </Link>
                </li>
                <li className="navigation__item" onClick={deactivateIHandler}>
                  <Link
                    htmlFor="navigation__checkbox"
                    to="/login"
                    className="navigation__link"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};
