//the file uses JWT tokens ton authenticate a user for further use
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  //verify the user using the secret key
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
