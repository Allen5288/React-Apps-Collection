import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "./JiangRenPractice.css";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from "@mui/material";
import SignUpForm from "./PractiseCase/HTML&CSS-Assisgnment1-SignUpForm/HTML&CSS-SignUpForm";

function JiangRenPracticeHome() {
  // Array of practice links - updated paths to match the route structure
  const practicePages = [
    { path: "SignUpForm", label: "SignUpForm" },
    // Add more practice pages as needed
  ];

  const navigate = useNavigate();

  const handleOpenPractice = (path) => {
    navigate(path);
  };

  return (
    <div className="jiangren-practice-container">
      <div className="jiangren-practice-header">
        <h1>JiangRen Practice Projects</h1>
        <h2>Collection of exercises and practice components</h2>
      </div>

      <Container maxWidth="lg">
        <div className="practice-grid">
          {practicePages.map((page) => (
            <Card
              key={page.path}
              className="practice-card"
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {page.label}
                </Typography>
                <CardActions>
                  <Button
                    onClick={() => handleOpenPractice(page.path)}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Open Practice
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

function JiangRenPractice() {
  return (
    <Routes>
      <Route path="/" element={<JiangRenPracticeHome />} />
      <Route path="/SignUpForm" element={<SignUpForm />} />
    </Routes>
  );
}

export default JiangRenPractice;