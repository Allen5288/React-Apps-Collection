import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./NoteCardWithLocalStorage.scss"; // Import your CSS file here
import Header from "./NoteComponents/Header";
import Notes from "./NoteComponents/Notes";

function NoteCardWithLocalStorage() {
  return (
    <Container id="note-card-with-local-storage" maxWidth="lg" sx={{ mb: 4 }}>
      <Box className="note-card-container">
        <Header />
        <Notes />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/jiangRenPractice"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Back to Practice Home
        </Button>
      </Box>
    </Container>
  );
}

export default NoteCardWithLocalStorage;
