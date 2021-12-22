import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GoogleMapReact from "google-map-react";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const [mark, setmark] = useState([]);

  const signup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/signup`, {
        username: e.target.username.value,
        mobile: e.target.mobile.value,
        password: e.target.password.value,
        location: e.target.location.value,
      });
      console.log(result.data);
      // if (result.data.err) {
      //   setErr(result.data.err);
      //   // localStorage.setItem("role", result.data.result.role.role);
      // } else if (result.data.success) {
      //   console.log("helllllo");
      //   localStorage.setItem("token", true);
      //   navigate("/posts");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setmark({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (err) => alert("Kindly allow location to get your position on the map or choose it manually")
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const doubleClick = (e) => {
    setscrollPosition(window.pageYOffset || document.documentElement.scrollTop)
    switch (e.event.detail) {
      case 1:
        console.log("click once");
        break;
      case 2:
        _onClick(e);
        break;
      case 3:
        _onClick(e);
        break;
    }
  };
  let aCircle;
  const Marker = () => <p style={{ fontSize: "25px" }}>📍</p>;
  const Circle = ({ map, maps }) => {
    aCircle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.4,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map,
      center: { lat: mark.lat, lng: mark.lng },
      radius: 27500,
    });
    return aCircle;
  };

  const _onClick = ({ lat, lng }) => {
    setmark({ lat, lng });
    if (aCircle) aCircle.setMap(null);
    refreshMap()
  };

  const [isRefreshingMap, setIsRefreshingMap] = useState(false);
  const refreshMap = async () => {
    setIsRefreshingMap(true);
    setTimeout(() => {
      setIsRefreshingMap(false);
    }, 100);
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    window.scrollTo(200, 200);
  }, [mark]);


const [zoom, setZoom] = useState(8)
const [scrollPosition, setscrollPosition] = useState(0) //could be not used later on

  return (
    <div>
      <Navbar />
      <div className="sign_form">
        <h1>Sign Up</h1>
        <form onSubmit={signup}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="mobile">Mobile number</label>
          <input type="text" name="mobile" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" />
          <button type="submit">Sign up</button>
        </form>

        {/* <p>{err}</p> */}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>

      {!isRefreshingMap && (
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            onClick={doubleClick}
            bootstrapURLKeys={{ key: "AIzaSyC84xwatWNrBJcYq8W1Kn723iYd3-_UpDY" }}
            defaultCenter={{ lat: mark.lat ? mark.lat : 22, lng: mark.lng ? mark.lng : 44 }}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onChange={(e)=>setZoom(e.zoom)}
            onGoogleApiLoaded={Circle}
          >
            <Marker lat={mark.lat} lng={mark.lng} />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default Register;
