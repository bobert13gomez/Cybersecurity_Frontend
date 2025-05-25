import React from "react";
import UnauthorizedPage from "./Unauthorized";
import { Route } from "react-router-dom";
import DashboardLayout from "../components/Layout";

const ProtectedRoute=React.memo(({permission,route})=>{

console.log("Hii")
    if(!route.layout){

        return <DashboardLayout />
    }
return  <DashboardLayout Children={route.Component} />
    
})

export default ProtectedRoute