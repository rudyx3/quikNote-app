import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../utils/API";

export const EditNote = ({ noteData, handleClose, type, handleAddNotes, isLoad, setIsLoad }) => {
  const [title, setTitle] = useState(noteData?.note_title || "");
  const [content, setContent] = useState(noteData?.note_content || "");

  const [error, setError] = useState(null);

  const editNote = async () => {
    //Handling API request to edit the note
    setIsLoad(!isLoad)

    try {
      const response = await axiosInstance.put(`/notes/${noteData.note_id}`, {
        title: title,
        content: content,
      });

      if (response.data && response.data.message) {
        handleAddNotes();
        setIsLoad(false)
        handleClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const addNote = async () => {
    
    setIsLoad(!isLoad)
    
    try {
      const response = await axiosInstance.post("/add-note", {
        title: title,
        content: content,
      });
      // handleAddNotes(response.data.note)

      if (response.data && response.data.note) {
        handleAddNotes();
        setIsLoad(false)
        handleClose();
      }
    } catch (error) {
      if (error.data && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    //this is to display errors and API calls
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!content) {
      setError("Please enter content.");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative">
      <button className="flex items-center justify-center w-10 h-10 hover:scale-125 transition-all ease-in-out rounded-full absolute -top-3 -right-3">
        <IoMdClose
          size={20}
          className="cursor-pointer  "
          onClick={handleClose}
        />
      </button>
      <div className="flex flex-col gap-3">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-lg text-custom-green  outline-none rounded p-1 pl-2 bg-[#f1f1f1]"
          placeholder="Fun Day At Theme Park"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-md text-custom-green outline-none border p-2 rounded-xl bg-[#f1f1f1]"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      <button
        onClick={handleAddNote}
        className="bg-custom-green mt-5 p-3 rounded-xl font-semibold text-slate-200"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};
