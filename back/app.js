const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("./lib/mongo");
const productrouter = require("./routes/products");
const settings = require("./lib/server");
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: settings.FRONT_URI,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

app.use("/", productrouter);

module.exports = app;
//const PORT = settings.PORT || 5000;
//app.listen(PORT, () => {
//console.log(`Server is running at port : ${PORT} `);
//});
