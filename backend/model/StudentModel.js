const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  result : {
    type: String,
  },
  answer: {
    type: Array,
  },
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const studentModel = new mongoose.model("Studentdata", studentSchema);

module.exports = studentModel;
