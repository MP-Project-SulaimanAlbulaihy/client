import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Navbar from "../Navbar";
import AlreadyBorrowed from "./AlreadyBorrowed";
import MyOffers from "./MyOffers";
import MyPosts from "./MyPosts";
import NeighborsRequests from "./NeighborsRequests";
import WaitingApproval from "./WaitingApproval";

const Dashboard = () => {
  const { User, setUser } = useContext(UserContext);
  const [edit_profile, setEdit_profile] = useState(false);
  const [err, setErr] = useState("");
  const [CurrentUser, setCurrentUser] = useState("");
  const noteRest = useRef(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  window.onclick = (e) => {
    if (e.target === noteRest.current) {
      setEdit_profile(false);
      //   getPost();
    }
  };

  const update_profile = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${BASE_URL}/update_user`,
        {
          id: User?.result?._id,
          currentMobile: User?.result?.mobile,
          username: e.target.username.value,
          mobile: e.target.mobile.value,
          password: e.target.password.value,
          location: e.target.location.value,
        },
        { headers: { Authorization: `Bearer ${User.token}` } }
      );
      if (result.data=='user info updated') {
        setEdit_profile(false);
        getUser();
      }
      if (result.data?.err) setErr(result.data.err);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/get_user`, { headers: { Authorization: `Bearer ${User.token}` } });
      if (result.data) {
          setCurrentUser(result.data)
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(User)getUser();
  }, [User]);

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="profile_content">
          {/* <p>
            *****
            <br />
            rating
          </p> */}
          <button onClick={() => setEdit_profile(true)}>Edit profile</button>
          <div className="profile">
            <img
              src="https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/479bb0d4-f442-4c61-8483-a4fc2abb1e88.png"
              alt="profile imag"
              width="200px"
              height="200px"
            />
            <p>Username: {CurrentUser?.username}</p>
            <p>Mobile Number {CurrentUser?.mobile}</p>
            <p>My location: {CurrentUser?.location}</p>
          </div>
        </div>
        <div className="dashboard_borrowed_items">
          <div className="borrowed">
            <p> طلبات من المستخدمين بانتظار قبولها منك</p>
            <NeighborsRequests />
          </div>
          <div className="borrowed">
            <p>المستعار حالياً</p>
            <AlreadyBorrowed />
          </div>
          <div className="borrowed">
            <p>بإنتظار موافقة صاحب السلعة</p>
            <WaitingApproval />
          </div>
          <div className="borrowed">
            <p>إعلاناتي</p>
            <MyPosts />
          </div>
          <div className="borrowed">
            <p>إعلانات تم تقديم المساعدة لها</p>
            <MyOffers />
          </div>
        </div>
      </div>

      {edit_profile ? (
        <>
          <form onSubmit={update_profile}>
            <div className="notePageRest" ref={noteRest}>
              <div className="edit">
                <div>
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" defaultValue={User?.result?.username} />
                  <br />
                  <label htmlFor="mobile">Mobile number</label>
                  <input type="text" name="mobile" defaultValue={User?.result?.mobile} />
                  <br />
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" placeholder="new password?" />
                  <br />
                  <label htmlFor="location">Location</label>
                  <input type="text" name="location" defaultValue={User?.result?.location} />
                  <button>Change Location</button>
                  <br />
                  {err ? <p>err</p> : <></>}
                  <button type="submit">Edit</button>
                  <button
                    onClick={() => {
                      setEdit_profile(false);
                      //   getPost();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
