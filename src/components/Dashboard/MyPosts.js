import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const MyPosts = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const { User } = useContext(UserContext);

  const getList = () => {
    if (User) {
      try {
        axios
          .get(`${BASE_URL}/my_posts`, { headers: { Authorization: `Bearer ${User.token}` } })
          .then((result) => {
            console.log('my posts', result.data);
            if(typeof result.data == 'object') setPosts(result.data);
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
                <img src={item.img[0]?item.img[0]:'https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/479bb0d4-f442-4c61-8483-a4fc2abb1e88.png'} wdith="90" height="90" alt="" onClick={() => navigate(`/post/${item._id}`)}/>
                <div className="items_post_status">
                  <h2> الحاله: {item.status=='post'?<>عرض سلعة</>:<>طلب استعارة</>}</h2>
                </div>
                <div className="items_post_text">
                  <h2 onClick={() => navigate(`/post/${item._id}`)}>{item.title}</h2>
                  <p>أنشأ في {item.createdAt.slice(0, 10)}</p>
                </div>

              </div>
            );
          })
          .reverse()
      ) : (
        <h1>لا يوجد أي اعلانات</h1>
      )}
    </div>
  );
};

export default MyPosts;
