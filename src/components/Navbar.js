import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [showNotification, setshowNotification] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { User, setUser } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState("");
  const [scrolled, setscrolled] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const logout = () => {
    localStorage.removeItem("user_data");
    setUser(null);
    setToggle(false);
    navigate("/");
  };

  useEffect(() => {
    if(screenWidth>600) setToggle(false)
  }, [screenWidth])
  window.addEventListener('resize',()=>setScreenWidth(window.innerWidth))
  const isTokenExpired = () => {
    try {
      axios.post(`${BASE_URL}/check_token_expired`, { token: User.token }).then((result) => {
        if (result.data) {
          logout();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (User == null) {
      setUser(JSON.parse(localStorage.getItem("user_data")));
    }
  }, []);
  useEffect(() => {
    if (User !== null) isTokenExpired();
  }, [User]);

  const scrol = () => {
    if (window.scrollY > 60) {
      setscrolled("scroled");
    } else {
      setscrolled("");
    }
  };
  window.addEventListener("scroll", scrol);

  return (
    <div className="navbar" id={`${scrolled}`}>
      <div className="nav_toggle" onClick={() => setToggle(!toggle)}>
        <i class="fa-solid fa-bars" style={{ color: toggle||scrolled.length ? "#163644" : "white" }}></i>
      </div>
      <div className="nav_without_logo" id={`${toggle && screenWidth < 600 ? "toggled" : " "}`}>
        {User ? (
          <>
            <div>
              <button onClick={logout}>
                <p>خروج</p>
              </button>
              <div class="dropdown" style={{width:screenWidth < 600?'100%':""}}>
                <button class="dropbtn">
                  <p>
                    <i class="far fa-bell"></i> الاشعارات
                  </p>
                </button>
                <div class="dropdown-content">
                  <a>
                    <p>لا يوجد اشعارات</p>
                  </a>
                </div>
              </div>

              <button
                id={activeMenu == "messages" ? `active` : null}
                onClick={() => {
                  setActiveMenu("messages");
                  navigate("/messages");
                  setToggle(false);
                }}
              >
                <p>الرسائل</p>
              </button>
              <button
                id={activeMenu == "fav" ? `active` : null}
                onClick={() => {
                  setActiveMenu("fav");
                  navigate("/favourite");
                  setToggle(false);
                }}
              >
                <p>مفضلتي</p>
              </button>
              <button
                id={activeMenu == "profile" ? `active` : null}
                onClick={() => {
                  setActiveMenu("profile");
                  navigate("/dashboard");
                  setToggle(false);
                }}
              >
                <p>ملفي الشخصي</p>
              </button>
              <button
                id={activeMenu == "home" ? `active` : null}
                onClick={() => {
                  setActiveMenu("home");
                  navigate("/posts");
                  setToggle(false);
                }}
              >
                <p>الرئيسية</p>
              </button>
            </div>
          </>
        ) : (
          <div>
            <button
              id={activeMenu == "login" ? `active` : null}
              onClick={() => {
                navigate("/login");
                setActiveMenu("login");
                setToggle(false);
              }}
            >
              <p>دخول</p>
            </button>
            <button
              id={activeMenu == "register" ? `active` : null}
              onClick={() => {
                setActiveMenu("register");
                navigate("/signup");
                setToggle(false);
              }}
            >
              <p>تسجيل جديد</p>
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          navigate("/");
          setToggle(false);
        }}
      >
        <img src="https://i.ibb.co/HXCzxGP/Screenshot-2022-01-01-052203.png" />
      </div>
    </div>
  );
};

export default Navbar;
