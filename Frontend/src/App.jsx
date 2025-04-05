import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SuperAdminHome from "./Home/SuperAdminHome";


const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SuperAdminHome" element={<SuperAdminHome />} />
        </Routes>
    </>
  );
};
export default App;


