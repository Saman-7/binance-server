const { gql } = require("apollo-server-express");
const Candle = require("../models/candleStick");

//TypeDefs GraphQL
const typeDefs = gql`
  type Candle {
    candleId: ID!
    pair: String!
    startTime: String!
    endTime: String!
    open: Float!
    high: Float
    low: Float
    close: Float
    interval: String!
    volume: Float
    isUpCandle: Boolean
  }

  type Query {
    getCandles: [Candle]!
  }
`;

//Resolvers GraphQL
const resolvers = {
  Query: {
    getCandles: async (parent, args, context, info) => {
      const allCandles = await Candle.aggregate([
        {
          $project: {
            candleId: "$candle_id",
            pair: "$pair",
            startTime: "$start_time",
            endTime: "$end_time",
            open: "$open",
            high: "$high",
            low: "$low",
            close: "$close",
            interval: "$interval",
            volume: "$volume",
            isUpCandle: "$is_up_candle",
          },
        },
      ]);
      return allCandles;
    },
  },
};

const Schema = { typeDefs, resolvers };

module.exports = { Schema };
