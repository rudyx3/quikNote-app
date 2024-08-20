//Contains routes for all the Requests

import pool from "../config.js";

//API to fetch all the notes of a user from the db
export const getUserNotes = async (req, res) => {
  const dbClient = await pool.connect();

  try {
    const userId = req.user.email;

    const notes = await dbClient.query(
      `SELECT * FROM notes WHERE user_email = $1`,
      [userId]
    );

    res.status(200).json({ notes: notes.rows, message: "Notes fetched" });
  } catch (error) {
    console.log("Error Fetching notes", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    dbClient.release();
  }
};

//API to add a note to the db
export const addNote = async (req, res) => {
  const dbClient = await pool.connect();

  try {
    const userId = req.user.email;
    const { title, content } = req.body;

    const result = await dbClient.query(
      `INSERT INTO notes (user_email , note_title, note_content) VALUES ($1 ,$2 , $3) RETURNING *`,
      [userId, title, content]
    );

    const newNote = await result.rows[0];

    res.status(200).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    console.log("Error adding note", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    dbClient.release();
  }
};

//search function for the notes
export const getNoteByTitle = async (req, res) => {
  const { title } = req.query;
  const dbClient = await pool.connect();

  try {
    const user_email = req.user.email;

    const notes = await dbClient.query(
      `SELECT * FROM notes WHERE user_email = $1 AND note_title ILIKE $2`,
      [user_email, `%${title}%`]
    );

    if (notes.rows.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res
      .status(200)
      .json({ notes: notes.rows, message: "Searched For" + title });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  } finally {
    dbClient.release();
  }
};

//API to edit a note based on its Id
export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const dbClient = await pool.connect();

  try {
    const user_email = req.user.email;
    await pool.query(
      `UPDATE notes SET note_title = $1, note_content = $2 WHERE note_id = $3 AND user_email = $4`,
      [title, content, id, user_email]
    );

    res.status(200).json({ message: "Note edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error editing the Note" });
  } finally {
    dbClient.release();
  }
};

//API to delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const dbClient = await pool.connect();

  try {
    const user_email = req.user.email;
    await pool.query(
      `DELETE FROM notes WHERE note_id = $1 AND user_email = $2`,
      [id, user_email]
    );

    res.status(200).json({ message: "Note Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting the Note" });
  } finally {
    dbClient.release();
  }
};
