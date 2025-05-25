import { configureStore } from "@reduxjs/toolkit";
import permissionSlice from "./permissionSlice";

const store=configureStore({
    reducer:{
        permission:permissionSlice
    }
})

export default store