import connectDb from "../config.js";

//Contains schema for the user-table
async function createTable() {
  const ctQ = `CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL Primary Key,
            name Varchar(100) NOT NULL,
            email varchar(100) UNIQUE NOT NULL,
            password varchar(100) NOT NULL

        )`;

  try {
    await connectDb.connect();
    await connectDb.query(ctQ);
    console.log("User table created successfully");
  } catch (err) {
    console.log(err, "Error creating tables");
  }
}

createTable();
