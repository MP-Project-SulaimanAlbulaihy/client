import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
const Item = () => {
  const { pathname } = useLocation();
  const post_id = pathname.match(/(?:.(?!\/))+$/g)[0].slice(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [ReqBtn, setReqBtn] = useState(false);
  const [resBtn, setResBtn] = useState(false);
  const noteRest = useRef(null)
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

  window.onclick = e => {
    if (e.target === noteRest.current) {
      setReqBtn(false)
      setResBtn(false)
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className="item">
        <div className="item_title">
          <h1>Title: {post[0]?.title}</h1>
        </div>
        <div className="item_context">
          <h1>Status: {post[0]?.status}</h1>
          <p>Description: {post[0]?.desc}</p>
          <p>Duration {post[0]?.duration}</p>
          <p>Category {post[0]?.category}</p>
          <img src={post[0]?.img} alt="" width="200px" />
          <p>created at {post[0]?.createdAt.slice(0, 10)}</p>
        </div>
        <button className="reqBtn">{post[0]?.status == "post" ? <p onClick={() => setReqBtn(true)}>Borrow</p> : <p onClick={() => setReqBtn(true)}>Offer him</p>}</button>
      </div>

      {ReqBtn ? (
        <div className="notePageRest" ref={noteRest} >
            <div className="notePage">
            <h3>Note:</h3>
            <textarea name="note" id="" cols="30" rows="10" placeholder="هل تريد اضافة ملاحظة لصاحب السلعة.."></textarea>
            {post[0]?.status == "post" ? <button onClick={() =>{ setResBtn(true); setReqBtn(false)}}>Request to lend</button> : <button onClick={() => {setResBtn(true); setReqBtn(false)}}>Offer him</button>}
            </div>
        </div>
      ) : (
        <></>
      )}

      {resBtn ? (
        <div className="notePageRest" ref={noteRest} >
          <div className="notePage">
            <h3>Your request has been recieved</h3>
            <p>Kinldy wait for owner approval</p>
            <p>You can check status of request in dashboard page</p>
            <button onClick={() => setResBtn(false)}>OK</button>
          </div>
        </div>
      ) : (
        <></>
      )}


    </div>
  );
};

export default Item;
