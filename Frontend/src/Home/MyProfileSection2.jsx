import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

const MyProfileSection2 = () => {
  const [profileData, setProfileData] = useState({});

  const storedObjectString = localStorage.getItem("SuperAdmin");
  const myObject = JSON.parse(storedObjectString);

  useEffect(() => {
    setProfileData({
      name: myObject.name,
      username: myObject.username,
      email: myObject.email,
      phone: myObject.phone,
      dob: myObject.dob,
      gender: myObject.gender,
      aadhaar: myObject.aadhar,
      profession: myObject.profession,
      organisation: myObject.organization,
      created_at: myObject.created_at,
      profileImage: myObject.image || "https://via.placeholder.com/150",
    });
  }, []);

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

  return (
    <div className="p-6 w-full">
      {/* Top Summary Cards Row */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">
            {profileData.created_at?.split("T")[0]}
          </div>
          <div className="text-sm text-black mt-1">Registration Date</div>
        </div>

        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">15</div>
          <div className="text-sm text-black mt-1">Total Admin</div>
        </div>

        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">120</div>
          <div className="text-sm text-black mt-1">Total Users</div>
        </div>

        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="flex justify-center items-center gap-2 text-xl font-bold text-black">
            Threshold Value
            <Pencil size={18} />
          </div>
        </div>

        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">3</div>
          <div className="text-sm text-black mt-1 text-center">
            Incoming Requests <br /> for Super Admin
          </div>
        </div>
      </div>

      {/* Profile Picture and Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Left Column for Image and Name - Centered & Slightly Lower */}
        <div className="flex flex-col items-center justify-center sm:justify-start sm:self-center mt-4">
          <div className="relative group w-32 h-32 sm:w-36 sm:h-36">
            <div className="absolute inset-0 rounded-full z-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white group-hover:border-transparent transition duration-300 z-10">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-4 text-lg font-bold text-center">
            {profileData.name}
          </div>
        </div>

        {/* Right Side Details */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          {[
            { label: "Email", value: profileData.email },
            { label: "Username", value: profileData.username },
            { label: "Gender", value: profileData.gender },
            { label: "DOB", value: profileData.dob?.split("T")[0] },
            { label: "Aadhaar ID", value: profileData.aadhaar },
            { label: "Organization", value: profileData.organisation },
            { label: "Profession", value: profileData.profession },
            { label: "Phone", value: profileData.phone },
          ].map(({ label, value }, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 transition"
            >
              <p className="text-gray-500 mb-1">{label}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-start mt-4">
        {["Change Password", "Edit Profile"].map((btn, i) => (
          <button
            key={i}
            className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-600"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyProfileSection2;
