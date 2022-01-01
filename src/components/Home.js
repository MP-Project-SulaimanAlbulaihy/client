import React, { useContext, useEffect, useState } from "react";
import Items from "./Items";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const [notLogged, setNotLogged] = useState(false);
  const { User } = useContext(UserContext);

  useEffect(() => {
    if (!User) setNotLogged(true);
    if(User) setNotLogged(false);
  }, [User]);

  return (
    <div>
      {notLogged ? (
        <div className="notLogged_container">
          <div className="notLogged">
            <p>يجب عليك تسجيل الدخول لتستعرض المنتجات التي في نفس منطقتك</p>
            <div className="notLogged_btns">
              <button onClick={() => navigate("/login")}>دخول</button>
              <button id="notLogged_btns_registerBtn" onClick={() => navigate("/signup")}>
                تسجيل جديد
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="reqBtns">
        <button
          onClick={() => {
            navigate("/add_post");
          }}
        >
          <p>عرض سلعة</p>
        </button>
        <button
          onClick={() => {
            navigate("/add_post", { state: "request" });
          }}
        >
          <p>طلب إستعارة</p>
        </button>
      </div>
      <Items />
      <Footer />
    </div>
  );
};

export default Home;
