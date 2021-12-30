import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  const [mark, setmark] = useState([]);
  let [uerLocation, setUerLocation] = useState([]);
  const [zoom, setZoom] = useState(8);
  const [scrollPosition, setscrollPosition] = useState(0); //could be not used later on

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setmark({ lat: position.coords.latitude, lng: position.coords.longitude });
          refreshMap();
        },
        (err) => alert("Kindly allow location to get your position on the map or choose it manually")
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const doubleClick = (e) => {
    setscrollPosition(window.pageYOffset || document.documentElement.scrollTop);
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
  const Marker = () => (
    <div className="marker">
      <p>📍</p>
    </div>
  );
  const Circle = ({ map, maps }) => {
    aCircle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.4,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map,
      center: { lat: mark.lat, lng: mark.lng },
      radius: 500,
    });
    return aCircle;
  };

  const _onClick = ({ lat, lng }) => {
    setmark({ lat, lng });
    if (aCircle) aCircle.setMap(null);
    refreshMap();
  };

  const [isRefreshingMap, setIsRefreshingMap] = useState(false);
  const refreshMap = async () => {
    setIsRefreshingMap(true);
    setTimeout(() => {
      setIsRefreshingMap(false);
    }, 1);
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    props.mark(mark);
    window.scrollTo(0, scrollPosition);
    setUerLocation({
      latMax: mark.lat + 0.0006,
      latMin: mark.lat - 0.0006,
      lngMax: mark.lng + 0.0006,
      lngMin: mark.lng - 0.0006,
    });
  }, [mark]);

  return (
    <div>
      {!isRefreshingMap && (
        <div style={{ height: "50vh", width: "40%", margin: "0 auto" }}>
          <GoogleMapReact
            onClick={doubleClick}
            bootstrapURLKeys={{ key: "AIzaSyC84xwatWNrBJcYq8W1Kn723iYd3-_UpDY" }}
            defaultCenter={{ lat: mark.lat ? mark.lat : 22, lng: mark.lng ? mark.lng : 44 }}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onChange={(e) => setZoom(e.zoom)}
            onGoogleApiLoaded={Circle}
          >
            <Marker lat={mark.lat} lng={mark.lng} />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default Map;
