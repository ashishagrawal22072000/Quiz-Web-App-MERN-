const express = require("express");
const router = express.Router();
const studentModel = require("../model/StudentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRETKEY } = require("../config");
const questionModel = require("../model/questionModel");
const authentication = require("../middleware/authentication");
const { check, body, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");

// const Authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtt;
//     console.log("helllo from authenticationnnnnnnnnn", token);
//     const verifyToken = jwt.verify(token, SECRETKEY);

//     const rootStudent = await studentModel.findOne({
//       _id: verifyToken._id,
//     });

//     if (!rootStudent) {
//       throw new Error(`Student not Found`);
//     }
//     req.token = token;
//     req.rootStudent = rootStudent;
//     req.studentID = rootStudent._id;
//     next();
//   } catch (err) {
//     res.status(401).send("Unauthorized :  No Token Provided");
//     console.log(err);
//   }
// };

router.post(
  "/register",
  [
    body("username", "Invalid Username").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("email").custom((value) => {
      return studentModel.findOne({ email: value }).then((student) => {
        if (student) {
          console.log(student);
          return Promise.reject("student already registered");
        }
      });
    }),
    check("password")
      // .isLength({ min: 5 })
      // .withMessage("must be at least 5 chars long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage(
        "Password Must Be at least 8 chars long with atleast 1 spaciel charactor and number"
      ),
  ],
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
  }
);

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

router.get("/", authentication, async (req, res) => {
  res.json(req.rootStudent);
});

module.exports = router;
