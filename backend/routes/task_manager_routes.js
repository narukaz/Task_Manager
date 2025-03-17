import express from "express";
import {
  Task_fetchall,
  Task_Create,
  Task_Update,
  Task_delete,
} from "../controller/task_controller.js";
import { TaskModel, UserModel } from "../model/user_schema.js";

let TaskRouter = express.Router();

TaskRouter.post("/get", async (req, res) => {
  try {
    const {_id} = req.user

    const {tasks} = await UserModel.findById(_id).populate("tasks")

    const todo = []
    const finished=[]
    const inProcess=[]
    for(let i=tasks.length-1; i>=0; i--){
      if(tasks[i].status == "todo"){
        todo.push(tasks[i])
      }else if(tasks[i].status == "finished"){
        finished.push(tasks[i])
      }else{
        inProcess.push(tasks[i])
      }
    }
   
    
    
    res.status(200).json({ data:{todo,inProcess,finished}});
  } catch (error) {
    res.status(500).json({
      error: true,
      Message: "internal server error",
    });
  }
});

TaskRouter.post("/create", async (req, res) => {
  try {
    const { title, description, start, end,tags } = req.body;
    const {_id} = req.user

    // console.log(tags)
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
      tags,
      start: start || new Date().toISOString().split("T")[0] ,
      end:  end || new Date().toISOString().split("T")[0],
      status: "todo",
    });
    

    await data.save()
    tags.forEach(async element =>  {
      const user = await UserModel.findOne({userId:element})
      if(!user) return
      user.tasks.push(data._id)
      await user.save()
    });

    if (!data) {
      return res.status(404).json({
        message: "failed to create Task not",
        error: true,
      });
    }

    user.tasks = [...user.tasks, data._id];
    await user.save();

    res.status(200).json({ message: "created", data,error:false });
  } catch (error) {
    res.status(500).json({
      error: true,
      Message: "internal server error",
    });
  }
});
TaskRouter.post("/edit",async(req,res)=>{
    const {_id,...Data} = req.body
    if(Data.start ==  ""){
      Data.start = new Date().toISOString().split("T")[0]
    }
    if(Data.end == ""){
      Data.end = new Date().toISOString().split("T")[0]
    }
   
    let task = await TaskModel.findByIdAndUpdate(_id,Data,{new:true})
    // console.log(task)
    res.status(200).json({
        message:"Change applied to the task",
        error:false,
        data:task
    })
});
TaskRouter.delete("/delete", async (req,res)=>{
    const {cardId} =req.body
    const {_id} = req.user
    const user = await UserModel.findById(_id)
    if(!user){
        res.status(404).json({
            message:"user not found",
            error: true
        })
        return
    }
    user.tasks = user.tasks.filter((value)=> value !=  cardId)
    await user.save()
    const task =  await TaskModel.findByIdAndDelete(cardId)

    if (!task){
      return res.status(200).json({
        message:"task failed",
        error:true
      })
    }
   res.status(200).json({
    message:"Task deleted successfully",
    error:false
   })
});

export default TaskRouter;
