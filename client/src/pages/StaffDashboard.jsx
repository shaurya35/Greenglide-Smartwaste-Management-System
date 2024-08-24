import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/StaffDashboard.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib21kZXNobXVraCIsImEiOiJjbHlpMmRveHYwOW9tMmtxc2xjamJ2YjR2In0.uzYZfEDTKFbrA1NE3RmuLQ";

const StaffDashboard = () => {
  const mapContainer = useRef(null);
  const [dustbins, setDustbins] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [totalDustbins, setTotalDustbins] = useState(0);

  useEffect(() => {
    const fetchDustbins = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/staff/1234/dashboard/map"
        );
        const data = await response.json();
        setDustbins(data);
      } catch (error) {
        console.error("Error fetching dustbin data:", error);
      }
    };

    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/staff/1234/dashboard/"
        );
        const data = await response.json();
        setEmployeeInfo(data);
        
        // Calculate the total dustbins
        const totalDustbinCount = data.reduce((acc, [, dustbinCount]) => acc + dustbinCount, 0);
        setTotalDustbins(totalDustbinCount);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    fetchDustbins();
    fetchEmployeeInfo();
  }, []);

  useEffect(() => {
    if (dustbins.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [85.4399, 23.4123],
      zoom: 13,
    });

    dustbins.forEach((dustbin) => {
      const markerEl = document.createElement("div");
      markerEl.className = "marker";
      markerEl.style.backgroundColor = dustbin.color || "red";
      new mapboxgl.Marker(markerEl)
        .setLngLat(dustbin.location.coordinates)
        .addTo(map);
    });

    return () => map.remove();
  }, [dustbins]);

  return (
    <>
      <main className="d_main">
        <div
          ref={mapContainer}
          style={{
            width: "30%",
            height: "600px",
            border: "5px solid var(--green)",
            padding: "20rem",
            borderRadius: "2rem",
          }}
          className="map"
        />
        <div className="map_data">
          <div className="data_total sora">Total Dustbins Collected: {totalDustbins}/9</div>
          <div className="data_sub sora">
            Employee Info:
            <ul>
              {employeeInfo.map(([workerId, dustbinCount]) => (
                <li key={workerId} className="sora sub_cat">
                  Employee: {workerId}, Dustbin Count: <b>{dustbinCount}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default StaffDashboard;
