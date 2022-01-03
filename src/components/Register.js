import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Map from "./Map";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [errLogin, setErrLogin] = useState("");
  const [err, setErr] = useState([]);
  const [pulledMark, setPulledMark] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const { setUser } = useContext(UserContext);
  const login = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/login`, {
        mobileOrUsername: e.target.mobileOrUsername.value,
        password: e.target.password.value,
      });
      console.log(result.data);
      if (typeof result.data == "string") {
        setErrLogin(result.data);
      } else if (result.data.token) {
        localStorage.setItem("user_data", JSON.stringify(result.data));
        setUser(result.data);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      } else if (result.data.password) {
        const login = await axios.post(`${BASE_URL}/login`, {
          mobileOrUsername: e.target.username.value,
          password: e.target.password.value,
        });
        localStorage.setItem("user_data", JSON.stringify(login.data));
        setUser(login.data);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pull_mark = (data) => setPulledMark(data);


  return (
    <>

      {showMap ? (
        <div className="map_container">
          <div className="map">
            <Map mark={pull_mark} />
            <span onClick={() => setShowMap(false)}><i class="fas fa-times"></i></span>
            <button onClick={() => setShowMap(false)}>موافق</button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div class="registeration" dir="rtl">
        <input type="checkbox" id="chk" aria-hidden="true" defaultChecked={false} />

        <div class="signup">
          <form onSubmit={signup}>
            <label for="chk" aria-hidden="true">
              تسجيل جديد
            </label>
            <input type="text" name="username" placeholder="اسم المستخدم" required />
            <input type="text" name="mobile" placeholder="رقم الجوال" required />
            <input type="password" name="password" placeholder="الرقم السري" required />
            <div className="mapInput">
              <input
                type="text"
                name="location"
                value={pulledMark.lat ? pulledMark.lat + "," + pulledMark.lng : ""}
                placeholder="الموقع"
                required
              />
              <button onClick={() => setShowMap(true)} type="button">
                اختار من الخريطة
              </button>
            </div>
            <button>تسجيل جديد</button>
            {err.map((item) => (
              <p className="signUper">{item.msg}</p>
            ))}
          </form>
        </div>

        <div class="login">
          <form onSubmit={login}>
            <label for="chk" aria-hidden="true">
              تسجيل دخول
            </label>
            <input type="text" name="mobileOrUsername" placeholder="اسم المستخدم او رقم الجوال" required />
            <input type="password" name="password" placeholder="الرقم السري" required />
            <button>دخول</button>
            <p className="er">{errLogin}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
