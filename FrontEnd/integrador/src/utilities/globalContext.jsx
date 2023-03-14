import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dataUser from "../data/user.json";

export const ContextGlobal = createContext(undefined);

export const GlobalContext = ({ children }) => {
  const [hasCredentials, setHasCredentials] = useState(true);
  const [token, setToken] = useState({
    token: "",
    userInfo: {},
  });
  const [isLogged, setIsLogged] = useState(false);
  const [path, setPath] = useState("");
  const location = useLocation();
  const handlePath = () => {
    isLogged && String(path).includes("/product/detail/")
      ? setPath("")
      : setPath(location.pathname);
  };
  const [filter, setFilter] = useState();
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())]);

  const handleLogin = async (data) => {
    try {
      const url =
        "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/user/login";

      const loginInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const apiRequest = await fetch(url, loginInfo);
      const dataUser = await apiRequest?.json();
      const jwt = await dataUser?.jwt;

      // console.log("JWT:", dataUser.jwt); // No Borrar este console.log
      if (jwt && dataUser) {
        setHasCredentials(true);
        const getUser = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/user/${data.email}`;
        const authorization = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + jwt,
          },
        };

        const userInfoRequest = await fetch(getUser, authorization);
        const userInfo = await userInfoRequest.json();
        setToken({ token: dataUser.jwt, userInfo });
        setIsLogged(true);
      }
      // else {
      //   setIsLogged(false);
      //   setHasCredentials(false);
      // }
    } catch (error) {
      setIsLogged(false);
      setHasCredentials(false);
    }
  };

  const navigation = useNavigate();
  useEffect(() => {
    if (!isLogged && token.token.length === 0) {
      navigation("/home");
    }
  }, []);

  useEffect(() => {
    handlePath();
  }, [isLogged]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContextGlobal.Provider
      value={{
        handleLogin,
        isLogged,
        setIsLogged,
        handlePath,
        path,
        token,
        setToken,
        filter,
        setFilter,
        navigation,
        dates,
        setDates,
      }}
    >
      <div className="gloabalClass grid-area--3-rows">{children}</div>
      {/* {children} */}
    </ContextGlobal.Provider>
  );
};

/* 
public ResponseEntity<?> searchAvailableProductByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime startDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate)
*/
