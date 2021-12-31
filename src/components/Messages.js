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
  const [currentTo, setCurrentTo] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log(chatHistory[0]);
  }, [chatHistory]);

  const [state, setState] = useState({ message: "", from: "", to: "" });
  const [chat, setChat] = useState([]);
  const { User } = useContext(UserContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5500");
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on("receive_message", (data) => {
      console.log(data);
      //   setChat([...chat, { from: data.from, to: data.to, message: data.message, username: data.username }]);
    });
    // return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, message: e.target.value, from: User.result.username, to: currentTo });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { from, to, message } = state;
    console.log(state);
    socketRef.current.emit("send_message", {
      from: User.result._id,
      to: currentTo,
      message,
      username: User.result.username,
    });
    setState({ message: "", from, to });
  };

  const getUserHistory = () => {
    try {
      axios
        .get(`${BASE_URL}/get_user_history`, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          console.log(result.data);
          if (result.data[0]?.userHistory.length) {
            setUserHistory(result.data[0]?.userHistory);
            setChatHistory(result.data);
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
    if (User) getUserHistory();
  }, [User]);

  useEffect(() => {
    console.log(currentTo, "to");
  }, [currentTo]);

  useEffect(() => {
    if (
      location?.state?.to &&
      (Array.isArray(userHistory) ? userHistory?.filter((e) => e._id == location?.state?.to).length == 0 : false) &&
      User
    ) {
      updateUserHistory();
      setCurrentTo(location.state.to);
      getUserHistory();
    }
  }, []);

  const connectRoom = (i) => {
      setCurrentTo(i._id);
      if (currentTo) {
        console.log(i._id);
      socketRef.current.emit("joined", { from: User.result._id, to: currentTo });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="messages_component">
        <h1 className="subject">الرسائل</h1>
        <div className="messages">
          <div className="chat">
            <div className="log">
              {chatHistory[0]?.to.map((item, index) => (
                <div key={index}>
                  {item.to == currentTo ? (
                    <>
                      {item.content.map((i, index) => (
                        <p key={index}>
                          {chatHistory[0]?.from.username}
                          <br />
                          <span>{i}</span>
                        </p>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              {chat.map(({ username, message }, index) => (
                <p key={index}>
                  {username}
                  <br />
                  <span>{message}</span>
                </p>
              ))}
            </div>
            {currentTo ? (
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
            ) : (
              <></>
            )}
          </div>
          <div className="message_history">
            {Array.isArray(userHistory) ? (
              userHistory?.map((i, index) => (
                <div
                  className="message_history_person"
                  onClick={() => connectRoom(i) }
                  key={index}
                >
                  <p>{i.username}</p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
