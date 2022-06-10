const express = require("express");
const router = express.Router();
const questionModel = require("../model/questionModel");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(express.json());

router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const question = new questionModel({
      question: req.body.question,
      options: req.body.options,
      answer: req.body.answer,
    });

    const postquestion = await question.save();
    res.status(200).json({ message: "QUESTION POST SUCCESSFUL" });
    console.log(postquestion);
  } catch (err) {
    res.status(422).json({ error: "SomeThing Went Wrong" });
  }
});
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const findcurrentQuestion = await questionModel.findByIdAndRemove({
      _id: id,
    });
    console.log(findcurrentQuestion);
    res.json({ message: "Delete Success" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const questions = await questionModel.find({});
  res.send(questions);
});



module.exports = router;
