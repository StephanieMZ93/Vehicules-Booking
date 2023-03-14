import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../utilities/globalContext";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [hidden, setHidden] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { handleLogin, isLogged, path, hasCredentials, token } =
    useContext(ContextGlobal);
  const [loginFormData, setloginFormData] = useState({
    password: "",
    email: "",
  });

  const handleLoginFormData = ({ target }) => {
    setloginFormData({ ...loginFormData, [target.name]: target.value });
  };

  const navigation = useNavigate();

  const validation = () => {
    if (isLogged && String(path).includes("/product/detail/")) {
      navigation(path);
    } else if (isLogged) {
      navigation("/home");
    }
  };

  useEffect(() => {
    validation();
  }, [handleLogin]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginFormData);
  };

  // console.log("Timeout out:", hidden);
  useEffect(() => {
    setTimeout(() => setHidden(true), 7000);
    // console.log("Timeout In:", hidden);
  }, []);

  return (
    <div className="form">
      <form onSubmit={onSubmit} className="formLogin">
        <h1 className="colorL">Login</h1>
        {!isLogged && String(path).includes("/product/detail/") ? (
          !hidden ? (
            <div className="form__popup">
              <h2>! In order to set a reservation you must log in</h2>
            </div>
          ) : (
            false
          )
        ) : (
          false
        )}
        <div className="inputLogin">
          <label className="labelForm">Email</label>
          <input
            id="emailLogin"
            name="email"
            className="inputForm"
            type="email"
            onChange={handleLoginFormData}
            required
          />
        </div>
        <div className="inputLogin">
          <label className="labelForm">Password</label>
          <input
            id="passwordLogin"
            name="password"
            className="inputForm"
            onChange={handleLoginFormData}
            type="password"
            required
          />
        </div>
        {/* <p className="errorMessage">
          {token.token === "" && submit
            ? "Invalid credencials. Please verify the fields"
            : ""}
        </p> */}
        <p className="errorMessage">
          {hasCredentials
            ? "Invalid credencials. Please verify the fields"
            : ""}
        </p>
        <button
          className="button2"
          type="submit"
          value="ingresar"
          onClick={() => setSubmit(true)}
        >
          Login
        </button>

        <p>
          Don't have an account yet? <Link to="/signin">Sign in</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
