import React from "react";
import { BiLock } from "react-icons/bi";

import { useNavigate } from "react-router-dom"; 

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <div className="flex justify-center mb-4">
          <BiLock className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">401 - Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
