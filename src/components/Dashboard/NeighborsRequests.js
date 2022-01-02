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
            console.log(result.data);
            if(typeof result.data == 'object') setPosts(result.data);
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
          .post(`${BASE_URL}/accept_borrow`, {id:item._id},{ headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            console.log(result.data);
            alert('accepted')
            window.location.reload(); 
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
                  {/* {console.log(item)} */}
                <img
                  src={
                    item.post.img[0]
                      ? item.post.img[0]
                      : "https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/479bb0d4-f442-4c61-8483-a4fc2abb1e88.png"
                  }
                  wdith="90"
                  height="90"
                  alt=""
                  onClick={() => navigate(`/post/${item.post._id}`)}
                />
                  <button onClick={()=>accept(item)} className="acceptBtn">قبول الطلب</button>
                  <p>ملاحظة: {item.note}</p>
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
