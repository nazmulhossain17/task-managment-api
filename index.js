const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./src/routes/user-auth.routes");
const taskRouter = require("./src/routes/task.routes");
const { port } = require("./config");

const app = express();

// Define CORS options
const corsOptions = {
  origin: "https://task-managment-app-e9404.web.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
