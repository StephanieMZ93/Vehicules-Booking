import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ContextGlobal } from "../utilities/globalContext";

function SignInForm() {
  const { setToken, setIsLogged, navigation, token } =
    useContext(ContextGlobal);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });
  // console.log("ERRORS: ", errors);

  async function registerValidation(data) {
    const url =
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/user/register";
    const registerInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const dataRegister = await fetch(url, registerInfo);
    const dataUser = await dataRegister.json();
    const jwt = await dataUser.jwt;

    if (jwt) {
      // console.log("jwtLogin", jwt);
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
      setToken({ token: jwt, userInfo });
      // console.log("TOKENlOGIN", token);
      setIsLogged(true);
      navigation("/home");
    } else {
      setIsLogged(false);
    }
  }

  const onSubmit = (data) => {
    registerValidation(data);
    // console.log(data);
  };

  // useEffect(() => {

  // }, []);

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="colorL">Create a new account</h1>
        <div className="input1">
          <label className="labelForm">Name </label>
          <input
            id="name"
            name="name"
            className="inputForm"
            type="text"
            placeholder="John"
            {...register("name", {
              required: "This field is required",
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <p className="errorMessage">{errors.name?.message}</p>
          <p className="errorMessage">
            {errors.name?.type === "pattern" &&
              "This field must neither contain numbers nor special characters."}
          </p>
        </div>
        <div className="input1">
          <label className="labelForm">Lastname</label>
          <input
            id="lastName"
            name="lastName"
            className="inputForm"
            type="text"
            placeholder="Smith"
            {...register("lastName", {
              required: "This field is required",
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <p className="errorMessage">{errors.lastName?.message}</p>
          <p className="errorMessage">
            {errors.lastName?.type === "pattern" &&
              "This field must neither contain numbers nor special characters."}
          </p>
        </div>
        <div className="input1">
          <label className="labelForm">Email address</label>
          <input
            id="email"
            name="email"
            className="inputForm"
            type="email"
            placeholder="johnsmith97@gmail.com"
            {...register("email", {
              required: "This field is required.",
              pattern:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
          />
          <p className="errorMessage">{errors.email?.message}</p>
          <p className="errorMessage">
            {errors.email?.type === "pattern" && "Invalid email address."}
          </p>
        </div>
        <div className="input1">
          <label className="labelForm">Password</label>
          <input
            id="password"
            name="password"
            className="inputForm"
            type="password"
            placeholder="Smith12--"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 7,
                message: "Min lenght is 7 characters",
              },
            })}
          />
          <p className="errorMessage">{errors.password?.message}</p>
        </div>
        <div className="input1">
          <label className="labelForm">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="inputForm"
            type="password"
            placeholder="Smith12--"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") || (
                  <p>"The passwords do not match"</p>
                ),
            })}
          />
          <p className="errorMessage">{errors.confirmPassword?.message}</p>
        </div>

        <button className="button2" type="submit" value="sign in">
          Create account
        </button>
        <p>
          Do you have an account already? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
