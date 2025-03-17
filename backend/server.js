import express from "express";
import { connectToMongo } from "./config/mongo_connect.js";
import cookieParser from "cookie-parser";
import TaskRouter from "./routes/task_manager_routes.js";
import UserRoute from "./routes/user_route.js"
import cors from "cors"
import { authentication } from "./middleware/authMiddleware.js";


let app = express();

app.use(
  cors({
    origin: "https://task-manager-pi-plum.vercel.app", 
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization', 'Credential']


  })
);



app.use(express.json());
app.use(cookieParser());
// app.use(authentication)

connectToMongo()
  .then((data) => {
    if (data) {
      console.log("Connected to mongo!");
    }
  })
  .catch((err) => console.log(err?.message));
app.use("/user",UserRoute)
app.use("/task",authentication,TaskRouter)



app.listen("8080", () => {
  console.log("server is live on 8080");
});
