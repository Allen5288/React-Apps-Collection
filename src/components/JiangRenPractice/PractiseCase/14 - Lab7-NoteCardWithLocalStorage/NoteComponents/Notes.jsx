import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";

const Notes = () => {
  // Get notes from localStorage if available, or start with an empty array
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("react-notes-app-data");
    if (data) {
      setNotes(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (loading) return; // Avoid saving while loading
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes, loading]);

  // Add a new note
  const addNote = (text) => {
    const newNote = {
      id: uuid(),
      text: text,
    };
    setNotes([...notes, newNote]);
  };

  // Delete a note
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  return (
    <div className="notes-wrapper">
      <div className="create-note-container">
        <CreateNote addNote={addNote} />
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
