import pool from "../config.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Signup authentication
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const dbClient = await pool.connect();

  try {
    const userExists = await dbClient.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists, Login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //Password protection using bcrypt

    await dbClient.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashedPassword]
    );
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    dbClient.release();
  }
};

//Login authentication with JWT token
export const login = async (req, res) => {
  const { email, password } = req.body;
  const dbClient = await pool.connect();

  try {
    const userExists = await dbClient.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    //checking if the user exists
    if (userExists.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const user = await userExists.rows[0];
    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //JWT token created here
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "30m" }
    );

    res
      .status(200)
      .json({ accessToken: accessToken, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserData = async (req, res) => {
  const user = req.user;
  const dbClient = await pool.connect();

  try {
    const isUser = await dbClient.query(
      `SELECT * FROM users WHERE email = $1`,
      [user.email]
    );

    if (!isUser) {
      res.status(400).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "user fetched",
      user: { name: isUser.rows[0].name, email: isUser.rows[0].email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    dbClient.release();
  }
};
