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
app.use("/", productrouter);
if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, 'public')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

}



module.exports = app;

