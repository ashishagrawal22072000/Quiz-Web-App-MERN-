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

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtt;
    console.log("helllo from authenticationNNNNNNNN", token);
    const verifyToken = jwt.verify(token, SECRETKEY);

    const rootStudent = await studentModel.findOne({
      _id: verifyToken._id,
    });

    if (!rootStudent) {
      throw new Error(`Student not Found`);
    }
    req.token = token;
    req.rootStudent = rootStudent;
    req.studentID = rootStudent._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized :  No Token Provided");
    console.log(err);
  }
};

router.post("/question/add", async (req, res) => {
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
router.delete("/question/delete", async (req, res) => {
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
router.get("/quizz", authentication, (req, res) => {
  res.send(req.rootStudent);
  console.log("root student is", req.rootStudent);
});
router.get("/questions", async (req, res) => {
  const questions = await questionModel.find({});
  res.send(questions);
});
router.get("/quizzdata", Authenticate, async (req, res) => {
  try {
    const studentStatus = await studentModel.findOne({
      _id: req.studentID,
      status: true,
    });

    if (studentStatus) {
      res.json({ error: "You Have Already Complete Your Quizz" });
    } else {
      const questions = await questionModel.find({});
      res.send(questions);
      console.log("kbfkevekhce", req.studentID);
    }

    console.log("this is the current student" + studentStatus);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/result", async (req, res) => {
  try {
    const findandUpdateResult = await studentModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        score: req.body.score,
        status: req.body.status,
        answer: req.body.answer,
        result: req.body.result,
      }
    );
    res.json({ message: "Result Saved SuccessFully" });
    console.log(findandUpdateResult);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/quizz", Authenticate, (req, re) => {
//   res.send(req.studentID);
// });

// router.get("/quizzdata", async (req, res) => {
//   const questions = await questionModel.find({});
//   res.send(questions);
// });

router.post("/logout", (req, res) => {
  res.clearCookie("jwtt", { path: "/" });
  res.status(200).send({ message: "Logout" });
});

module.exports = router;
