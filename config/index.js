require("dotenv").config();

const jwtKey = process.env.JWT_KEY;
const port = process.env.PORT;

module.exports = {
  jwtKey,
  port,
};
