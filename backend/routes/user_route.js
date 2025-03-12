import express from "express";
import {UserModel} from "../model/user_schema.js";
let UserRoute = express.Router();

UserRoute.post("/login", async (req, res) => {
    try {
  let { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({
      message: "Invalid data! Password is missing",
      error: true,
    });
    return
  }

    let response = await UserModel.findOne({ name });
    if (!response) {
      return res.status(404).json({
        succes: false,
        message: "user not found",
      });
    }




    if (response.password == password) {
        return res.status(200).json({
        message: "Successfully login",
        error: false,
        data:{name,tasks:response.tasks}
      });
      
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: true });
  }
});

UserRoute.post("/signup", async (req, res) => {
    try {
    console.log(req.body)
    let { name, password } = req.body;
    
    if (!name || !password) {
      res.status(400).json({
        message: "Invalid data! Password is missing",
        error: true,
      });
      return
    }
        let response = await UserModel.create({
        name,password,taskList:[]
       
        })
      console.log("response",response)
     
        res.status(200).json({
          message: "Successfully Created account",
          error: false,
        });
      
    } catch (error) {
      res.status(500).json({ message: "internal server error", error: true });
    }
  });

  export default UserRoute