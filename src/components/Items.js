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
    <div className="items">
      {posts.length ? (
        posts
          .map((item) => {
            return (
              <div key={item._id} className="items_post">
                  <img src={item.img[0]} wdith="90" height="90" alt=""  onClick={() => navigate(`/post/${item._id}`)}/>
                <div className="items_post_text">
                  <h2 onClick={() => navigate(`/post/${item._id}`)}>{item.title}</h2>
                  <p>created at {item.createdAt.slice(0, 10)}</p>
                </div>
                <div className="items_post_status"><h2>{item.status}</h2></div>
              </div>
            );
          })
          .reverse()
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Items;
