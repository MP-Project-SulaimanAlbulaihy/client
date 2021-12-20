import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <button onClick={() => {navigate("/")}}><p>Home</p></button>
      <button onClick={() => {navigate("/login")}}> <p>Login</p> </button>
      <button onClick={() => {navigate("/signup")}}> <p>Register</p> </button>
      <h1>BorrowLogo</h1>
    </div>
  );
};

export default Navbar;
