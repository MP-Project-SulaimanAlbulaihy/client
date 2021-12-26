import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../Context/UserContext";
const Item = () => {
  const { pathname } = useLocation();
  const post_id = pathname.match(/(?:.(?!\/))+$/g)[0].slice(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [ReqBtn, setReqBtn] = useState(false);
  const [resBtn, setResBtn] = useState(false);
  const noteRest = useRef(null);
  const { User, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
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

  window.onclick = (e) => {
    if (e.target === noteRest.current) {
      setReqBtn(false);
      setResBtn(false);
    }
  };

  const tryToRequest = () => {
    if (User) {
      try {
        axios
          .get(`${BASE_URL}/get_borrow/${post_id}`, { headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            if (result.data == false) setReqBtn(true);
            else if (result.data) alert("You have already requested this item, Check your profile page for updates");
          });
      } catch (error) {
        console.log(error);
      }
    } else alert("kinldy log in first");
  };

  const requestItem = (e) => {
    e.preventDefault();
    setResBtn(true);
    setReqBtn(false);
    try {
      axios
        .post(
          `${BASE_URL}/borrow/${post_id}`,
          { poster_id: post[0].user._id, status: post[0].status, note: e.target.note.value },
          { headers: { Authorization: `Bearer ${User.token}` } }
        )
        .then((result) => {
          console.log(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="item">
        <div className="item_title">
          <h1>Title: {post[0]?.title}</h1>
          <p>{post[0]?.user.username}</p>
        </div>
        <div className="item_context">
          <h1>Status: {post[0]?.status}</h1>
          <p>Description: {post[0]?.desc}</p>
          <p>Duration {post[0]?.duration}</p>
          <p>Category {post[0]?.category}</p>
          <img src={post[0]?.img} alt="" width="200px" />
          <p>created at {post[0]?.createdAt.slice(0, 10)}</p>
        </div>
        <button className="reqBtn">
          {post[0]?.status == "post" ? <p onClick={tryToRequest}>Borrow</p> : <p onClick={tryToRequest}>Offer him</p>}
        </button>
        <button onClick={()=>navigate('/messages',{state: {to:post[0]?.user._id, username:post[0]?.user.username}})}>Send private message</button>
      </div>

      {ReqBtn ? (
        <form onSubmit={requestItem}>
          <div className="notePageRest" ref={noteRest}>
            <div className="notePage">
              <h3>Note:</h3>
              <textarea
                name="note"
                id=""
                cols="30"
                rows="10"
                placeholder="هل تريد اضافة ملاحظة لصاحب السلعة.."
              ></textarea>
              {post[0]?.status == "post" ? (
                <button type="submit">Request to lend</button>
              ) : (
                <button type="submit">Offer him</button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}

      {resBtn ? (
        <div className="notePageRest" ref={noteRest}>
          <div className="notePage">
            {post[0]?.status == "post" ? (
              <>
                <h3>Your request has been recieved</h3>
                <p>Kinldy wait for owner approval</p>
                <p>You can check status of request in dashboard page</p>
              </>
            ) : (
              <p>Your mobile and note will be shared with owner to contact you</p>
            )}
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
