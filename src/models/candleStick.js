const mongoose = require("mongoose");

//Schema MongoDB
const CandleSchema = new mongoose.Schema(
  {
    candle_id: { type: Number, index: { unique: true, dropDups: true } },
    pair: { type: String },
    start_time: { type: String },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    interval: { type: String },
    volume: { type: Number },
  },
  { versionKey: false }
);

module.exports = {
  BTC_USDT: mongoose.model("BTC-USDT", CandleSchema),
  BTC_BNB: mongoose.model("BTC-BNB", CandleSchema),
};
