import { log } from "console";
import express from "express";

//database
import mongoose from "mongoose";

//env var
import dotenv from "dotenv";

//importing user routes
import userRoutes from "./routes/user.route.js";

dotenv.config();

//connect to the mongolodb
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//create backend

const app = express();

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

//api/user path and from this i go to forward / userroutes
app.use("/api/user", userRoutes);
