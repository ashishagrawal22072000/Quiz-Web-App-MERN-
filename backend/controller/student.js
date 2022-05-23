const express = require("express");
const router = express.Router();
const studentModel = require("../model/StudentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRETKEY } = require("../config");
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(422).json({ error: "Please Fill All The Fields" });
    }

    const studentExist = await await studentModel.findOne({ email: email });

    if (studentExist) {
      return res.status(422).json({ error: "Student Already Exist" });
    } else {
      const student = new studentModel({
        username,
        email,
        password,
        score: 0,
        status: false,
        answer: [],
      });

      const studentregister = await student.save();
      res.status(200).json({ message: "Student Registered" });
      console.log(studentregister);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "please Fill All The Required Fields" });
    }

    const studentlogin = await studentModel.findOne({ email: email });
    if (studentlogin) {
      console.log(studentlogin);
      const comparePassword = await bcrypt.compare(
        password,
        studentlogin.password
      );
      if (comparePassword) {
        const token = jwt.sign({ _id: studentlogin._id }, SECRETKEY);
        // console.log(token);
        res.cookie("jwtt", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ message: "student login" });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;