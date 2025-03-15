import mongoose from "mongoose";




export function connectToMongo(){
    return mongoose.connect("mongodb+srv://test:abcd@paper.17km0ug.mongodb.net/?retryWrites=true&w=majority&appName=paper").then((data)=>{
        console.log("Connected to mongo")
    }).catch(err=>{
        console.log("Error connecting mongo:",err?.message)
    })
}


 