import React from "react";

const Message = ({ message, setMessage }) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setMessage("")}
      ></button>
    </div>
  );
};

export default Message;
