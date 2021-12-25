import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const {User,setUser} = useContext(UserContext)
  useEffect(() => {
    if(User==null && localStorage.getItem('user_data')){
      setUser(JSON.parse(localStorage.getItem('user_data')))
    }
  }, [])
  console.log('user is ',User);
  return (
    <div className="navbar">
      {User?
      <>
        <button onClick={() => {localStorage.removeItem('user_data'); setUser(null)}}> <p>Logout</p> </button>
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
