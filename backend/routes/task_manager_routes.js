import express from "express";
import {
  Task_fetchall,
  Task_Create,
  Task_Update,
  Task_delete,
} from "../controller/task_controller.js";
import { TaskModel, UserModel } from "../model/user_schema.js";
import mongoose from "mongoose";
let TaskRouter = express.Router();

TaskRouter.post("/get", async (req, res) => {
  try {
    const {name} = req.body

    const resp = await UserModel.findOne({ name: "omveer" }).populate("tasks")
   
    
    console.log(resp);
    res.status(200).json({ data: resp});
  } catch (error) {
    res.status(500).json({
      error: true,
      Message: "internal server error",
    });
  }
});

TaskRouter.post("/create", async (req, res) => {
  try {
    const { title, description, start, end, _id } = req.body;


    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        error: true,
      });
    }

    const data = new TaskModel({
      title,
      description,
      start: start || new Date(),
      end:  new Date(end),
      status: "pending",
    });
    console.log(data)

    await data.save()

    if (!data) {
      return res.status(404).json({
        message: "failed to create Task not",
        error: true,
      });
    }

    user.tasks = [...user.tasks, data._id];
    await user.save();

    res.status(200).json({ message: "created", data });
  } catch (error) {
    res.status(500).json({
      error: true,
      Message: "internal server error",
    });
  }
});
TaskRouter.patch("/edit",async(req,res)=>{
    const {_id,...Data} = req.body
    const task = await TaskModel.findByIdAndUpdate(_id,{...Data})
    console.log(task)
    res.status(200).json({
        message:"Change applied to the task",
        error:false,
        data:task
    })
});
TaskRouter.delete("/delete", async (req,res)=>{
    const {_id,name} =req.body
    const user = await UserModel.findOne({name})
    if(!user){
        res.status(404).json({
            message:"user not found",
            error: true
        })
        return
    }
    user.tasks = user.tasks.filter((value)=> value !=  _id)
    await user.save()
    const task =  await TaskModel.findByIdAndDelete(_id)
   console.log(task)
   res.status(200).json({
    message:"Task deleted successfully",
    error:false
   })
});

export default TaskRouter;
