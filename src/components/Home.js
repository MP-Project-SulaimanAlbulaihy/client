import React from "react";
import Items from "./Items";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="reqBtns">
      <button onClick={() => {navigate("/add_post")}}><p>Add Post</p></button>
      <button onClick={() => {navigate('/add_post', {state:'request'})}}><p>Request item</p></button>
      </div>
      <Items />
    </div>
  );
};

export default Home;
