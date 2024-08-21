import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import pool from "../config.js";
import dotenv from 'dotenv';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.PASS_EMAIL,
    pass: process.env.PASS_PASS,
  },
});

export const sendEmail = (userEmail) => {
  const htmlTemplate = path.join(__dirname, "..", "forgotPassTemplate.txt");
  let htmlTemp = fs.readFileSync(htmlTemplate, "utf-8");

  const mailOption = {
    from: "quiknoteteam@gmail.com",
    to: userEmail,
    subject: "Forgot Password",
    html: htmlTemp,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error("Error sending the mail", error);
    } else {
      console.log("Email Sent");
    }
  });
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const dbClient = await pool.connect();

  try {
    const emailExists = await dbClient.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (emailExists.rows.length === 0) {
      return res.status(400).json({ message: "Email does not exist." });
    } else {
      sendEmail(email);
      return res.status(200).json({ message: "Email Sent." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    dbClient.release();
  }
};

export default forgotPass;
