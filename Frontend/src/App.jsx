import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";


const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} /> {/* ✅ Add this line */}
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          
        </Routes>

    </>
  );
};
export default App;
