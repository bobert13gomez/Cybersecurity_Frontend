import LoginPage from "../components/LoginPage";
import StaffManagementPage from "../Pages/Staffmanagement";

export const routes=[
    {
        routeLink:"/dashboard",
        key:"dashboard",
        title:"Dashboard",
        layout:true,
         Component:<LoginPage />
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