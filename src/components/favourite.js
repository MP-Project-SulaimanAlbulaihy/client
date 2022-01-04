import { UserContext } from "../Context/UserContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const { User } = useContext(UserContext);

  const getList = () => {
    if (User) {
      try {
        axios.get(`${BASE_URL}/favourite`, { headers: { Authorization: `Bearer ${User.token}` } }).then((result) => {
          console.log(result.data);
          if (result.data.length) setPosts(result.data);
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
    <div className="fav_component">
      <h1 className="favourite_title">المفضلة</h1>
      <div className="favourite">

        <div className="borrowed">
          {posts.length ? (
            posts
              .map((item) => {
                return (
                  <div key={item._id} className="items_post">
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
                    <div className="items_post_status">
                      <h2 >نوع الطلب <br/><h5>{item.post.status=='post'?<>عرض سلعة</>:<>طلب إستعارة</>}</h5></h2>
                    </div>
                    <div className="items_post_text">
                      <h2 onClick={() => navigate(`/post/${item.post._id}`)}>{item.post.title}</h2>
                      <p>أنشأ في {item.post.createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                );
              })
              .reverse()
          ) : (
            <h1 id="no_favourite_yet">لا يوجد تفضيل إلى الان</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
