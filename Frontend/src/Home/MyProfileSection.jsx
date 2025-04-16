import React, { useEffect, useState} from "react";

const MyProfileSection = () => {

  const [profileData, setProfileData] = useState({});
  
    const storedObjectString = localStorage.getItem("Admin");
    const myObject = JSON.parse(storedObjectString);
    console.log(myObject);
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
        // docUploaded: myObject.docUploaded,
      //   docUploaded: res.data.docs.length,
      //   registeredDate: myObject.registeredDate,
      });
    }, []);
    return (
      <div className="p-6 w-full">
        {/* Top Row Cards */}
  <div className="grid grid-cols-3 gap-4 mb-8">
  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white"> {profileData.created_at?.split("T")[0]} </div>
    <div className="text-sm text-white mt-1">Registration Date</div>
    
  </div>

  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white">15</div>
    <div className="text-sm text-white mt-1">Doc Uploaded</div>
    
  </div>

  <div className="bg-black p-4 rounded-xl shadow text-center">
  <div className="text-xl font-bold text-white">5</div>
  <div className="text-sm text-white mt-1">Rating</div>
    
  </div>

  

</div>
  
        {/* Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm sm:text-base">
  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Name</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.name}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Email</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.email}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Username</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.username}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Gender</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.gender}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">DOB</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.dob?.split("T")[0]}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Aadhaar ID</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.aadhaar}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Profession</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.profession}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Organization</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.organisation}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <p className="text-gray-500 mb-1">Phone</p>
    <p className="font-semibold text-gray-800 dark:text-white">{profileData.phone}</p>
  </div>
</div>

  
        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pl-4">
        <button className="bg-black  text-white font-medium px-5 py-2 rounded-lg shadow-md hover:brightness-110 transition-all duration-200">
          Change Password
        </button>
        
        <button className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md hover:brightness-110 transition-all duration-200">
          Edit Profile
        </button>
        <button className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md hover:brightness-110 transition-all duration-200">
          Request For SuperAdmin
        </button>
        </div>
      </div>
    );
  };
  
  export default MyProfileSection;
  