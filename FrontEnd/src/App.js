// import Login from "./Routes/Login";
import { Header } from "./components/Header";
import { Searcher } from "./components/Searcher";
import { Footer } from "./components/Footer";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GlobalContext } from "./utilities/globalContext";
import { BurgerMenu } from "./components/BurgerMenu";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  });

  return (
    // <>
    <GlobalContext>
      <BurgerMenu />
      <div className="row--1-of-3">
        <Header />
      </div>
      <main className="row--2-of-3">
        <Outlet />
      </main>
      <Footer className="row--3-of-3" />
    </GlobalContext>
    /* </> */
  );
}

export default App;
