import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Register";
import NewPost from "./components/NewPost";
import Item from "./components/Item";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./Context/UserContext";
import { useMemo, useState } from "react";

function App() {
  const [User, setUser] = useState(null);
  const value = useMemo(() => ({User,setUser}), [User,setUser])

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/add_post" element={<NewPost />} />
          <Route exact path="/post/:id" element={<Item />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
