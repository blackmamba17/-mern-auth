import { log } from "console";
import express from "express";

//database
import mongoose from "mongoose";

//env var
import dotenv from "dotenv";
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
