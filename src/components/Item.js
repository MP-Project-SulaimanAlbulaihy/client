import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase";
import Item_comments from "./Item_comments";
import Footer from "./Footer";

const Item = () => {
  const { pathname } = useLocation();
  const post_id = pathname.match(/(?:.(?!\/))+$/g)[0].slice(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [ReqBtn, setReqBtn] = useState(false);
  const [resBtn, setResBtn] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updateImgs, setupdateImgs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const noteRest = useRef(null);
  const { User } = useContext(UserContext);
  const navigate = useNavigate();
  const [favouriteStatus, setFavouriteStatus] = useState(false);

  const getPost = () => {
    try {
      axios.get(`${BASE_URL}/post/${post_id}`).then((result) => {
        setPost(result.data);
        setupdateImgs(result.data[0].img);
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
      getPost();
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
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addFavourit = () => {
    try {
      axios
        .get(`${BASE_URL}/favourite/${post[0]._id}`, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          if (result.data.result == "remove favourite") setFavouriteStatus(false);
          else if (result.data.result == "added favourite") setFavouriteStatus(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = () => {
    try {
      axios
        .get(`${BASE_URL}/delete_post/${post[0]._id}`, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          if (result.data == "deleted") {
            navigate('/posts')
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${BASE_URL}/post/${post_id}`,
        {
          title: e.target.title.value,
          desc: e.target.desc.value,
          category: e.target.category.value,
          duration: e.target.duration.value,
          img: updateImgs,
        },
        { headers: { Authorization: `Bearer ${User.token}` } }
      );
      getPost();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const sliceImage = (id) => {
    let picIndex = updateImgs.indexOf(id);
    updateImgs.splice(picIndex, 1);
    setupdateImgs([...updateImgs]);
  };

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setupdateImgs([...updateImgs, url]);
        });
      }
    );
  };

  useEffect(() => {
    setProgress(0);
  }, [updateImgs]);

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (User && post[0]?.user._id == User?.result._id) setUserRole("same_user");
    else if (User?.result.role == "admin") setUserRole("admin");
  }, [User, post]);
  return (
    <div>
      <div className="item" dir="rtl">
        <div className="item_title">
          <h1>??????????????: {post[0]?.title}</h1>
          <p>????????????: {post[0]?.user.username}</p>
          {userRole == "admin" || userRole == "same_user" ? (
            <button onClick={() => setEdit(true)}>
              <p id="edit_logo">
                ??????????{"  "}
                <i class="far fa-edit"></i>
              </p>
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="item_context">
          {post[0]?.status == "post" ? (
            <p>
              <b>?????? ????????</b>
            </p>
          ) : (
            <p>
              <b>?????? ??????????????</b>
            </p>
          )}
          <p>{post[0]?.desc}</p>
          <p>?????? ??????????????????: {post[0]?.duration}</p>
          <p>??????????????: {post[0]?.category}</p>
          <p>
            ???????? ???? {post[0]?.createdAt.slice(0, 10)} {post[0]?.createdAt.slice(11, 16)}
          </p>
          <div className="item_images">
            {post[0]?.img.map((i) => (
              <img src={i} alt="" width="200px" />
            ))}
          </div>
        </div>
        <div className="item_btns" dir="ltr">
          {userRole != "same_user" ? (
            <>
              <button id="reqBtn">
                {post[0]?.status == "post" ? (
                  <p onClick={tryToRequest}>?????? ??????????????</p>
                ) : (
                  <p onClick={tryToRequest}>?????????? ????????????</p>
                )}
              </button>

              <button
                id="chBtn"
                onClick={() =>
                  navigate("/messages", { state: { to: post[0]?.user._id, username: post[0]?.user.username } })
                }
              >
                ?????????? ????????
              </button>
            </>
          ) : (
            <></>
          )}
          {!favouriteStatus ? (
            <button onClick={addFavourit}>
              <i class="far fa-star"></i>
              ??????????
            </button>
          ) : (
            <button onClick={addFavourit}>
              <i class="fas fa-star"></i>
            </button>
          )}
        </div>
      </div>

      {ReqBtn ? (
        <form onSubmit={requestItem}>
          <div className="notePageRest" ref={noteRest} dir="rtl">
            <div className="notePage">
              <h3>????????????</h3>
              <textarea
                name="note"
                id=""
                cols="30"
                rows="10"
                placeholder="???? ???????? ?????????? ???????????? ?????? ???????????????? .."
              ></textarea>
              <div>
                {post[0]?.status == "post" ? (
                  <button type="submit">?????? ??????????????????</button>
                ) : (
                  <button type="submit">?????????? ????????????</button>
                )}
                <button
                  id="back_note_page"
                  type="button"
                  onClick={() => {
                    setReqBtn(false);
                  }}
                >
                  ??????????
                </button>
              </div>
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
              <div className="success_page">
                <h3>???? ???????????? ????????</h3>
                <p>
                  ???????? ???????????? ???? ???????? ???????????? ?????? ??????????
                  <br />
                  ???????????? ???????????? ???????? ?????????? ???? ?????????? ????????????
                </p>
              </div>
            ) : (
              <div className="success_page">
                <h3>???? ???????????? ????????</h3>
                <p>?????? ?????? ?????????? ?????? ???????????? ?????? ???????????? ?????? ???????????? ??????</p>
              </div>
            )}
            <button onClick={() => setResBtn(false)} id="success_btn">
              ??????????
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {edit ? (
        <div className="edit_form">
          <form onSubmit={update} dir="rtl">
            <div className="notePageRest" ref={noteRest}>
              <div className="edit">
                <div>
                  <label>??????????????</label>
                  <input type="text" name="title" defaultValue={post[0]?.title} />
                </div>
                <div>
                  <label>??????????</label>
                  <textarea name="desc" defaultValue={post[0]?.title} cols="30" rows="10"></textarea>
                </div>
                <div>
                  <label htmlFor="category">?????????? ??????????</label>
                  <select name="category" defaultValue={post[0]?.category}>
                    <option value="?????????? ????????????">?????????? ????????????</option>
                    <option value="????????">????????</option>
                    <option value="???????? ????????????">???????? ????????????</option>
                    <option value="????????">????????</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="duration">?????? ??????????????????</label>
                  <select name="duration" defaultValue={post[0]?.duration}>
                    <option value="?????????? 30">?????????? 30</option>
                    <option value="????????">????????</option>
                    <option value="????????????">????????????</option>
                    <option value="??????">??????</option>
                    <option value="??????????">??????????</option>
                    <option value="???????? ???????? ????????">???????? ???????? ????????</option>
                  </select>
                </div>
                {updateImgs?.map((i) => (
                  <>
                    <img src={i} alt="" width="150px" />
                    <button type="button" onClick={() => sliceImage(i)}>
                      x
                    </button>
                  </>
                ))}
                <div className="upload">
                  <input
                    type="file"
                    accept=".gif,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      uploadPictures(e);
                    }}
                    id="img"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="img">?????????? ??????</label>
                  {!(progress == 0) ? (
                    <div className="progress">
                      <p>?????? ?????????? {progress}%</p>
                    </div>
                  ) : null}
                </div>
                <div id="iii">
                  <button
                    type="button"
                    onClick={() => {
                      deletePost();
                    }}
                    id="delete_post"
                  >
                    ?????? ??????????????
                  </button>
                  <button
                    id="back_note_page"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    ??????????
                  </button>
                  <button type="submit">??????????</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <Item_comments postId={post_id} />
      <Footer />
    </div>
  );
};

export default Item;
