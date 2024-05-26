import { log } from "console";
import express from "express";

//database
import mongoose from "mongoose";

//env var
import dotenv from "dotenv";

//importing user routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

//bodyparser
import bodyParser from "body-parser";

dotenv.config();

//connect to the mongolodb
mongoose
  .connect(process.env.MONGO, {
    user: "gtorrisi",
    pass: "Angale1971",
    dbName: "test",
    w: "majority",
    retryWrites: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//create backend

const app = express();

//parser
app.use(express.json());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

//api/user path and from this i go to forward / userroutes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
