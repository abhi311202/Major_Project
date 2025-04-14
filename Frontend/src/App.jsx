import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import AdminLogin from "./components/AdminLogin";
import AdminSignUp from "./components/AdminSignUp";
import SuperAdminLogin from "./components/SuperAdminLogin";

import AdminHome from "./Home/AdminHome";


const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} /> {/* ✅ Add this line */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminSignUp" element={<AdminSignUp />} />
          <Route path="/SuperAdminLogin" element={<SuperAdminLogin />} />
          
        </Routes>

    </>
  );
};
export default App;
