import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Messages = () => {
  const location = useLocation();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userHistory, setUserHistory] = useState([]);
  const [currentTo, setCurrentTo] = useState(null);
  const [getuserchat, setGetuserchat] = useState([]);


  const [state, setState] = useState({ message: "", from: "", to: "" });
  const [chat, setChat] = useState([]);
  const { User } = useContext(UserContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5500");
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on("message", (data) => {
      console.log("ttttttttttttttttttttt", User?.result?._id);
      if (data.to == User?.result?._id && User)
        setChat([...chat, { from: data.from, to: data.to, message: data.message, username: data.username }]);
    });
    // return () => socketRef.current.disconnect();
  }, [chat, User]);

  const onTextChange = (e) => {
    setState({ ...state, message: e.target.value, from: User.result.username, to: currentTo });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { from, to, message } = state;
    console.log(state);
    socketRef.current.emit("message", {
      from: User.result._id,
      to: currentTo,
      message,
      username: User.result.username,
    });
    setChat([...chat, { from: User.result._id, to: currentTo, message, username: User.result.username }]);
    setState({ message: "", from, to });
  };

  const getChats = () => {
    try {
      axios.get(`${BASE_URL}/get_chat`, { headers: { Authorization: `Bearer ${User.token}` } }).then((result) => {
        console.log(result.data);
        if (result.data) {
          setGetuserchat(result.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserHistory = () => {
    try {
      axios
        .get(`${BASE_URL}/get_user_history`, { headers: { Authorization: `Bearer ${User.token}` } })
        .then((result) => {
          console.log(result.data);
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
      axios
        .post(
          `${BASE_URL}/update_user_history`,
          { newUser: location.state.to },
          { headers: { Authorization: `Bearer ${User.token}` } }
        )
        .then((result) => {
          console.log(result.data);
          getUserHistory();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (User) {
      getChats();
      getUserHistory();
    }
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
      <div className="messages_component">
        <h1 className="subject">الرسائل</h1>
        <div className="messages">
          <div className="chat">
            <div className="log">
              {getuserchat?.map((item, index) => (
                <div key={index} dir="rtl">
                  {(item.to == currentTo)||(item.from==currentTo) ? (
                    <>
                      {item.content.map((i, index) => (
                        <p key={index} id={item.to == currentTo?'me_chat':''}>
                            <span>{item.username}</span>
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
                <p key={index}  id='me_chat'>
                  {username}
                  <br />
                  <span>{message}</span>
                </p>
              ))}
            </div>
            {userHistory?.length<=0?<h1 id="no_chat_history">لا يوجد محادثات مسبقة</h1>:<></>}
            {currentTo ? (
              <form onSubmit={onMessageSubmit}>
                <div className="input">
                  <input dir="rtl"
                    type="text"
                    name="chat_input"
                    placeholder="اكتب الرسالة هنا.."
                    name="message"
                    onChange={(e) => onTextChange(e)}
                    value={state.message}
                  />
                  <button>أرسل</button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
          <div className="message_history">
            {Array.isArray(userHistory) ? (
              userHistory?.map((i, index) => (
                <div className="message_history_person" onClick={() => connectRoom(i)} key={index}>
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
