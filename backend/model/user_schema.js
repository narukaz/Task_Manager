import { Schema,model } from "mongoose";

const TaskSchema = new Schema({
   
    title : String,
    description: String,
    status:{type:String, default:"todo"} ,
    tags:[],
    start:String,
    end:String,
})


const UserSchema = new Schema({
        name: { type: String, require: true },
        userId:{type:String, require:true},
        password: { type: String, require: true },
        tasks: [{type:Schema.Types.ObjectId, ref:"tasks"}]
})


const UserModel = model("users",UserSchema)
const TaskModel = model("tasks",TaskSchema)

export  {UserModel,TaskModel}