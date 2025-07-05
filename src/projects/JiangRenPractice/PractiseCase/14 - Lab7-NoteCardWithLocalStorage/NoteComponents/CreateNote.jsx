import { LinearProgress } from "@mui/material";
import React, { useState } from "react";

const CreateNote = ({ addNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const handleSave = () => {
    if (noteText.trim().length > 0) {
      addNote(noteText);
      setNoteText("");
    }
  };

  return (
    <div className="create-note">
      <textarea
        rows="5"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-create-footer">
        <small className="character-limit">
          {characterLimit - noteText.length} characters remaining
        </small>
        <button
          className="save"
          onClick={handleSave}
          disabled={noteText.trim().length === 0}
        >
          Save
        </button>
      </div>
      <LinearProgress variant="determinate" value={(noteText.length / characterLimit) * 100} style={{ marginTop: "1rem" }} />
    </div>
  );
};

export default CreateNote;
