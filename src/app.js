const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { Schema } = require("./graphql/candleSchema");
const { connectMongoose } = require("./db/mongoose");

connectMongoose();

const app = express();

////////////////////////////////////////////////////////////////////////////////

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
