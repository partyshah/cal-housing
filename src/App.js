import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as housing from "./data/housing.json";


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.8715,
    longitude: -122.2730,
    width: "100vw",
    height: "100vh",
    zoom: 15
  });
  const [selectedUnit, setSelectedUnit] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedUnit(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {housing.features.map(unit => (
          <Marker
            latitude={unit.geometry.coordinates[1]}
            longitude={unit.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedUnit(unit);
              }}
            >
              <img src="/home.svg" alt="Home Icon" />
            </button>
          </Marker>
        ))}

        {selectedUnit ? (
          <Popup
            latitude={selectedUnit.geometry.coordinates[1]}
            longitude={selectedUnit.geometry.coordinates[0]}
            onClose={() => {
              setSelectedUnit(null);
            }}
          >
            <div>
              <h2>{selectedUnit.properties.ADDRESS}</h2>
              <p>Owner Name: {selectedUnit.properties.OWNER_NAME}</p>
              <p>Owner Contact: {selectedUnit.properties.CONTACT}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
