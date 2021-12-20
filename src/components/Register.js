import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="formm">
        <h1>Sign Up</h1>
        {/* signup form when submitted excute signup function */}
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
          <label htmlFor="password2">Confirm Password:</label>
          <input type="password" name="password2" />
          <button type="submit">Sign up</button>
        </form>
        {/* <p>{err}</p> */}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Register;
