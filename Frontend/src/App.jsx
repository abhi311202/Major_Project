import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminHome from "./Home/AdminHome";

const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
    </>
  );
};
export default App;
