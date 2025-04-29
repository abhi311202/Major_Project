// // import React from "react";

// // export const HeroPage = () => {
// //   return (
// //     <div className="bg-gradient-to-br from-[#c2e9fb] via-[#f9f7f7] to-[#e0c3fc] via-white to-purple-100 h-screen flex items-center justify-center px-8">
// //       <div className="max-w-4xl text-center">
// //         <h1 className="text-5xl font-bold text-gray-800 mb-6">
// //           Welcome to LegalAI
// //         </h1>
// //         <p className="text-lg text-gray-600 mb-8">
// //         Transform legal workflows with AI-driven solutions that automate
// //         the summarization and classification of legal documents,
// //         enhancing accuracy and efficiency.
// //         </p>
// //         <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300">
// //           Get Started
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function HeroPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6">
//       <div className="max-w-4xl text-center space-y-6">
//         <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm">
//           Welcome to <span className="text-purple-600">Legal AI</span>
//         </h1>
//         <p className="text-lg text-gray-600">
//           Transform legal workflows with AI-driven solutions that automate the
//           summarization and classification of legal documents, enhancing
//           accuracy and efficiency.
//         </p>
//         <div className="mt-6">
//           <button
//             onClick={() => navigate("/#services")}
//             className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
//           >
//             Explore Services
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { HeroPage };

// import React from "react";
// import { useNavigate } from "react-router-dom";

// function HeroPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-200 to-indigo-400 flex items-center justify-center px-6">
//       <div className="max-w-4xl text-center space-y-6">
//         <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm">
//           Welcome to <span className="text-purple-600">Legal AI</span>
//         </h1>

//         <p className="text-lg text-gray-600">
//           Transform legal workflows with AI-driven solutions that automate the
//           summarization and classification of legal documents, enhancing
//           accuracy and efficiency.
//         </p>

//         <div className="mt-6">
//           <button
//             onClick={() => navigate("/#services")}
//             className="px-6 py-3 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-[#a78bfa] text-white font-semibold shadow-lg hover:opacity-90 transition duration-300"
//           >
//             Explore Services
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { HeroPage };

import React from "react";
import { useNavigate } from "react-router-dom";
// import "..context/DarkModeContext.jsx"; // Import the DarkModeContext if needed
// import { motion } from "framer-motion"; // Import motion for animations

function HeroPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-400 via-purple-300 to-orange-400 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray  -800 drop-shadow-sm">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#FF00CC] via-[#333399] to-[#ff084a] bg-clip-text text-transparent animate-text-gradient">
            Legal AI
          </span>
        </h1>

        <p className="text-lg text-gray-600">
          Transform legal workflows with AI-driven solutions that automate the
          summarization and classification of legal documents, enhancing
          accuracy and efficiency.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/#services")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF00CC] via-[#333399] to-[#00FFFF] text-white font-bold shadow-xl hover:brightness-110 transform hover:scale-105 transition-all  ease-in-out animate-pulse"
          >
            ✨ Explore Services
          </button>
        </div>
      </div>
    </div>
  );
}

export { HeroPage };
