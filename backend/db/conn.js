const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ashish:ash123ish@cluster0.esnxp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection SuccessFull");
  })
  .catch((err) => {
    console.log(err);
  });
