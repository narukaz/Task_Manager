import express from "express";
import { connectToMongo } from "./config/mongo_connect.js";
import cookieParser from "cookie-parser";
import TaskRouter from "./routes/task_manager_routes.js";
import UserRoute from "./routes/user_route.js"
import cors from "cors"

let app = express();


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'cache-control', 'Expires'] 
}))


app.use(express.json());
app.use(cookieParser());

connectToMongo()
  .then((data) => {
    if (data) {
      console.log("Connected to mongo!");
    }
  })
  .catch((err) => console.log(err?.message));
app.use("/user",UserRoute)
app.use("/task",TaskRouter)



app.listen("8080", () => {
  console.log("server is live on 8080");
});
