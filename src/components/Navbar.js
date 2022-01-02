import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [showNotification, setshowNotification] = useState(false)
  const {User,setUser} = useContext(UserContext)

  const logout = ()=> {
    localStorage.removeItem('user_data'); 
    setUser(null)
  }

  const isTokenExpired = ()=> {
    try {
      axios.post(`${BASE_URL}/check_token_expired`, { token:User.token }).then((result) => {
        if(result.data){
          logout();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(User==null){
      setUser(JSON.parse(localStorage.getItem('user_data')))
    }
  }, [])
  useEffect(() => {
    if(User!==null) isTokenExpired()
  }, [User])

  
  // console.log('user is ',User);
  return (
    <div className="navbar">
      
      {showNotification?<div className="noti">
        <p>لا يوجد اشعارات</p>
      </div>:null}

      {User?
      <>
        <div>
          <button onClick={logout}> <p>خروج</p> </button>
          <button onClick={() => {navigate("/notification")}} onMouseOver={()=>{setshowNotification(true)}} onMouseOut={()=>{setshowNotification(false)}}> <p><i class="far fa-bell"></i> الاشعارات</p> </button>
        </div>
        <div>
            <button onClick={() => {navigate("/messages")}}> <p>الرسائل</p> </button>
            <button onClick={() => {navigate("/favourite")}}> <p>مفضلتي</p> </button>
            <button onClick={() => {navigate("/dashboard")}}> <p>ملفي الشخصي</p> </button>
            <button onClick={() => {navigate("/posts")}}> <p>الطلبات</p> </button>
        </div>
      </>:
          <div>
            <button onClick={() => {navigate("/login")}}> <p>دخول</p> </button>
            <button onClick={() => {navigate("/signup")}}> <p>تسجيل جديد</p> </button>
          </div>}
      <div onClick={() => {navigate("/")}}><img src="https://i.ibb.co/HXCzxGP/Screenshot-2022-01-01-052203.png" /></div>
    </div>
  );
};

export default Navbar;
