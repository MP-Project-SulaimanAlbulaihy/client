import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Footer from "../Footer";
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
      if (result.data == "user info updated") {
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
        setCurrentUser(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (User) getUser();
  }, [User]);

  return (
    <div>
      <div className="dashboard">
        <div className="profile_content">
          {/* <p>
            *****
            <br />
            rating
          </p> */}
          <div className="profile">
            <img
              src="https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Image-Transparent-Background.png"
              alt="profile imag"
              width="200px"
              height="200px"
            />
            <p>{CurrentUser?.username}</p>
          </div>
          <div className="profile_info" dir="rtl">
            <div>
              <p>
                <b>اسم الحساب</b>
              </p>
              <p>{CurrentUser?.username}</p>
            </div>
            <hr />
            <div>
              <p>
                <b>رقم الجوال</b>
              </p>
              <p>{CurrentUser?.mobile}</p>
            </div>
            <hr />
            <div>
              <p>
                <b>موقع البيت</b>
              </p>
              <p>{CurrentUser?.location}</p>
            </div>

            <button onClick={() => setEdit_profile(true)}>تعديل على بيانات الحساب</button>
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
        <div>
          <form onSubmit={update_profile} dir="rtl">
            <div className="notePageRest" ref={noteRest}>
              <div className="edit edit_form">
                <div>
                  <label htmlFor="username">الاسم الشخصي</label>
                  <input type="text" name="username" defaultValue={User?.result?.username} />
                  <br />
                  <label htmlFor="mobile">رقم الجوال</label>
                  <input type="text" name="mobile" defaultValue={User?.result?.mobile} />
                  <br />
                  <label htmlFor="password">الرقم السري</label>
                  <input type="password" name="password" placeholder="رقم سري جديد؟" />
                  <br />
                  <label htmlFor="location">الموقع الجغرافي</label>
                  <input type="text" name="location" defaultValue={User?.result?.location} />
                  <button type="button">تغيير الموقع</button>
                  {err ? <p>err</p> : <></>}
                  <div id="iii">
                    <button  id="back_note_page"
                      onClick={() => {
                        setEdit_profile(false);
                      }}
                    >
                      الغاء
                    </button>
                    <button type="submit">حفظ التعديلات</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
