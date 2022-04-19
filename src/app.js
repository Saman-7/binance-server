const express = require("express");

const app = express();

const PORT = 3001;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Connected On Port ${PORT}`);
});
