import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      {User?
      <>
        <button onClick={logout}> <p>Logout</p> </button>
        <button onClick={() => {navigate("/notification")}}> <p>Notification</p> </button>
        <button onClick={() => {navigate("/messages")}}> <p>Messages</p> </button>
        <button onClick={() => {navigate("/favourite")}}> <p>Favourite</p> </button>
        <button onClick={() => {navigate("/dashboard")}}> <p>Dashboard</p> </button>
      </>:
      <>
        <button onClick={() => {navigate("/login")}}> <p>Login</p> </button>
        <button onClick={() => {navigate("/signup")}}> <p>Register</p> </button>
      </>}
      <h1 onClick={() => {navigate("/")}}>BorrowLogo</h1>
    </div>
  );
};

export default Navbar;
