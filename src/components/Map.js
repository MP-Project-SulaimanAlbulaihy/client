import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  const [mark, setmark] = useState([]);
  const [zoom, setZoom] = useState(11);
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
      alert("Geolocation is not supported by this browser.");
    }
  }

  const doubleClick = (e) => {
    setscrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    switch (e.event.detail) {
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
  }, [mark]);

  return (
    <div className="real_map">
      {!isRefreshingMap && (
        <div style={{ height: "50vh", width: "100%"}}>
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
