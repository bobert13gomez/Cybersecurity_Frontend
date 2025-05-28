import axios from "axios";
import { activityPost } from "../servives/StaffServices"

export const activityPostLogs=async(data)=>{
    try{
    
    const ipAddress= await axios.get('https://api.ipify.org?format=json')

     const postactivity=await activityPost({action:data,ipAddress:ipAddress.data.ip})
    }catch(err){
        console.log(err)
    }
}