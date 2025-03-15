import mongoose from "mongoose";




export function connectToMongo(){
    return mongoose.connect("mongodb+srv://naruka:abcd@cluster0.q0lqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((data)=>{
        console.log("Connected to mongo")
    }).catch(err=>{
        console.log("Error connecting mongo:",err?.message)
    })
}


 