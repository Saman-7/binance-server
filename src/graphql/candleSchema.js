const { gql } = require("apollo-server-express");
const { BTC_USDT, BTC_BNB } = require("../models/candleStick");

//TypeDefs GraphQL
const typeDefs = gql`
  type Candle {
    candleId: ID!
    pair: String!
    startTime: String!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    interval: String!
    volume: Float!
  }

  enum PAIRS {
    BTC_USDT
    BTC_BNB
  }

  type Query {
    getPair(pair: PAIRS!): [Candle!]!
  }
`;

const pairToModel = {
  BTC_USDT: BTC_USDT,
  BTC_BNB: BTC_BNB,
};

//Resolvers GraphQL
const resolvers = {
  Query: {
    getPair: async (parent, args, context, info) => {
      const candles = await pairToModel[args.pair].aggregate([
        {
          $project: {
            candleId: "$candle_id",
            pair: "$pair",
            startTime: "$start_time",
            open: "$open",
            high: "$high",
            low: "$low",
            close: "$close",
            interval: "$interval",
            volume: "$volume",
          },
        },
      ]);
      return candles;
    },
  },
};

const Schema = { typeDefs, resolvers };

module.exports = { Schema };
