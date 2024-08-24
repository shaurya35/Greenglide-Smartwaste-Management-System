const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffcode: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: Number, unique: true, required: true },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
