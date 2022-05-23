const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const questionModel = new mongoose.model("question", questionSchema);

module.exports = questionModel;
