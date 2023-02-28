import { useContext } from "react";
import { ContextGlobal } from "../utilities/globalContext";

function ReservForm({product}) {

  const {token, setToken } = useContext(ContextGlobal);
    const logoutHandler = () => {
    setToken({
      token: "",
      userInfo: {},
    });
  };

  console.log(token);
  return (
      <div className="form__reserv">
        <form>
          <h1 className="colorL__version2">Complete your data</h1>
          <div className="masterCont">
          <div className="divConteiner">
            <div className="containerFormRe">
              <label className="labelForm">Name</label>
              <input
                id="name"
                name="name"
                className="inputForm"
                type="text"
                required
                disabled
                value={token.userInfo.name}
              />
              </div>
              <div className="containerFormRe">
              <label className="labelForm">Lastname</label>
              <input
                id="lastname"
                name="lastname"
                className="inputForm"
                type="text"
                required
                disabled
                value={token.userInfo.lastName}
              
              />
              </div>
              </div>
              <div className="divConteiner__2">
              <div className="containerFormRe">
            <label className="labelForm">Email</label>
            <input
              id="email"
              name="email"
              className="inputForm"
              type="email"
              required
              disabled
              value={token.userInfo.email}
            
            />
            </div>
            <div className="containerFormRe">
            <label className="labelForm">City</label>
            <input
              id="city"
              name="city"
              className="inputForm"
              type="text"
              required
            
            />
            </div>
            </div>
          
          </div>
        </form>
      </div>
  );
}

export default ReservForm;
