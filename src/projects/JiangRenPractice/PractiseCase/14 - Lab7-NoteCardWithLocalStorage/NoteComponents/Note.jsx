import React from "react";
import DeleteForeverOutlineIcon from "@mui/icons-material/DeleteForeverOutlined";

const Note = ({ id, text, deleteNote }) => {
  return (
    <div className="note">
      <div className="note__body">{text}</div>
      <div className="note__footer">
        <DeleteForeverOutlineIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-label="Delete note"
        />
      </div>
    </div>
  );
};

export default Note;
