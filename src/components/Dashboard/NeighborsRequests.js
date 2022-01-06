import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const NeighborsRequests = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const { User } = useContext(UserContext);

  const getList = () => {
    if (User) {
      try {
        axios
          .get(`${BASE_URL}/waiting_acceptance`, { headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            setPosts(result.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const accept = (item) => {
    if (User) {
      try {
        axios
          .post(`${BASE_URL}/accept_borrow`, {id:item._id, postID:item.post._id},{ headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            alert('accepted')
            getList(); 
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const reject = (item) => {
    if (User) {
      try {
        axios
          .post(`${BASE_URL}/reject_borrow`, {id:item._id},{ headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            alert('rejected')
            getList(); 
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getList();
  }, [User]);

  return (
    <div className="item_full">
      {posts.length ? (
        posts
          .map((item) => {
            return (
              <div key={item._id} className="items_post">
                <img
                  src={
                    item.post.img[0]
                      ? item.post.img[0]
                      : "https://i.ibb.co/rFxkHwV/153-1538921-transparent-community-icon-png-cartoon-transparent-community-png.png"
                  }
                  wdith="90"
                  height="90"
                  alt=""
                  onClick={() => navigate(`/post/${item.post._id}`)}
                />
                  <button onClick={()=>accept(item)} className="acceptBtn">قبول الطلب</button>
                  <button onClick={()=>reject(item)} className="rejectBtn">رفض الطلب</button>
                  <p dir="rtl">ملاحظة: {item.note.length?<>{item.note}</>:<>لا يوجد</>}</p>
                <div className="items_post_text">
                  <h2 onClick={() => navigate(`/post/${item.post._id}`)}>{item.post.title}</h2>
                  <p>أنشأ في {item.post.createdAt.slice(0, 10)}</p>
                </div>
              </div>
            );
          })
          .reverse()
      ) : (
        <h1>لا يوجد أي طلبات</h1>
      )}
    </div>
  );
};

export default NeighborsRequests;
