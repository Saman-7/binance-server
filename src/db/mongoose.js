const mongoose = require("mongoose");

//Connect MongoDB
const connectMongoose = () =>
  mongoose.connect(
    "mongodb+srv://binance:saman7@cluster0.6mw6m.mongodb.net/?retryWrites=true&w=majority",
    // "mongodb+srv://intern:nura@cluster0.zdpgp.mongodb.net/internship?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw err;
      console.log("MongoDB Connected ...");
    }
  );
module.exports.connectMongoose = connectMongoose;
