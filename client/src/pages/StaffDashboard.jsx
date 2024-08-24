//mapbox jsx
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib21kZXNobXVraCIsImEiOiJjbHlpMmRveHYwOW9tMmtxc2xjamJ2YjR2In0.uzYZfEDTKFbrA1NE3RmuLQ";

const StaffDashboard = ({ dustbins }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [85.4399, 23.4123], 
      zoom: 13,
    });

    dustbins.forEach((dustbin) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = dustbin.color || "red";
      el.textContent = dustbin.dustbinId;

      new mapboxgl.Marker(el)
        .setLngLat(dustbin.location.coordinates)
        .setPopup(new mapboxgl.Popup().setText(dustbin.dustbinId))
        .addTo(map);
    });
  }, [dustbins]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default StaffDashboard;
