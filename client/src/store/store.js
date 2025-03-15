import {configureStore} from "@reduxjs/toolkit"
import dashboardSlice from "../slices/dashboard-slice.js"
import LoginSlice from "../slices/login-slice.js"
import themeSlice from "../slices/theme-slice.js"

const store = configureStore({
    reducer:{
        auth:LoginSlice,
        tasks:dashboardSlice,
        theme:themeSlice
    }
   
})


export default store