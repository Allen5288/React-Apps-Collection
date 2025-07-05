import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./lab1-responsiveList.css";

const steps = [
  {
    title: "Step One: HTML+CSS",
    description: "Make a responsive list with HTML and CSS."
  },
  {
    title: "Step Two: Javascript",
    description: "Make a responsive list with Javascript."
  },
  {
    title: "Step Three: framework and libraries",
    description: "Make a responsive list with framework and libraries."
  },
  {
    title: "Step Four: Front-end Tools",
    description: "Make a responsive list with Front-end Tools."
  },
  {
    title: "Step Five: Front-end Performance",
    description: "Make a responsive list with Front-end Performance Optimization / cross-platform development."
  }
];

function Lab1ResponsiveList() {
  const stepsLength = useMemo(() => steps.length, []);

  return (
    <Container id="Lab1ResponsiveList" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="responsive-list-container">
        <ol style={{ "--length": stepsLength }}>
          {steps.map((step, index) => (
            <li key={index} style={{ "--i": index + 1 }}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/jiangRenPractice"
          variant="contained"
          color="primary"
        >
          Back to Practice Home
        </Button>
      </Box>
    </Container>
  );
}

export default Lab1ResponsiveList;
