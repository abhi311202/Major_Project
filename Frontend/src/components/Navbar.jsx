import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
// import Logout from "./Logout";
// import Login from "./Login";
// import AdminLogin from "./AdminLogin";
import { useAuth1 } from "../context/AuthProvider1";
// import AdminLogout from "./AdminLogout";

import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
// import "./Navbar1.css"

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const [authAdmin, setAuthAdmin] = useAuth1();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="about">Search</a>
      </li>
      <li>
        <a href="services">Services</a>
      </li>
      <li>
        <a href="team">Team</a>
      </li>
      <li>
        <a href="About">About</a>
      </li>
    </>
  );

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`bg-black text-white w-full max-w-none md:px-20 px-4 top-0 left-0 right-0 z-50  ${
          sticky
            ? "sticky-navbar shadow-md bg-black text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar">
          {/* Dropdown for Mobile Navigation */}

          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-black dark:text-white"
            >
              {navItems}
            </ul>
          </div>
          <div className="navbar-start">
            <a href="/" className="text-2xl font-bold cursor-pointer">
              Legal AI
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems} {/* Now always visible */}
            </ul>
          </div>

          <div className="navbar-end space-x-3">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* moon icon */}
              <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>

              {/* sun icon */}
              <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>

            {authUser || authAdmin ? (
              // <Logout />
              authUser ? (
                <>
                  {(
                    location.pathname === "/UserHome" ||
                  location.pathname ==="/Home" || location.pathname ==="/" ||location.pathname ==="/about" ||location.pathname ==="/services" ||location.pathname ==="/team" ||location.pathname ==="/About") && (
                    <a
                      className="inline-block max-w-[100px] border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer
"
                      onClick={() => {
                        // document.getElementById("My_Profile").showModal();
                        navigate("/userdashboard");
                      }}
                    >
                     User Panel
                    </a>
                  )}
                  {location.pathname === "/adminHome" && (
                    <Link
                      className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                      to="/Home"
                    >
                      Home
                    </Link>
                  )}
                  {location.pathname === "/userdashboard" && (
                    <Link
                      className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                      to="/Home"
                    >
                      Home
                    </Link>
                  )}
                  <Logout />
                </>
              ) : authAdmin ? (
                <>
                  {location.pathname !== "/adminHome" && (
                    <Link
                      className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                      to="/adminHome"
                    >
                      Admin Panel
                    </Link>
                  )}
                  {location.pathname === "/adminHome" && (
                    <Link
                      className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                      to="/Home"
                    >
                      Home
                    </Link>
                  )}
                  <AdminLogout />
                </>
              ) : null
            ) : (
              <div className="flex items-center justify-center space-x-2">
                {/* <a
                  className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                  onClick={() => {
                    document.getElementById("Login1").showModal();
                  }}
                >
                  User Login
                </a> */}
                <Button className="">User Login</Button>
                {/* <a
                  className="bg-red-500 border border-red-500 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
                  onClick={() => {
                    document.getElementById("Login2").showModal();
                  }}
                >
                  Admin Login
                </a> */}

                <Button className="">Admin Login</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;