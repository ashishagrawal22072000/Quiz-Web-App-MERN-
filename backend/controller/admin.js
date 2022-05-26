const express = require("express");
const router = express.Router();
const adminModel = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRETKEY } = require("../config");
const studentModel = require("../model/StudentModel");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.admin;
    console.log("helllo from authentication", token);
    const verifyToken = jwt.verify(token, SECRETKEY);

    const rootAdmin = await adminModel.findOne({
      _id: verifyToken._id,
    });

    if (!rootAdmin) {
      throw new Error(`Student not Found`);
    }
    req.token = token;
    req.rootAdmin = rootAdmin;
    req.adminID = rootAdmin._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized :  No Token Provided");
    console.log(err);
  }
};

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please Fill All The Fields" });
    }

    const adminExist = await adminModel.findOne({ email: email });

    if (adminExist) {
      return res.status(422).json({ error: "Admin Already Exist" });
    } else {
      const admin = new adminModel({
        email,
        password,
      });

      const adminregister = await admin.save();
      res.status(200).json({ message: "admin Registered" });
      console.log(adminregister);
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

    const adminlogin = await adminModel.findOne({ email: email });
    if (adminlogin) {
      console.log(adminlogin);
      const comparePassword = await bcrypt.compare(
        password,
        adminlogin.password
      );
      if (comparePassword) {
        const token = jwt.sign({ _id: adminlogin._id }, SECRETKEY);
        // console.log(token);
        res.cookie("admin", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ message: "admin login" });
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

router.get("/data", Authenticate, async(req, res) => {
  try {
    const studentData = await studentModel.find({});
    res.send(studentData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", Authenticate, async (req, res) => {
  res.json(req.rootAdmin);
});
router.post("/logout", (req, res) => {
  res.clearCookie("admin", { path: "/" });
  res.status(200).send({ message: "Logout" });
});

router.get("/alldata", async (req, res) => {
  
});

module.exports = router;
