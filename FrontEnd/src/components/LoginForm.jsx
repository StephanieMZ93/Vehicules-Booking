import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../utilities/globalContext";
import { useNavigate, useParams } from "react-router-dom";

function LoginForm() {
  const [hidden, setHidden] = useState(false);
  const { handleLogin, isLogged, path } = useContext(ContextGlobal);
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
      <form onSubmit={onSubmit}>
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
        <div className="input1">
          <label className="labelForm">Email</label>
          <input
            id="emailLogin"
            name="email"
            className="inputForm"
            type="email"
            onChange={handleLoginFormData}
          />
        </div>
        <div>
          <label className="labelForm">Password</label>
          <input
            id="passwordLogin"
            name="password"
            className="inputForm"
            onChange={handleLoginFormData}
            type="password"
          />
        </div>
        <button className="button2" type="submit" value="ingresar">
          Login
        </button>
        <p>
          Don't have an account yet? <a href="/signin">Sign in</a>{" "}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
