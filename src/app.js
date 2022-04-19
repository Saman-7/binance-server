const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { Schema } = require("./graphql/candleSchema");

const app = express();

////////////////////////////////////////////////////////////////////////////////

//Connect MongoDB
mongoose.connect(
  "mongodb+srv://intern:nura@cluster0.zdpgp.mongodb.net/internship?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB Connected ...");
  }
);

//Apollo Server
const startServer = async () => {
  const { typeDefs, resolvers } = Schema;
  const Server = new ApolloServer({ typeDefs, resolvers });
  await Server.start();
  Server.applyMiddleware({ app });
};

startServer();

/////////////////////////////////////////////////////////////////////////////////

const PORT = 3001;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Connected On Port ${PORT}`);
});
