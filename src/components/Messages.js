import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import io from "socket.io-client";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Messages = () => {
  const location = useLocation();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userHistory, setUserHistory] = useState([]);

  const [state, setState] = useState({ message: "", from: "", to: "" });
  const [chat, setChat] = useState([]);
  const { User, setUser } = useContext(UserContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5500");
    socketRef.current.on("message", (data) => {
      console.log(data);
      setChat([...chat, { from: data.from, to: data.to, message: data.message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, message: e.target.value, from: User.result.username, to: "61c8a5b73d430f6f780a3e2b" });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { from, to, message } = state;
    console.log(state);
    socketRef.current.emit("message", { from: User.result._id, to: "61c8a5b73d430f6f780a3e2b", message });
    setState({ message: "", from, to });
  };

  const getUserHistory = () => {
    try {
      axios
        .get(`${BASE_URL}/get_user_history`, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          console.log(result.data[0]?.userHistory);
          if (result.data[0]?.userHistory.length) {
            setUserHistory(result.data[0]?.userHistory);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserHistory = () => {
    try {
      console.log(userHistory, "why");
      axios
        .post(
          `${BASE_URL}/update_user_history`,
          { userHistory: location.state.to },
          { headers: { Authorization: `Bearer ${User.token}` } }
        )
        .then((result) => {
          console.log(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (User) getUserHistory();
    // console.log(userHistory);
  }, [User]);

  useEffect(() => {
    getUserHistory();
    console.log("hhhhhhh", userHistory);
  }, []);

  useEffect(() => {
    // if(userHistory.length)updateUserHistory();
    console.log(userHistory);

    if (
      location?.state?.to && Array.isArray(userHistory)
        ? userHistory.filter((e) => e?.user == location?.state?.to).length == 0
        : false
    ) {
      console.log("n");
      updateUserHistory();
      setUserHistory([...userHistory, { user: location.state.to }]);
    }
  }, [userHistory]);

  return (
    <div>
      <Navbar />
      <div className="messages_component">
        <h1 className="subject">الرسائل</h1>
        <div className="messages">
          <div className="chat">
            <div className="log">
              <p>بتبيع السياكل؟</p>
              <p>بتبيع السياzcvxzcvxzxcvxcvxcvvxcكل؟</p>
              {chat.map(({ from, message }, index) => (
                <div key={index}>
                  <p>
                    {from} :<span>{message}</span>
                  </p>
                </div>
              ))}
            </div>
            <form onSubmit={onMessageSubmit}>
              <div className="input">
                <input
                  type="text"
                  name="chat_input"
                  placeholder="Type message here.."
                  name="message"
                  onChange={(e) => onTextChange(e)}
                  value={state.message}
                />
                <button>Send</button>
              </div>
            </form>
          </div>
          <div className="message_history">
            {Array.isArray(userHistory)?userHistory?.map((i) => (
              <div className="message_history_person">
                <p>{i}</p>
              </div>
            )):<></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
