import React from "react";
import { Searcher } from "../components/Searcher";
import SignInForm from "../components/SignInForm";

export const Signin = () => {
  return (
    <>
      <Searcher />
      <div className="formPage">
        <SignInForm />
      </div>
    </>
  );
};
