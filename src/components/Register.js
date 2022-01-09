import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Map from "./Map";
// import firebase from "../firebase/phone_auth";
import firebase from "../firebase/phone_auth";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [errLogin, setErrLogin] = useState("");
  const [err, setErr] = useState([]);
  const [pulledMark, setPulledMark] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const { setUser } = useContext(UserContext);
  const [verify, setverify] = useState(false);
  const [verifyResult, setVerifyResult] = useState("");
  const signupForm = useRef(null);

  const login = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/login`, {
        mobileOrUsername: e.target.mobileOrUsername.value,
        password: e.target.password.value,
      });
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
    console.log('im hereeee ', signupForm);
    try {
      const resp = await axios.post(`${BASE_URL}/signup`, {
        username: e.target.username.value,
        mobile: e.target.mobile.value,
        password: e.target.password.value,
        location: e.target.location.value,
      });
      if (resp.data.password) {
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

  const validate = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/validate`, {
        username: signupForm.current.username.value,
        mobile: signupForm.current.mobile.value,
        password: signupForm.current.password.value,
        location: signupForm.current.location.value,
      });
      if (result.data[0]?.msg) {
        setErr(result.data);
      } else if (result.data == "validated") {
        setUpRecaptua();

        const phoneNumber = "+966540424453";
        const appVerifier = window.recaptchaVerifier;
        console.log(phoneNumber);
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("otp sent");
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            console.log(error);
            // ...
          });
        setverify(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pull_mark = (data) => setPulledMark(data);

  const setUpRecaptua = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: (response) => {
        console.log("captuca verified");
      },
    });
  };

  const verifyCode = (e) => {
    e.preventDefault();

    const code = signupForm.current.code.value;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log("Success code");
        signup(e)
      })
      .catch((error) => {
        console.log("Failed Code");
        setVerifyResult("Incorrect code");
      });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {showMap ? (
        <div className="map_container">
          <div className="map">
            <Map mark={pull_mark} />
            <span onClick={() => setShowMap(false)}>
              <i class="fas fa-times"></i>
            </span>
            <button onClick={() => setShowMap(false)}>موافق</button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div class="registeration" dir="rtl">
        <input type="checkbox" id="chk" aria-hidden="true" defaultChecked={false} />

        <div class="signup">
          <form onSubmit={verifyCode} ref={signupForm}>
            <div id="sign-in-button"></div>
            {!verify ? (
              <>
                <label for="chk" aria-hidden="true">
                  تسجيل جديد
                </label>
                <input type="text" name="username" placeholder="اسم المستخدم" required />
                <input type="text" name="mobile" placeholder="رقم الجوال" required />
                <input type="password" name="password" placeholder="الرقم السري" required />
                <div className="mapInput">
                  <input type="text" name="location" value={pulledMark.lat ? pulledMark.lat + "," + pulledMark.lng : ""} placeholder="الموقع" required />
                  <button onClick={() => setShowMap(true)} type="button">
                    اختار من الخريطة
                  </button>
                </div>
                <button type="button" onClick={() => validate()}>
                  تسجيل جديد
                </button>
                {err.map((item) => (
                  <p className="signUper">{item.msg}</p>
                ))}
              </>
            ) : (
              <>
                <label for="chk" aria-hidden="true" id="code">
                  الكود السري
                </label>
                <input type="password" name="code" placeholder="أدخل رقم الكود المرسل.." required />
                <p className="signUper">{verifyResult}</p>
                <button type="button" onClick={() => setverify(false)} id="back_boy">
                  رجوع
                </button>
                <div id="sign-in-button"></div>

                <button type="submit">إتمام التسجيل</button>
              </>
            )}
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
