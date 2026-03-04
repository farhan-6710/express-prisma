import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({
      error: "user already exists with the email entered",
    });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate JWT
  const token = generateToken(user.id, res);

  return res.status(201).json({
    status: "success",
    user: {
      id: user.id,
      name,
      email,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }

  // generate JWT
  const token = generateToken(user.id, res);

  return res.status(201).json({
    status: "success",
    user: {
      id: user.id,
      email,
    },
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("jwt-token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
};

export { signup, login, logout };
