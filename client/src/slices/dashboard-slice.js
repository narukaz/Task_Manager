import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
let initialState={
    tasks:{finished:[],todo:[],inProcess:[]},
    isLoading:false

}

export const addCard = createAsyncThunk("dashboard/create", async(parameter)=>{
    axios.defaults.withCredentials=true
    const token = localStorage.getItem("jwtToken");
    const {data} = await axios.post("https://task-manager-muta.onrender.com/task/create", {...parameter},{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
        }
      })
    return data
})

export const getAllCards = createAsyncThunk("dashboard/getAll", async()=>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.withCredentials=true
    const {data} = await axios.post("https://task-manager-muta.onrender.com/task/get",{},{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
        }
      })
    return data
})


export const updateCard = createAsyncThunk("dashboard/update", async(params)=>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.withCredentials=true
    const {data} = await axios.post("https://task-manager-muta.onrender.com/task/edit", params,{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
        }
      })
    return data
})

export const deleteCard = createAsyncThunk("dashboard/delete", async(cardId)=>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.withCredentials=true
    const {data} = await axios.delete("https://task-manager-muta.onrender.com/task/delete",{ data:{cardId}},{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
        }
      })
    return data
})



const dashboardReducer = createSlice({
    name:'dashboard',
    initialState,
    reducers:{},
    extraReducers:
        (builder)=>{
            builder.addCase(getAllCards.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getAllCards.fulfilled, (state,{payload})=>{
            
                state.tasks.todo = payload.data.todo
                state.tasks.inProcess = payload.data.inProcess
                state.tasks.finished = payload.data.finished
                state.isLoading=false
            })
            .addCase(getAllCards.rejected,(state)=>{
                state.isLoading = false
                state.tasks={finished:[],todo:[],inProcess:[]}
            })
            
        }
    
})


export default dashboardReducer.reducer