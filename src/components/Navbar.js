import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const {User,setUser} = useContext(UserContext)
  console.log('user is ',User);
  return (
    <div className="navbar">
      <button onClick={() => {navigate("/")}}><p>Home</p></button>
      <button onClick={() => {navigate("/login")}}> <p>Login</p> </button>
      <button onClick={() => {navigate("/signup")}}> <p>Register</p> </button>
      <button onClick={() => {navigate("/dashboard")}}> <p>Dashboard</p> </button>
      <h1>BorrowLogo</h1>
    </div>
  );
};

export default Navbar;
