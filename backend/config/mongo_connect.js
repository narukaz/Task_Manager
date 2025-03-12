import mongoose from "mongoose";




export function connectToMongo(){
    return mongoose.connect("mongodb://localhost:27017/data").then((data)=>{
        console.log("Connected to mongo")
    }).catch(err=>{
        console.log("Error connecting mongo:",err?.message)
    })
}


 