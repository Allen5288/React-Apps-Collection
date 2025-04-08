import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./lab1-responsiveList.css"; // Import your CSS file

function Lab1ResponsiveList() {
  return (
    <Container id="Lab1ResponsiveList" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="responsive-list-container">
        <ol style={{ "--length": 5 }}>
          <li style={{ "--i": 1 }}>
            <h3>Step One: HTML+CSS</h3>
            <p>Make a responsive list with HTML and CSS.</p>
          </li>
          <li style={{ "--i": 2 }}>
            <h3>Step Two: Javascript</h3>
            <p>Make a responsive list with Javascript.</p>
          </li>
          <li style={{ "--i": 3 }}>
            <h3>Step Three: framework and libries</h3>
            <p>Make a responsive list with framework and libries.</p>
          </li>
          <li style={{ "--i": 4 }}>
            <h3>Step Four: Front-end Tools</h3>
            <p>Make a responsive list with Front-end Tools.</p>
          </li>
          <li style={{ "--i": 5 }}>
            <h3>
              Step Five: Front-end Performance Optimization / cross-platform
              development
            </h3>
            <p>
              Make a responsive list with Front-end Performance Optimization /
              cross-platform development.
            </p>
          </li>
        </ol>
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

export default Lab1ResponsiveList;
