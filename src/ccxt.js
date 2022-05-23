// CCXT
const ccxt = require("ccxt");
const getCandles = async (pair) => {
  const Binance = new ccxt.binance();
  return await Binance.fetchOHLCV(pair, "1m", undefined, 4000);
};

module.exports = getCandles;
