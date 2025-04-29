import React, { useEffect, useState} from "react";
import { Pencil } from "lucide-react"; // Optional, for the pencil icon
import axios from "axios";


const MyProfileSection2 = () => {
  const superAdminId = 1;
  const [profileData, setProfileData] = useState({});
  const [thresholdValue, setThresholdValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expectedValue, setExpectedValue] = useState(null);

  const predefinedOptions = ["10", "20", "30", "50", "100"];

  const storedObjectString = localStorage.getItem("SuperAdmin");
  const myObject = JSON.parse(storedObjectString);
  console.log(myObject);

  const handleSetThreshold = async () => {
    const valueToSend = customValue !== "" ? customValue : thresholdValue;

    if (!valueToSend) {
      alert("Please select or enter a threshold value.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/SuperAdmin/set-threshhold1", {
        threshold_id:  localStorage.getItem("Threshold_Id"), // Optional or use `null` if inserting new
        threshold_value: valueToSend,
        super_admin_id: superAdminId,
      });

      console.log(response.data);
      alert("Threshold set successfully!");
    } catch (error) {
      console.error("Error setting threshold:", error);
      alert("Failed to set threshold");
    }
  };
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
  const closeModal = () => {
    setShowModal(false); // Close modal when clicked outside or on close button
  };
  useEffect(() => {
    const fetchExpectedValue = async () => {
      try {
        const response = await axios.get("http://localhost:4001/SuperAdmin/get-threshhold1");
        const expectedValue = response.data.data.threshold_value;
        localStorage.setItem("Threshold_Id", response.data.data.threshold_id);
        console.log("Fetched Expected Value:", expectedValue);
        setExpectedValue(expectedValue);
      } catch (error) {
        console.error("Error fetching expected value:", error);
      }
    };
  
    fetchExpectedValue();
  }, []);
  return (
    <div className="p-6 w-full">
      {/* Top Row Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white"> {profileData.created_at?.split("T")[0]} </div>
    <div className="text-sm text-white mt-1">Registration Date</div>
    
  </div>

  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white">15</div>
    <div className="text-sm text-white mt-1">Total Admin</div>
    
  </div>

  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white">120</div>
    <div className="text-sm text-white mt-1">Total Users</div>
    
  </div>

  <div className="bg-black p-4 rounded-xl shadow text-center text-white">
        <div className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
          Threshold <Pencil size={18} onClick={() => setShowModal(true)} />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[280px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Set Threshold</h2>
              <button onClick={closeModal} className="text-gray-600 font-bold">
                &times;
              </button>
            </div>

            {/* Dropdown options */}
            <select
              className="text-black p-3 rounded-lg border-2 border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-black w-[230px]"
              onChange={(e) => setThresholdValue(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select a threshold</option>
              {predefinedOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="text-sm mb-2">or enter a custom value</div>

            {/* Custom input */}
            <input
              type="number"
              placeholder="Custom value"
              className="text-black p-1 rounded-lg border-2 border-gray-300 w-[230px] mb-6 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setCustomValue(e.target.value)}
            />

            {/* Submit button */}
            <button
              onClick={handleSetThreshold}
              className="w-[230px] bg-black text-white font-semibold p-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
            >
              Set Threshold
            </button>
          </div>
        </div>
      )}

  <div className="bg-black p-4 rounded-xl shadow text-center">
    <div className="text-xl font-bold text-white">3</div>
    <div className="text-sm text-white mt-1">
      Incoming Requests <br /> for Super Admin
    </div>
    
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
      </div>

    </div>
  );
};

export default MyProfileSection2;
