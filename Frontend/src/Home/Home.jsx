import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Banner from "../components/Banner";
// import Freebook from "../components/Freebook";
// import Footer from "../components/Footer";
// import Content1 from "./Content1";
// import Hero from "./Hero";
// import About from "./About";
// import Download from "./Download";
// import Service from "./Service";
// import Login from "../components/Login";
// import AdminLogin from "../components/AdminLogin";
import { useAuth } from "../context/AuthProvider";

function Home() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section]);

  // Prevent Back Button Navigation
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(1); // Prevent going back
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <div className="w-full overflow-x-hidden  ">
      <Navbar />
    </div>
  );
}

export default Home;
