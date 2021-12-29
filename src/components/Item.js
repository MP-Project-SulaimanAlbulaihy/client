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
  const [edit, setEdit] = useState(false);
  const [updateImgs, setupdateImgs] = useState([]);

  const noteRest = useRef(null);
  const { User, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [favouriteStatus, setFavouriteStatus] = useState(false);

  const getPost = () => {
    try {
      axios.get(`${BASE_URL}/post/${post_id}`).then((result) => {
        console.log(result.data);
        setPost(result.data);
        setupdateImgs(result.data[0].img)
        for (let i = 0; i < result.data[0]?.favourite.length; i++) {
          setFavouriteStatus(false);
          if (result.data[0]?.favourite[i].post == post_id) {
            setFavouriteStatus(true);
            break;
          }
        }
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
      setEdit(false);
    }
  };

  const tryToRequest = () => {
    if (User) {
      try {
        axios.get(`${BASE_URL}/get_borrow/${post_id}`, { headers: { Authorization: `Bearer ${User.token}` } }).then((result) => {
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
        .post(`${BASE_URL}/borrow/${post_id}`, { poster_id: post[0].user._id, status: post[0].status, note: e.target.note.value }, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          console.log(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addFavourit = () => {
    try {
      axios.get(`${BASE_URL}/favourite/${post[0]._id}`, { headers: { Authorization: `Bearer ${User.token}` } }).then((result) => {
        console.log(result.data);
        if (result.data.result == "remove favourite") setFavouriteStatus(false);
        else if (result.data.result == "added favourite") setFavouriteStatus(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (e) => {
    console.log(updateImgs);
    // try {
    //   e.preventDefault();
    //   const result = await axios.put(
    //     `${BASE_URL}/post/${post_id}`,
    //     {
    //       title: e.target.title.value,
    //       desc: e.target.desc.value,
    //       category: e.target.category.value,
    //       duration: e.target.duration.value,
    //       // img: images,
    //     },
    //     { headers: { Authorization: `Bearer ${User.token}` } }
    //   );
    //   console.log(result.data);
    //   getPost();
    //   setEdit(false)
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const sliceImage = (id)=>{
    
  }

  return (
    <div>
      <Navbar />
      <div className="item">
        <div className="item_title">
          <h1>Title: {post[0]?.title}</h1>
          <p>{post[0]?.user.username}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
        <div className="item_context">
          <h1>Status: {post[0]?.status}</h1>
          <p>Description: {post[0]?.desc}</p>
          <p>Duration {post[0]?.duration}</p>
          <p>Category {post[0]?.category}</p>
          {post[0]?.img.map((i) => (
            <img src={i} alt="" width="200px" />
          ))}
          <p>created at {post[0]?.createdAt.slice(0, 10)}</p>
        </div>
        <button className="reqBtn">{post[0]?.status == "post" ? <p onClick={tryToRequest}>Borrow</p> : <p onClick={tryToRequest}>Offer him</p>}</button>
        <button onClick={() => navigate("/messages", { state: { to: post[0]?.user._id, username: post[0]?.user.username } })}>Send private message</button>
        {!favouriteStatus ? <button onClick={addFavourit}>add favourite</button> : <button onClick={addFavourit}>remove favourite</button>}
      </div>

      {ReqBtn ? (
        <form onSubmit={requestItem}>
          <div className="notePageRest" ref={noteRest}>
            <div className="notePage">
              <h3>Note:</h3>
              <textarea name="note" id="" cols="30" rows="10" placeholder="هل تريد اضافة ملاحظة لصاحب السلعة.."></textarea>
              {post[0]?.status == "post" ? <button type="submit">Request to lend</button> : <button type="submit">Offer him</button>}
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

      {edit ? (
        <>
          <form onSubmit={update}>
            <div className="notePageRest" ref={noteRest}>
              <div className="edit">
                <div>
                  <label>Edit Title:</label>
                  <input type="text" name="title" defaultValue={post[0]?.title} />
                </div>
                <div>
                  <label>Edit Description:</label>
                  <textarea name="desc" defaultValue={post[0]?.title} cols="30" rows="10"></textarea>
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select name="category" defaultValue={post[0]?.category}>
                    <option value="tools">أدوات منزلية</option>
                    <option value="furniture">أثاث</option>
                    <option value="food">مواد غذائية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="duration">Duration</label>
                  <select name="duration">
                    <option value="1">دقيقة 30</option>
                    <option value="2">ساعة</option>
                    <option value="3">ساعتين</option>
                    <option value="4">يوم</option>
                    <option value="5">يومين</option>
                    <option value="6">تبرع لوجه الله</option>
                  </select>
                </div>
                {updateImgs?.map((i) => (
                  <>
                    <img src={i} alt="" width="200px" />
                    <button onClick={()=>sliceImage(i)}>x</button>
                  </>
                ))}
                <div>
                  <button type="submit">Edit</button>
                  <button onClick={() => setEdit(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Item;
