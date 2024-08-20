import connectDb from "../config.js";

//Contains schema for the notes-table
async function createNotes() {
  const cTQ = `
        CREATE TABLE IF NOT EXISTS notes(
          note_id SERIAL PRIMARY KEY,
          user_email varchar(100) REFERENCES users(email) ON DELETE CASCADE,
          note_title varchar(100) not null,
          note_content varchar(100) not null,
          created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  try {
    await connectDb.connect();
    await connectDb.query(cTQ);
    console.log("Notes db is added to the database");
  } catch (err) {
    console.log("Error creating the db");
    console.log(err);
  }
}

createNotes();
