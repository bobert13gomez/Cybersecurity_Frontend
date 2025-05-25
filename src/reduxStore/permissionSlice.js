import { createSlice } from "@reduxjs/toolkit";

const permissionSlice= createSlice({
    name:"permission",
    initialState:{
        data:[]
    },
    reducers:{
        setpermission:(state,action)=>{
            state.data=action.payload
        }
    }
})

export const {setpermission}=permissionSlice.actions

export default permissionSlice.reducer