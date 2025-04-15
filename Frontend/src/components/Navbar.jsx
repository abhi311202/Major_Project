import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
// import Login from "./Login";
// import AdminLogin from "./AdminLogin";
import { useAuth1 } from "../context/AuthProvider1";
import { useAuth2 } from "../context/AuthProvider2";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import SuperAdminLogout from "./SuperAdminLogout"; // Assuming you have a SuperAdminLogout component

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const [authAdmin, setAuthAdmin] = useAuth1();
  const [authAdmin2, setAuthAdmin2] = useAuth2(); // This handles the Super Admin state

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
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems} {/* Now always visible */}
            </ul>
          </div>
          <div className="hidden lg:flex items-center gap-4 ml-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 text-black px-1 py-1 rounded-md whitespace-nowrap">
              Select Languages <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>Bengali</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>

          <div className="navbar-end space-x-3">
            {authUser || authAdmin ? (
              <Logout /> // Show Logout for both user or admin
            ) : authAdmin2 ? (
              <div className="flex items-center justify-center space-x-2">
                <Button onClick={() => navigate("/SuperAdminHome")}>Dashboard</Button> {/* Show Dashboard */}
                <SuperAdminLogout /> {/* Show Super Admin Logout */}
                
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Button onClick={() => navigate("/UserLogin")}>User Login</Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Admin Login</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate("/AdminLogin")}>
                      Admin Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/SuperAdminLogin")}>
                      Super Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-0"></hr>
    </>
  );
};

export default Navbar;
