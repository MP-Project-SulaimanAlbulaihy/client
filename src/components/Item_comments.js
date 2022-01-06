import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Item_comments = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);
  const [showEdit, setShowEdit] = useState([false, -1]);
  const [newComment, setnewComment] = useState("");
  const { User } = useContext(UserContext);

  const sendComment = async (e) => {
    e.preventDefault();
    if (User) {
      try {
        const result = await axios.post(
          `${BASE_URL}/new_comment/${props.postId}`,
          {
            comment: e.target.comment.value,
          },
          { headers: { Authorization: `Bearer ${User.token}` } }
        );
        getComments();
      } catch (err) {
        console.error(err);
      }
      e.target.comment.value = "";
    } else {
      alert("Log in first..");
    }
  };

  const getComments = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/comment/${props.postId}`, {
        postID: props.postId,
      });
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
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateComment = async (id) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/comment/${id}`,
        {
          comment: newComment,
        },
        { headers: { Authorization: `Bearer ${User.token}` } }
      );
      setShowEdit(false);
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
          <h3>إضافة تعليق</h3>
        </div>
        <div className="commentTail">
          <textarea dir="rtl" name="comment" placeholder="محتوى التعليق" required cols="55" rows="8"></textarea>
        </div>
        <button type="submit" id="submit_comment_btn">
          إرسال
        </button>
        <br />
        <div className="numComment">
          <h3 dir="rtl">عدد التعليقات {noComment}</h3>
        </div>
        {commments
          ?.map((comment, index) => {
            return (
              <div className="realComment" dir="rtl" key={index}>
                <hr />
                <div className="realcommentRow">
                  <div className="flex_inline">
                    <img src={comment.user.avatar} alt="" />
                    <div className="realcommentData">
                      <h3>{comment.user.username}</h3>
                      {showEdit[0] && showEdit[1]==index ? (
                        <div className="newComment_input">
                          <input type="text" name="newComment" defaultValue={comment.comment} onChange={(e)=>setnewComment(e.target.value)} required/>
                          <button type="button"  onClick={()=> setShowEdit(false, index)}>الغاء</button>
                          <button type="button" onClick={() => UpdateComment(comment._id)}>تعديل</button>
                        </div>
                      ) : (
                        <>
                          <p>{comment.comment}</p>
                        </>
                      )}
                          <p className="dateP">
                            {comment.createdAt.slice(0, 10)} {comment.createdAt.slice(11, 16)}
                          </p>
                    </div>
                  </div>
                  <div className="flex_inline">
                    {comment.user._id == User?.result?._id ? (
                      <p className="del" onClick={() => DeleteComment(comment._id)}>
                        <i class="far fa-trash-alt"></i>
                      </p>
                    ) : (
                      <></>
                    )}
                    {comment.user._id == User?.result?._id ? (
                      <p className="del" onClick={() => setShowEdit([true, index])}>
                        <i class="far fa-edit"></i>
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
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
