const MyProfileSection = () => {
    return (
      <div className="p-6 w-full">
        {/* Top Row Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-300 text-center p-4 font-semibold rounded shadow">REGISTRATION DATE</div>
          <div className="bg-green-300 text-black text-center p-4 font-semibold rounded shadow">DOC UPLOADED</div>
          <div className="bg-purple-400 text-center p-4 font-semibold rounded shadow">RATING</div>
        </div>
  
        {/* Profile Fields */}
        <div className="space-y-2 mb-6 pl-4 text-lg">
          <div><strong>NAME :</strong></div>
          <div><strong>EMAIL :</strong></div>
          <div><strong>USER ID :</strong></div>
          <div><strong>PHONE :</strong></div>
          <div><strong>ORGANISATION :</strong></div>
          <div><strong>PROFESSION :</strong></div>
          <div><strong>GENDER :</strong></div>
          <div><strong>DOB :</strong></div>
          <div><strong>AADHAAR ID :</strong></div>
        </div>
  
        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pl-4">
          <button className="bg-red-800 text-white px-4 py-2 rounded shadow">EDIT PASSWORD</button>
          <button className="bg-indigo-300 text-black px-4 py-2 rounded shadow">EDIT PROFILE</button>
          <button className="bg-green-700 text-white px-4 py-2 rounded shadow">REQUEST FOR SUPER ADMIN</button>
        </div>
      </div>
    );
  };
  
  export default MyProfileSection;
  