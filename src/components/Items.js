import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Items = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const { User } = useContext(UserContext);
  let lat = Number(User?.result?.location.split(",")[0]);
  let lng = Number(User?.result?.location.split(",")[1]);

  const getPosts = () => {
    try {
      axios.get(`${BASE_URL}/posts`).then((result) => {
        setPosts(
          result.data.filter((post) => {
            if (
              lat + 0.006 > Number(post?.user?.location.split(",")[0]) &&
              lat - 0.006 < Number(post?.user?.location.split(",")[0]) &&
              lng + 0.006 > Number(post?.user?.location.split(",")[1]) &&
              lng - 0.006 < Number(post?.user?.location.split(",")[1])
            ) {
              return post;
            }
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, [User]);

  return (
    <div className="items">
      {posts.length ? (
        posts
          .map((item) => {
            return (
              <div key={item._id} className="single_one">
                <div className="items_post">
                  <img
                    src={
                      item.img[0]
                        ? item.img[0]
                        : "https://i.ibb.co/rFxkHwV/153-1538921-transparent-community-icon-png-cartoon-transparent-community-png.png"
                    }
                    wdith="90"
                    height="90"
                    alt=""
                    onClick={() => navigate(`/post/${item._id}`)}
                  />

                  <div className="items_post_text">
                    <h2 onClick={() => navigate(`/post/${item._id}`)}>{item.title}</h2>
                    <p dir="rtl">
                      أنشأَ في {item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 16)}
                    </p>
                  </div>
                  <div className="items_post_status">
                    {item.status == "post" ? (
                      <h2 id="post_item_h2">عرض للإستعارة</h2>
                    ) : (
                      <h2 id="request_item_h2">طلب إستعارة</h2>
                    )}
                  </div>
                </div>
              </div>
            );
          })
          .reverse()
      ) : (
        <h1 className="nothing_yet" dir="rtl">
          لا يوجد عروض أو طلبات حتى الان في منطقتك...
        </h1>
      )}
    </div>
  );
};

export default Items;
