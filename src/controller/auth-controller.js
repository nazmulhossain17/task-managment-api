const { jwtKey } = require("../../config");
const prisma = require("../../prisma");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Ensure password is not null
      },
    });
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ userId: user.id }, jwtKey);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("Logout successful"); // Use res.send to send the response
  } catch (error) {
    res.status(500).send(error.message); // Use res.send to send the error message
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
