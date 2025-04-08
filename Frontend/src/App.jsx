import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Services } from "./components/Services";
import { HeroPage } from "./components/HeroPage";
import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel ";
import ReadMore from "./components/ReadMore";
import Footer from "./components/Footer";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";



const App = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/HeroPage" element={<HeroPage />} />
          <Route path="/HorizontalScrollCarousel " element={<HorizontalScrollCarousel />} />
          <Route path="/ReadMore " element={<ReadMore />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          
        </Routes>
    </>
  );
};
export default App;
