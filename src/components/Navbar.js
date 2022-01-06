import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [showNotification, setshowNotification] = useState(false);
  const { User, setUser } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState("");

  const logout = () => {
    localStorage.removeItem("user_data");
    setUser(null);
    navigate("/");
  };

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

  const [scrolled, setscrolled] = useState("");
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
      {User ? (
        <>
          <div>
            <button onClick={logout}>

              <p>خروج</p>
            </button>
            <div class="dropdown">
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
          </div>
          <div>
            <button
              id={activeMenu == "messages" ? `active` : null}
              onClick={() => {
                navigate("/messages");
                setActiveMenu("messages");
              }}
            >
              <p>الرسائل</p>
            </button>
            <button
              id={activeMenu == "fav" ? `active` : null}
              onClick={() => {
                navigate("/favourite");
                setActiveMenu("fav");
              }}
            >
              <p>مفضلتي</p>
            </button>
            <button
              id={activeMenu == "profile" ? `active` : null}
              onClick={() => {
                navigate("/dashboard");
                setActiveMenu("profile");
              }}
            >
              
              <p>ملفي الشخصي</p>
            </button>
            <button
              id={activeMenu == "home" ? `active` : null}
              onClick={() => {
                navigate("/posts");
                setActiveMenu("home");
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
            }}
          >
            
            <p>دخول</p>
          </button>
          <button
            id={activeMenu == "register" ? `active` : null}
            onClick={() => {
              navigate("/signup");
              setActiveMenu("register");
            }}
          >
            
            <p>تسجيل جديد</p>
          </button>
        </div>
      )}
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="https://i.ibb.co/HXCzxGP/Screenshot-2022-01-01-052203.png" />
      </div>
    </div>
  );
};

export default Navbar;
