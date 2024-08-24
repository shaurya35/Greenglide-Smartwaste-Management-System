const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeecode: { type: String, unique: true, required: true },
  contact:{ type:Number , unique:true , required: true}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
