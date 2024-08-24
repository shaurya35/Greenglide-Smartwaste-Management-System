import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainComponent from "./pages/MainComponent";
import UserAuth from "./pages/UserAuth";
import EmployeeAuth from "./pages/EmployeeAuth";
import StaffAuth from "./pages/StaffAuth";
import StaffDashboard from "./pages/StaffDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/auth/user/login" element={<UserAuth />} />
          <Route path="/auth/employee/login" element={<EmployeeAuth />} />
          <Route path="/auth/staff/login" element={<StaffAuth />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
