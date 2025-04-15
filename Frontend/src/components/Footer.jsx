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
    <footer className="bg-gray-500 text-white">
      {/* Social Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-4 md:mb-0">Connect with us:</h3>
        <div className="flex gap-4">
          {[FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub].map(
            (Icon, index) => (
              <a
                key={index}
                href="#!"
                className="p-3 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors duration-300 text-lg"
              >
                <Icon />
              </a>
            )
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm bg-gray-200">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://mdbootstrap.com/"
          className="underline hover:text-indigo-400 transition"
        >
          MDBootstrap.com
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
