import React, { useState,useEffect } from "react";
import axios from "axios";


const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:4001/SuperAdmin/AdminRequest");
      if (res.data.success) {
        // console.log(res.data.data,"Abh");
        setAdmins(res.data.data);
        console.log(admins);

      }
    } catch (err) {
      console.error("Error fetching admin requests:", err);
    }
  };
  
  useEffect(() => {
    fetchAdmins(); // now it still works inside useEffect
  }, []);
  

  const handleApprove = async (pendingId) => {
    const superAdmin = JSON.parse(localStorage.getItem("SuperAdmin")) // Dynamically fetched
    console.log(superAdmin);
    console.log(pendingId);
    console.log(superAdmin.id);
    try {
      const res = await axios.post("http://localhost:4001/SuperAdmin/ApproveReq", {
        SuperAdmin_id: superAdmin.id,
        Pending_Request_id: pendingId,
      });
  
      alert(res.data.message);
      // Optionally refresh the list
      fetchAdmins(); 
    } catch (err) {
      console.error("Approval error:", err);
      alert("Failed to approve request");
    }
  };

  const handleReject = async (pendingId) => {
    try {
      const res = await axios.post("http://localhost:4001/SuperAdmin/DeleteReq", {
        Pending_Request_id: pendingId,
      });
  
      alert(res.data.message);
      // Refresh the admin list
      const refreshed = await axios.get("http://localhost:4001/SuperAdmin/AdminRequest");
      if (refreshed.data.success) {
        setAdmins(refreshed.data.data);
      }
    } catch (err) {
      console.error("Rejection error:", err);
      alert("Failed to reject request");
    }
  };
  
  

  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Admin</h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {admins.map((admin) => ( 
          <div
            
            className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md w-full sm:max-w-[1150px] mx-auto relative"
          >
            {/* Buttons on Top-Right */}
            <div className="absolute top-2 right-2 flex gap-2">
              {/* Approve Admin Button */}
              <button
              onClick={() => handleApprove(admin.id)}
                className="bg-black text-white font-medium px-3 py-1.5 rounded text-xs hover:bg-gray-900 border  shadow-sm transition"
              >
                Approve
              </button>

              {/* Remove Admin Button */}
              <button
              onClick={() => handleReject(admin.id)}
              className="bg-black text-white font-medium px-3 py-1.5 rounded text-xs hover:bg-black border shadow-sm transition"
            >
              Reject
            </button>

            </div>


            {/* Document Title and Date */}
            <div className="mb-3">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white truncate w-full sm:w-[1050px]">
                
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-white truncate w-full sm:w-[1050px] mt-1">
                <strong>Name:</strong>{admin.name}</p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-white truncate w-full sm:w-[1050px] mt-1">
                <strong>Email:</strong>{admin.email}</p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis mt-1">
                <strong>Gender:</strong> 
                {admin.gender}     </p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis mt-1">
                <strong>Dob:</strong> 
                {admin.dob?.split("T")[0]}          </p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis mt-1">
                <strong>Profession:</strong> 
                {admin.profession}</p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis mt-1">
                <strong>Orgnization:</strong> 
                {admin.organization}     </p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis mt-1">
                <strong>Phone No:</strong> 
                {admin.phone} </p>

            </div>

            
          </div>
          ))}
        
      </div>
    </div>
  
  );
};

export default ManageAdmin;
