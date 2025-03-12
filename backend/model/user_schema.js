import { Schema,model } from "mongoose";

const TaskSchema = new Schema({
   
    title : String,
    description: String,
    status: String,
    start:Date,
    end:Date,

})


const UserSchema = new Schema({
    name: { type: String, required: true },
        password: { type: String, required: true },
        tasks: [{type:Schema.Types.ObjectId, ref:"tasks"}]
})


const UserModel = model("users",UserSchema)
const TaskModel = model("tasks",TaskSchema)

export  {UserModel,TaskModel}