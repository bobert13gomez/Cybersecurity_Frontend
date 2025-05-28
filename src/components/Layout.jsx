import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activityPostLogs } from "../utils/ActivityLogs";
import { setpermission } from "../reduxStore/permissionSlice";
import { toast } from "react-toastify";

const Sidebar = React.memo(({ isOpen, toggleSidebar,permission }) => {
  const location = useLocation();
  const nav=useNavigate()
//  const permission=useSelector((state)=>state?.permission?.data)
 const dispatch=useDispatch()
  const menuItems =useMemo(()=>[
    { icon: <FiHome />, label: "Dashboard", path: "/dashboard" ,key:"dashboard"},
    { icon: <FiUser />, label: "Staff", path: "/staff" ,key:"staff"},
   
  ].filter((item)=>{
    const findTheKey=permission?.permissions.find((list)=>list.permission_type==item.key)
     if(!Object.keys(findTheKey||{}).length) return false
     let hasAccess= findTheKey.can_edit||findTheKey.can_view||findTheKey.can_manage||findTheKey.can_delete
     return hasAccess
  }),[permission]) 


const handleLogout=async()=>{
  await activityPostLogs("LOGGED_OUT")
    toast.success("Logged out successfully")
     localStorage.removeItem("Cy_token")
      // dispatch(setpermission({}))
     nav("/")
    

 
 
}
  return (
    <div
      transition={{ duration: 0.1 }}
      style={{ width: isOpen ? 250 : 64 }}
      className="h-screen  bg-gray-900 text-white shadow-lg flex flex-col transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl text-nowrap font-bold ${!isOpen && "hidden"}`}>Activity CRM</h1>
        <button onClick={toggleSidebar} className="text-xl">
          <FiMenu />
        </button>
      </div>

      <div className="flex-1 space-y-2 px-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              to={item.path}
              key={idx}
              className={`flex items-center gap-4 p-3 rounded transition-all
                ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} cursor-pointer`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-700 mt-auto">
        <div  onClick={handleLogout} className="flex items-center justify-center gap-4 cursor-pointer hover:text-red-400">
          <FiLogOut />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
})

const Header = () => {
  const location = useLocation();
 return <div className="w-full h-16 bg-white shadow px-6 flex items-center justify-between">
    <h2 className="text-xl text-blue-600 font-bold uppercase">{location.pathname.replace("/","")}</h2>
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40"
        className="rounded-full w-10 h-10"
        alt="user"
      />
    </div>
  </div>
};

const DashboardLayout = React.memo(({permission,Children}) => {
  const [isOpen, setIsOpen] = useState(true);
//  const permission=useSelector((state)=>state?.permission?.data)

console.log(permission,"----")
 if(Object.keys(permission||{}).length==0)return null
  return (
    <div className="flex h-screen">
      <Sidebar permission={permission} isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {Children}
        </div>
      </div>
    </div>
  );
});

export default DashboardLayout;
