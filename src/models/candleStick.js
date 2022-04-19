const mongoose = require("mongoose");

//Schema MongoDB
const CandleSchema = new mongoose.Schema(
  {
    candle_id: { type: String, index: { unique: true, dropDups: true } },
    pair: { type: String },
    start_time: { type: String },
    end_time: { type: String },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    interval: { type: String },
    volume: { type: Number },
    is_up_candle: { type: Boolean },
  },
  { versionKey: false }
);

module.exports = mongoose.model("candleStick", CandleSchema);
