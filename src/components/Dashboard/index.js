import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Navbar from "../Navbar";
import AlreadyBorrowed from "./AlreadyBorrowed";
import MyOffers from "./MyOffers";
import MyPosts from "./MyPosts";
import NeighborsRequests from "./NeighborsRequests";
import WaitingApproval from "./WaitingApproval";

const Dashboard = () => {
  const { User, setUser } = useContext(UserContext);
  console.log(User);
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="profile_content">
          <p>
            *****
            <br />
            rating
          </p>
          <button>Edit profile</button>
          <div className="profile">
            <img
              src="https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/479bb0d4-f442-4c61-8483-a4fc2abb1e88.png"
              alt="profile imag"
              width="200px"
              height="200px"
            />
            <p>Username: Sulaiman</p>
            <p>Mobile Number 0353456546</p>
            <p>My location: Saudi Arabia - qassim - buraydah</p>
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
    </div>
  );
};

export default Dashboard;
