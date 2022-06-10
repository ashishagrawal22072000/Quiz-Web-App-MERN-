const express = require("express");
const router = express.Router();
const questionModel = require("../model/questionModel");
const authentication = require("../middleware/authentication");
const studentModel = require("../model/StudentModel");
router.use(express.json());

router.get("/", authentication, async (req, res) => {
  try {
    const studentStatus = await studentModel.findOne({
      _id: req.studentID,
      status: true,
    });

    if (studentStatus) {
      res.status(200).json({ error: "You Have Already Complete Your Quizz" });
    } else {
      const questions = await questionModel.find({});
      res.status(200).send(questions);
    }

    console.log("this is the current student" + studentStatus);
  } catch (err) {
    console.log(err);
  }
});
router.patch("/result", authentication, async (req, res) => {
  try {
    const findandUpdateResult = await studentModel.findByIdAndUpdate(
      { _id: req.studentID },
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

module.exports = router;
