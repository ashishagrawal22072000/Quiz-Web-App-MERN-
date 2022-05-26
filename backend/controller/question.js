const express = require("express");
const router = express.Router();
const questionModel = require("../model/questionModel");
const authentication = require("../middleware/authentication");
const studentModel = require("../model/StudentModel");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { SECRETKEY } = require("../config");
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
// router.get("/quizzdata", authentication, async (req, res) => {
//   try {
//     const studentStatus = await studentModel.findOne({
//       _id: req.studentID,
//       status: true,
//     });

//     if (studentStatus) {
//       res.json({ error: "You Have Already Complete Your Quizz" });
//     } else {
//       const questions = await questionModel.find({});
//       res.send(questions);
//       console.log("kbfkevekhce", req.studentID);
//     }

//     console.log("this is the current student" + studentStatus);
//   } catch (err) {
//     console.log(err);
//   }
// });


module.exports = router;
