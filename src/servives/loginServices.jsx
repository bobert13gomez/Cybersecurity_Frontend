import Interceptor from "../Interceptor/axios"

export const loginAuth=async(data)=>{
    let datares=await Interceptor.post("/auth/login",data)
    return datares
}