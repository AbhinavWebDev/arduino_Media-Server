import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoutes.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoutes.js'
import MessageRoute from './Routes/MessageRoute.js'
import StoryRoute from './Routes/StoryRoutes.js'
import authMiddleWare from "./Middleware/authMiddleWare.js";
import CommentRoutes from "./Routes/CommentRoutes.js";

//Routes

const app = express();

//to serve images for public
app.use(express.static('public'))
app.use('/images',express.static("images"))

//Middleware


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
// app.use(cors({origin:'http://localhost:3000'}))

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  ).catch((error)=>console.log(error));

  //usage of routes

  app.use('/auth',AuthRoute)
  app.use('/user',authMiddleWare,UserRoute)
  app.use('/post',authMiddleWare,PostRoute)
  app.use('/story',authMiddleWare,StoryRoute)
  app.use('/comment',authMiddleWare,CommentRoutes)
  app.use('/upload',authMiddleWare,UploadRoute)
  app.use('/chat',ChatRoute)
  app.use('/messages',MessageRoute)
