import React from "react";
import UnauthorizedPage from "./Unauthorized";
import { Route } from "react-router-dom";
import DashboardLayout from "../components/Layout";

const ProtectedRoute=React.memo(({permission,route,loader})=>{
const userPermissions = permission?.permissions || [];
  const routePermission = userPermissions.find(
    (item) => item.permission_type === route.key
  );

  const hasPermission =
    routePermission?.can_view ||
    routePermission?.can_edit ||
    routePermission?.can_delete ||
    routePermission?.can_manage;

  if (!routePermission || !hasPermission) {
    return <UnauthorizedPage />;
  }
  if(!Object.keys(permission||{}).length==0){

      return  <DashboardLayout permission={permission} Children={route.Component} />
  }
    
})

export default ProtectedRoute