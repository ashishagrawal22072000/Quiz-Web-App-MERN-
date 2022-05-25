const express = require("express");
const jwt = require("jsonwebtoken");
const studentModel = require("../model/StudentModel");
// const { SECRETKEY } = require("../config");
const cookieParser = require("cookie-parser");
// const studentModel = require("../model/StudentModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const { SECRETKEY } = require("../config");
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

module.exports = Authenticate;
