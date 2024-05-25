import { log } from "console";
import express from "express";

//create backend

const app = express();

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
