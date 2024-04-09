const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./src/routes/user-auth.routes");
const { port } = require("./config");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
