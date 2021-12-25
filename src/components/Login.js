import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const {User,setUser} = useContext(UserContext)
  const login = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/login`, {
        mobileOrUsername: e.target.mobileOrUsername.value,
        password: e.target.password.value,
      });
      console.log(result.data);
      if (typeof result.data=='string') {
        setErr(result.data);
      }else if(result.data.token){
        localStorage.setItem("user_data", JSON.stringify(result.data));
        setUser(result.data)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="sign_form">
        <h1>Login</h1>

        <form onSubmit={login}>
          <label htmlFor="mobileOrUsername">Mobile or Username</label>
          <input type="text" name="mobileOrUsername" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <p>{err}</p>
        <p
          className="forgot"
          onClick={() => {
            navigate("/forgot");
          }}
        >
          Forget Password?
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Login;
