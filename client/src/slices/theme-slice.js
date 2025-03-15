import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    day:true
}


const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme:(state)=>{
            state.day = !state.day
        }
    }
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer