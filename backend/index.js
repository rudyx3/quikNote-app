import express from "express";
import cors from "cors";
import { getUserData, login, signup } from "./controllers/authentication.js";
import { verifyToken } from "./middleware/authenticateToken.js";
import {
  addNote,
  deleteNote,
  editNote,
  getNoteByTitle,
  getUserNotes,
} from "./controllers/notesLogic.js";

const app = express();

app.use(express.json());
app.use(cors());

// Routes for authentication
app.post("/signup", signup);
app.post("/login", login);

// app.get('/notes/search', searchNotesByTitle);
app.post("/add-note", verifyToken, addNote);
app.get("/all-notes", verifyToken, getUserNotes);

//route to search a note
app.get("/notes/search", verifyToken, getNoteByTitle);

//route to edit the note
app.put("/notes/:id", verifyToken, editNote);

//route to delete a note
app.delete("/notes/:id", verifyToken, deleteNote);

//getting user info
app.get("/get-user", verifyToken, getUserData);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server has been connected on port ${PORT}`);
});
