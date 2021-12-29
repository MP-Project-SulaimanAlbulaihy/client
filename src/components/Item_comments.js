import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Item_comments = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);
  const { User } = useContext(UserContext);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      if (User) {
        const result = await axios.post(
          `${BASE_URL}/new_comment/${props.postId}`,
          {
            comment: e.target.comment.value,
          },
          { headers: { Authorization: `Bearer ${User.token}` } }
        );
        console.log(result.data);
        getComments();
      }
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value = "";
  };

  const getComments = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/comment/${props.postId}`, {
        postID: props.postId,
      });
      console.log(result.data);
      setcommments(result.data);
      setNoComment(result.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const DeleteComment = async (id) => {
    try {
      const resp = await axios.delete(`${BASE_URL}/comment/${id}`, {
        headers: { Authorization: `Bearer ${User.token}` },
      });
      console.log(resp.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateComment = async (id) => {
    try {
      const new_comment = prompt("Edit comment to:");
      const result = await axios.put(
        `${BASE_URL}/comment/${id}`,
        {
          comment: new_comment,
        },
        { headers: { Authorization: `Bearer ${User.token}` } }
      );
      console.log(result.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <form className="comments_form" onSubmit={sendComment}>
        <div className="commentHead">
          <h3>New Comment</h3>
          <button type="submit">Submit</button>
        </div>
        <div className="commentTail">
          <img src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg" alt="" />
          <textarea name="comment" placeholder="Your message" required cols="55" rows="8"></textarea>
        </div>
        <div className="numComment">
          <h3>{noComment} Comments</h3>
        </div>
        {commments
          ?.map((comment, index) => {
            return (
              <div className="realComment" key={index}>
                <hr />
                <div className="realcommentRow">
                  <img
                    src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg"
                    alt=""
                  />
                  <div className="realcommentData">
                    <h3>{comment.user.username}</h3>
                    <p>{comment.comment}</p>
                    <p className="dateP">
                      {comment.createdAt.slice(0, 10)}
                      {comment.createdAt.slice(11, 16)}
                    </p>
                  </div>
                  {comment.user._id == User?.result?._id ? (
                    <p className="del" onClick={() => DeleteComment(comment._id)}>
                      ❌
                    </p>
                  ) : (
                    <></>
                  )}
                  {comment.user._id == User?.result?._id ? (
                    <p className="del" onClick={() => UpdateComment(comment._id)}>
                      🖊️
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
          .reverse()}
      </form>
    </div>
  );
};

export default Item_comments;
