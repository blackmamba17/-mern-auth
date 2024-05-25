import mongoose, { mongo } from "mongoose";

//define a schema for the "table", like you are creating sql table with column etc
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//initialize the model
const User = mongoose.model(("User", userSchema));

export default User;
