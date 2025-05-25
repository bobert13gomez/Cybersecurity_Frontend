import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Outlet } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/" },
    { icon: <FiUser />, label: "Staff", path: "/staff" },
    { icon: <FiUser />, label: "Roles", path: "/staff" },
    // { icon: <FiUser />, label: "Profile", path: "/profile" },
  ];

  return (
    <motion.div
transition={{ duration: 0.1 }}
      animate={{ width: isOpen ? 250 : 64 }}
      className="h-screen bg-gray-900 text-white shadow-lg flex flex-col transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl text-nowrap font-bold ${!isOpen && "hidden"}`}>Elite CRM</h1>
        <button onClick={toggleSidebar} className="text-xl">
          <FiMenu />
        </button>
      </div>
      <div className="flex-1 space-y-2 px-2">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-center gap-4 cursor-pointer hover:text-red-400">
          <FiLogOut />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </motion.div>
  );
};

const Header = () => (
  <div className="w-full h-16 bg-white shadow px-6 flex items-center justify-between">
    <h2 className="text-xl font-semibold">Welcome</h2>
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40"
        className="rounded-full w-10 h-10"
        alt="user"
      />
    </div>
  </div>
);

const DashboardLayout = ({Children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {Children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
