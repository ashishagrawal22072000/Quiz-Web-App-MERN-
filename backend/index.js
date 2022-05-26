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
const quizz = require("./controller/quizz");
app.use("/question", questions);
app.use("/student", student);
app.use("/admin", admin);
app.use('/quizz', quizz)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
