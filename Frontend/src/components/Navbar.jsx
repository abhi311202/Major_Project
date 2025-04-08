import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
// import Logout from "./Logout";
// import Login from "./Login";
// import AdminLogin from "./AdminLogin";
import { useAuth1 } from "../context/AuthProvider1";
// import AdminLogout from "./AdminLogout";

import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";



// import "./Navbar1.css"

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const [authAdmin, setAuthAdmin] = useAuth1();


 
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  

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
  const handleClick = () => {
    navigate("/UserLogin"); // opens the new page
  };


  return (
    <>
      <div
        className={`bg-white text-black w-full max-w-none md:px-20 px-4 top-0 left-0 right-0 z-50  ${
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
              className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <div className="navbar-start">
            <a href="/" className="text-2xl font-bold cursor-pointer">
              Legal AI
            </a>
          </div>
          <div className="navbar-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems} {/* Now always visible */}
            </ul>
          </div>
          <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 text-black px-1 py-1 rounded-md whitespace-nowrap">Select Languages <ChevronDown size={16} /></DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Hindi</DropdownMenuItem>
            <DropdownMenuItem>Bengali</DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>


          <div className="navbar-end space-x-3">

            
            

              <div className="flex items-center justify-center space-x-2">
                {/* <a
                  className="border border-white text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-black duration-300 cursor-pointer"
                  onClick={() => {
                    document.getElementById("Login1").showModal();
                  }}
                >
                  User Login
                </a> */}
                <Button className="" onClick={handleClick}>User Login</Button>
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
           
          </div>
        </div>
        
      </div>
      <hr class="border-t border-gray-300 my-0"></hr>
    </>
  );
};

export default Navbar;