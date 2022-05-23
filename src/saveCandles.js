const { BTC_USDT, BTC_BNB } = require("./models/candleStick");
const getCandles = require("./ccxt");
const { connectMongoose } = require("./db/mongoose");

connectMongoose();

// Save
const saveCandles = async () => {
  let Collection;

  await Promise.all(
    ["BTC/USDT", "BNB/BTC"].map(async (pair) => {
      if (pair === "BTC/USDT") Collection = BTC_USDT;
      else if (pair === "BNB/BTC") Collection = BTC_BNB;

      const count = await Collection.count();
      if (count === 0) {
        return getCandles(pair)
          .then((res) => {
            let id = 1;
            res.map((candle) => {
              const [start_time, open, high, low, close, volume] = candle;

              new Collection({
                candle_id: id++,
                pair: pair,
                start_time: start_time,
                open: open,
                high: high,
                low: low,
                close: close,
                interval: "1m",
                volume: volume,
              }).save((err, result) => {
                if (err) throw err;
              });
            });
            console.log(`Save ${pair} Candles :)`);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log(`${pair} candles already exist.`);
      }
    })
  );
};

saveCandles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
