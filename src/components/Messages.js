import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import io from "socket.io-client";

const Messages = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5500");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

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
            </div>
            <div className="input"></div>
          </div>
          <div className="message_history"></div>
        </div>
      </div>

      {/* <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <input name="name" onChange={(e) => onTextChange(e)} value={state.name} type="text" />
          </div>
          <div>
            <input
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              type="text"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div> */}
    </div>
  );
};

export default Messages;
