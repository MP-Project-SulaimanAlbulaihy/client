import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Register";
import NewPost from "./components/NewPost";
import Item from "./components/Item";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import { UserContext } from "./Context/UserContext";
import { useMemo, useState } from "react";
import Favourite from "./components/favourite";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  const [wizard, setWizard] = useState('');
  const [User, setUser] = useState(null);
  const value = useMemo(() => ({ User, setUser }), [User, setUser]);

  return (
    <div className="App">
      <video autoPlay muted loop id="myVideo">
        <source src="https://giant.gfycat.com/DeafeningEqualConch.mp4" type="video/mp4" />
      </video>
      <div className={`wizard_container ${wizard}`}>
        <div className="wizard">
          <img src="https://i.ibb.co/71WXQyJ/c1c76764cc32bb0411236fa171279134.jpg" alt="wizard" />
          <span onClick={() => setWizard('hide')}><i class="fas fa-times"></i></span>
        </div>
      </div>
      <UserContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/add_post" element={<NewPost />} />
          <Route exact path="/post/:id" element={<Item />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/favourite" element={<Favourite />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
