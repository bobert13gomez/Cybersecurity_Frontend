import axios from "axios";
import { toast } from "react-toastify";

const Interceptor=axios.create({
    baseURL:"http://localhost:4000/v1"
})

Interceptor.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem("Cy_token");
      
      config.headers.Authorization = `Bearer ${authToken}`;
      return config;
    },
    (error) => {
      console.error("Request Error Interceptor:", error);
      return Promise.reject(error);
    }
  );

  Interceptor.interceptors.response.use(
    (response) => {
      console.log( response.data,"axios")
      if(response.data.token){
        localStorage.setItem("Cy_token",response.data.token)
      }
      return response;
    },
    
    (error) => {
      console.log(error.status)
      if(error.status==401){
                localStorage.removeItem("Cy_token")

        toast.error("Your session has expired. Please log in again to continue.");
      const interval=  setTimeout(()=>{
        window.location.href="/"

        },1900)
        return ()=>clearInterval(interval)
  
      }
      console.log(error.response.data.message,"axios")
      return Promise.reject(error);
    }
  );

  export default Interceptor