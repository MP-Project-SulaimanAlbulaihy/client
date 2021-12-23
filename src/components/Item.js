import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from './Navbar'

const Item = () => {
  const {pathname} = useLocation();
  const post_id = pathname.match(/(?:.(?!\/))+$/g)[0].slice(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);

  const getPost = () => {
    try {
      axios.get(`${BASE_URL}/post/${post_id}`).then((result) => {
        console.log(result.data);
        setPost(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
    return (
        <div>
            <Navbar/>
            <div className="sign_form">
                <div className="item_title">
                    <h1>Title: {post[0]?.title}</h1>
                    <p>Description: {post[0]?.desc}</p>
                    <p>Duration {post[0]?.duration}</p>
                    <p>Category {post[0]?.category}</p>
                    <img src={post[0]?.img} alt="" />
                    <p>created at {post[0]?.createdAt.slice(0, 10)}</p>
                </div>
                <div className="item_context"></div>
            </div>
        </div>
    )
}

export default Item
