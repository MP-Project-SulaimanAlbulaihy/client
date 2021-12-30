import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Map from "./Map";
import { UserContext } from "../Context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState([]);
  const [pulledMark, setPulledMark] = useState([]);
  const {User,setUser} = useContext(UserContext)

  const signup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/signup`, {
        username: e.target.username.value,
        mobile: e.target.mobile.value,
        password: e.target.password.value,
        location: e.target.location.value,
      });
      if (result.data[0]?.msg) {
        setErr(result.data);
      }
      else if(result.data.password){
        const login = await axios.post(`${BASE_URL}/login`, {
          mobileOrUsername: e.target.username.value,
          password: e.target.password.value,
        });
        localStorage.setItem("user_data", JSON.stringify(login.data));
        setUser(login.data)
        navigate("/");
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const pull_mark = (data) => setPulledMark(data);

useEffect(() => {
  console.log(pulledMark.lat);
}, [pulledMark])

  return (
    <div>
      <Navbar />
      <div className="sign_form">
        <h1>Sign Up</h1>
        <form onSubmit={signup}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="mobile">Mobile number</label>
          <input type="text" name="mobile" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" value={pulledMark.lat+','+pulledMark.lng}/>
          <button type="submit">Sign up</button>
        </form>

        {err.map(item=><p>{item.msg}</p>)}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>

      <Map mark={pull_mark}/>
      
      <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
    </div>
  );
};

export default Register;
