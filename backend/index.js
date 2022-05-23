const express = require("express");
const app = express();
const { PORT } = require("./config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./db/conn");
app.use(bodyParser.json());
app.use(cookieParser());
const questions = require("./controller/question");
const student = require("./controller/student");
const admin = require("./controller/admin");
app.use("/", questions);
app.use("/student", student);
app.use("/admin", admin);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
