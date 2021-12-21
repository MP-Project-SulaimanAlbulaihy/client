import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GoogleMapReact from "google-map-react";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");

  const signup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/signup`, {
        username: e.target.username.value,
        mobile: e.target.mobile.value,
        password: e.target.password.value,
        location: e.target.location.value,
      });
      console.log(result.data);
      // if (result.data.err) {
      //   setErr(result.data.err);
      //   // localStorage.setItem("role", result.data.result.role.role);
      // } else if (result.data.success) {
      //   console.log("helllllo");
      //   localStorage.setItem("token", true);
      //   navigate("/posts");
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
          <input type="text" name="location" />
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

      <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyC84xwatWNrBJcYq8W1Kn723iYd3-_UpDY" }} defaultCenter={{lat: 59.95, lng: 30.33}} defaultZoom={11}>
            <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
          </GoogleMapReact>
        </div>
    </div>
  );
};

export default Register;
