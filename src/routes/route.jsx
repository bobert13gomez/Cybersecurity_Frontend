import LoginPage from "../components/LoginPage";
import UserActivityDashboard from "../Pages/Dashboard";
import StaffPage from "../Pages/Staffmanagement";
import StaffManagementPage from "../Pages/Staffmanagement";

export const routes=[
    {
        routeLink:"/dashboard",
        key:"dashboard",
        title:"Dashboard",
        layout:true,
         Component:<UserActivityDashboard />
    },
    {
        routeLink:"/staff",
        key:"staff",
        title:"Staff",
        layout:true,
         Component:<StaffManagementPage />
    },
    {
        routeLink:"/",
        key:"login",
        title:"User",
        layout:false,
        Component:<LoginPage />
    }
]