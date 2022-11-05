const settings = require("./server");
const mongoose = require("mongoose");

const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,


};

const uri = settings.MONGOOS_URI;
mongoose.set('toJSON', { virtuals: true })
mongoose.connect(uri, CONNECT_OPTIONS);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("***database works!!***");
});
