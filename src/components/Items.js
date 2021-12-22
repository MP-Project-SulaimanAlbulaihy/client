import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    try {
      axios.get(`${BASE_URL}/posts`).then((result) => {
        console.log(result.data);
        setPosts(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="sign_form">
      {posts
        ?.map((item) => {
          return (
            <div key={item._id} className="items_post">
              <div onClick={() => navigate(`/post/${item._id}`)}>
                <img src={item.img[0]} wdith="90" height="90" alt="" />
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>created at {item.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default Items;
