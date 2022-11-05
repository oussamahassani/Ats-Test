const devKeys = require("../config/server.dev");
const prodKeys = require("../config/server.prod");

const dotenv = require("dotenv");
dotenv.config();

if (process.env.NODE_ENV === "production") {
  module.exports = prodKeys;
} else if (process.env.NODE_ENV === "dev") {
  module.exports = devKeys;
}
