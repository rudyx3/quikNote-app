import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Note } from "../Components/Note";
import { FaPen } from "react-icons/fa";
import { EditNote } from "../Components/EditNote";
import Modal from "react-modal";
import axiosInstance from "../utils/API";
import { useNavigate } from "react-router-dom";
import { EmptyCard } from "../Components/EmptyCard";

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleClose = () => {
    setIsEdit({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  const [userInfo, setUserInfo] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  //this is to fetch the user Data
  const userData = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  //this is to get the notes for a user
  const userNotesData = async () => {
    try {
      const response = await axiosInstance.get("/all-notes");

      if (response.data && response.data.notes) {
        setUserNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An Unexpected Error Occured");
    }
  };

  //this is to delete a note
  const handleDeleteNote = async (note) => {
    try {
      const response = await axiosInstance.delete(`/notes/${note.note_id}`);

      if (response.data && response.data.message) {
        userNotesData();
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

  //updating a note
  const handleEditNote = async (note) => {
    setIsEdit({
      isShown: true,
      type: "edit",
      data: note,
    });
  };

  //searching a note
  const handleSearchNote = async (searchQuery) => {
    try {
      const response = await axiosInstance.get("/notes/search", {
        params: { title: searchQuery },
      });
      if (response.data && response.data.message) {
        setIsSearch(true);
        setSearchResults(response.data.notes);
      }
    } catch (error) {}
  };

  useEffect(() => {
    userNotesData();
    userData();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userD={userInfo}
        handleSearch={handleSearchNote}
        setIsSearch={setIsSearch}
        setSearchResults={setSearchResults}
      />
      <div className="container mx-auto px-4">
        {userNotes.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
          {(isSearch ? searchResults : userNotes).map((note, index) => (
            <Note
              key={note.note_id}
              title={note.note_title}
              content={note.note_content}
              date={new Date(note.created_on).toLocaleString()}
              handleEdit={() => {
                handleEditNote(note);
              }}
              handleDelete={() => {
                handleDeleteNote(note);
              }}
            />
          ))}
        </div> : <EmptyCard message= {"You have no notes, Get started by clicking the pen icon to note down memories with QuikNote!"}/>}
      </div>
          <div className="flex items-center justify-center absolute right-10 bottom-10">
            <button
              className="w-16 h-16 flex items-center justify-center rounded-full bg-custom-green hover:scale-110 transition-all ease-in-out duration-200"
              onClick={() => {
                setIsEdit({
                  isShown: true,
                  type: "add",
                  data: null,
                });
              }}
            >
              <FaPen className=" text-white" size={25} />
            </button>
          </div>
      {error && <p className="text-md text-red-500 font-semibold">{error}</p>}

      <Modal
        isOpen={isEdit.isShown}
        handleEditClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-[#cdd2c8] rounded-xl mx-auto mt-14 p-6 "
      >
        <EditNote
          noteData={isEdit.data}
          handleClose={handleClose}
          type={isEdit.type}
          handleAddNotes={userNotesData}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
