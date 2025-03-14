import {configureStore} from "@reduxjs/toolkit"
import dashboardSlice from "../slices/dashboard-slice.js"
import LoginSlice from "../slices/login-slice.js"

const store = configureStore({
    reducer:{
        auth:LoginSlice,
        tasks:dashboardSlice
    }
   
})


export default store