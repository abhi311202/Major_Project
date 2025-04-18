import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import AdminHome from "./Home/AdminHome";
import AdminSignUp from "./components/AdminSignUp";
import AdminLogin from "./components/AdminLogin";
import SuperAdminHome from "./Home/SuperAdminHome";

import SuperAdminLogin from "./components/SuperAdminLogin";

const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home2" element={<Home />} />
          <Route path="/:section" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Home2" element={<Home />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/SuperAdminHome" element={<SuperAdminHome />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/SuperAdminLogin" element={<SuperAdminLogin />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/AdminSignUp" element={<AdminSignUp />} />
          
        </Routes>

    </>
  );
};
export default App;
// this task 7
