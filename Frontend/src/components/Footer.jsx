import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center">
      <div className="p-4 space-x-2">
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaFacebookF />
        </a>
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaTwitter />
        </a>
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaGoogle />
        </a>
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaInstagram />
        </a>
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaLinkedinIn />
        </a>
        <a href="#!" className="inline-block p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <FaGithub />
        </a>
      </div>

      <div className="text-center p-3 bg-gray-800 text-sm">
        © 2024 Copyright:{" "}
        <a className="text-white underline" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
