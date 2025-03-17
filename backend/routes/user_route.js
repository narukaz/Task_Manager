import express from "express";
import {UserModel} from "../model/user_schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { authentication } from "../middleware/authMiddleware.js";



let UserRoute = express.Router();

UserRoute.post("/logout", (req, res) => {
 
  res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: true, sameSite: "Strict" });

  return res.json({ message: "Logged out successfully" });
});


UserRoute.get("/getUser",authentication,async(req,res)=>{
  let {name} = req.user
  return res.status(200).json({
    message: "Successfully login",
    error: false,
    name})
})

UserRoute.post("/login", async (req, res) => {

  // console.log(req.body)
    try {
  let { userId, password } = req.body;


  

  if (!userId || !password) {
    return res.status(404).json({
      message: "Invalid data! UserId or Password is missing",
      error: true,
    });
   
  }
  
    let response = await UserModel.findOne({ userId });
    if (!response) {
      return res.status(404).json({
        error: true,
        message: "user not found",
      });
    }



    const hashPassword = await bcrypt.compare(password,response.password)
   
    if (hashPassword) {
      let token = jwt.sign({_id:response._id,name:response.name},"abcdefghijklmnopqrstuvwxys",{expiresIn:'1h'})
      res.cookie('token',token,{
        httpOnly: true,    
    secure: true,      // Ensures it's sent only over HTTPS
    sameSite: "None",  // Required for cross-origin requests (CORS)
    path: "/",
        secure:process.env.NODE_ENV === "production"

      })
        return res.status(200).json({
        message: "Successfully login",
        error: false,
        name:response.name,
        token
      });
      
    }

    

   


    return res.status(404).json({
      message:"invalid credentials",
      error:true,
      data:null
    })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: true });
  }
});

UserRoute.post("/signup", async (req, res) => {
    try {
   
    let { name,userId, password } = req.body;
    
    if (!name || !password) {
      res.status(200).json({
        message: "Invalid data! Password is missing",
        error: true,
      });
      return
    }
    const hashPassword = await bcrypt.hash(password,12)
  
    let user = await UserModel.findOne({userId})

    if(user !=null){
      return res.status(200).json({
        error:true,
        message:"account already exist",
      })
    }




        let response = await UserModel.create({
        name,password:hashPassword,userId,taskList:[]
       
        })
      
     
        res.status(200).json({
          message: "Successfully Created account",
          error: false,
        });
      
    } catch (error) {
      res.status(500).json({ message: "internal server error", error: true });
    }
  });

  export default UserRoute