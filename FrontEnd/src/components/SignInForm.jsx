import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

function SignInForm() {
  const [password, setPassword] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [correctName, setCorrectName] =useState()
  const [correctLastName, setCorrectLastName] =useState()
  const [correctEmail, setCorrectEmail] =useState()
  const [correctPassword, setCorrectPassword] =useState()
  const [correctPasswordConfirm, setCorrectPasswordConfirm] =useState()
  const [dataUser, setDataUser] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRegister, setIsRegister] = useState();

  const onChangeInput = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    validateFunction(e.target.name)
  };

  useEffect(() => {
    validateFunction(password.confirmPassword)
  },[password])

  function handleSubmit(e) {
    e.preventDefault()
    // validateFunction()
    // setSubmit(true)
    setIsSubmit(true)
    if( validateAllInput() && password.password===password.confirmPassword){
      // alert("Hello")
      register()
      alert("Signin Successfull")
      e.target.reset()
      // alert("Hello")
    }
    
    }
console.log(isRegister)
  async function register(){
    const url = "http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/user/register"
    const data = {
      name: password.name,
      lastName: password.lastname,
      email: password.email,
      password: password.confirmPassword,
    }
    const register = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    }

    const dataRegister = await fetch(url, register)
    const jwt = await dataRegister.jwt

    if(jwt) {
      setIsRegister(true)
    }

  }

  function validateAllInput(){
    return(correctName && correctLastName && correctEmail && correctPassword)
  }

  function validateFunction(input) {
    console.log("Hello")
    console.log(input, "validations function")
    const regEx = /\S+@\S+\.\S+/i
    switch (input) {
      case "name":
        if(!password.name){
          setCorrectName(false)
        } else {
          setCorrectName(true)
        }
        break;
      case "lastname":
        if(password.lastname.trim().length<=0){
          setCorrectLastName(false)
        } else {
          setCorrectLastName(true)
        }
          break;
      case "email":
        if(!regEx.test(password.email)){
          setCorrectEmail(false)
        } else {
          setCorrectEmail(true)
        }
        break;
      case "password":
        if(password.password.trim().length<7){
          setCorrectPassword(false)
          // setCorrectInput({...correctInput, password: false})
        } else {
          setCorrectPassword(true)
        }
        break;
      case "confirmPassword":
        if(password.password !== password.confirmPassword){
          setCorrectPasswordConfirm(false)
        } else {
          setCorrectPasswordConfirm(true)
        }
        break;
      default:
        break;
    }
  }
console.log(password.password, password.confirmPassword)
console.log(correctPasswordConfirm)
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="colorL">Create a new account</h1>
        <div className="input1">
          <label className="labelForm">Name *</label>
          <input
            id="name"
            name="name"
            className="inputForm"
            onChange={onChangeInput}
            type="text"
          />
          {isSubmit && !correctName && <p>Required field</p>}
        </div>
        <div className="input1">
          <label className="labelForm">Lastname</label>
          <input
            id="lastname"
            name="lastname"
            className="inputForm"
            onChange={onChangeInput}
            type="text"
          />
          {isSubmit && !correctLastName && <p>Required field</p>}
        </div>
        <div className="input1">
          <label className="labelForm">Email address</label>
          <input
            id="email"
            name="email"
            className="inputForm"
            onChange={onChangeInput}
            type="email"
          />
          {isSubmit && !correctEmail && <p>Incorrect email format</p>}
        </div>
        <div className="input1">
          <label className="labelForm">Password</label>
          <input
            id="password"
            name="password"
            className="inputForm"
            onChange={onChangeInput}
            type="password"
          ></input>
          {isSubmit && !correctPassword && <p>The password must contain at least 7 characters</p>}
        </div>
        <div className="input1">
          <label className="labelForm">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="inputForm"
            onChange={onChangeInput}
            type="password"
          ></input>
          {/* {isSubmit && (password.confirmPassword && !password.password===password.confirmPassword) && <p>Doesn't match</p>} */}
        </div>

        <button className="button2" type="submit" value="crear cuenta">
          Create account
        </button>
        <p>
          Do you have an account already? <a href="/login">Login</a>{" "}
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
