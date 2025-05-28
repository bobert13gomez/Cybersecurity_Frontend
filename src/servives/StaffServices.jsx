import Interceptor from "../Interceptor/axios"

export const addUser=async(data)=>{
    let datares=await Interceptor.post("/user",data)
    return datares
}
export const getUser=async(page,limit)=>{
    let datares=await Interceptor.get(`/user?page=${page}&limit=${limit}`)
    return datares
}
export const updatedUser=async(data,id)=>{
    let datares=await Interceptor.put(`/user?id=${id}`,data)
    return datares
}
export const deleteUser=async(id,active)=>{
    let datares=await Interceptor.delete(`/user?id=${id}&active=${active}`)
    return datares
}
export const permissionGet=async()=>{
    let datares=await Interceptor.get(`/user/individualPermission`)
    return datares
}
export const activityPost=async(data)=>{
    let datares=await Interceptor.post(`/user/activity`,data)
    return datares
}
export const activityGet=async(data)=>{
    let datares=await Interceptor.get(`/user/activity?userId=${data}`)
    return datares
}
export const allUserGet=async()=>{
    let datares=await Interceptor.get(`/user/get`)
    return datares
}