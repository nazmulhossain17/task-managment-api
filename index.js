const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./src/routes/user-auth.routes");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
