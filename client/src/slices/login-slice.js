import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

let initialState={
    error:false,
    isAuthenticated:document.cookie.split('=')[1] ? true:false,
    user:"",
    message:""
}

export const GetUser = createAsyncThunk("user/getUser",async(parameter)=>{
  axios.defaults.withCredentials=true
  const {data} = await axios.get("https://85ab-3-110-204-158.ngrok-free.app/user/getUser",{
      headers: {
        "Content-Type": "application/json"
      }
    })
  return data

})

export const UserLogin = createAsyncThunk("user/login",async(parameter)=>{
    axios.defaults.withCredentials=true
    const {data} = await axios.post("https://85ab-3-110-204-158.ngrok-free.app/user/login", {...parameter},{
        headers: {
          "Content-Type": "application/json"
        }
      })
     
    return data
})

export const UserLogout = createAsyncThunk("user/logout",async()=>{
  axios.defaults.withCredentials=true
  const {data} = await axios.post("https://85ab-3-110-204-158.ngrok-free.app/user/logout", {
      headers: {
        "Content-Type": "application/json"
      }
    })
  return data

})

export const UserSignup = createAsyncThunk("user/signup", async(parameter)=>{
    axios.defaults.withCredentials=true
    const {data} = await axios.post("https://85ab-3-110-204-158.ngrok-free.app/user/signup", {...parameter})
    return data
})



let LoginSlice = createSlice({
  name:"authentication",
  initialState,
  reducers:{},
  extraReducers:
    (builder)=>{
        builder
        .addCase(UserLogin.pending, (state)=>{state.error = false })
        .addCase(UserLogin.fulfilled, (state,{payload})=>{
            state.error = payload.error
            state.message = payload.message
            state.user = payload?.data?.name||""
            state.isAuthenticated = payload.error
         })
         .addCase(UserLogin.rejected, (state)=>{
            state.data ={
                userName:"",
                isAuthenticated:false
            }
         })


         .addCase(GetUser.pending, (state)=>{state.error = false })
        .addCase(GetUser.fulfilled, (state,{payload})=>{
            state.error = payload.error
            state.message = payload.message
            state.user = payload.data.name
            state.isAuthenticated = payload.error
         })
         .addCase(GetUser.rejected, (state)=>{
            state.data ={
                userName:"",
                isAuthenticated:false
            }
         })

         .addCase(UserLogout.pending,(state)=>{
          state.isAuthenticated = false
          state.user = ""
          state.message=""
          state.error=false
         })
         
    }
  
})


export default LoginSlice.reducer
