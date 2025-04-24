import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./ReactLiveCoding.css";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from "@mui/material";
import CounterApp from "./PracticeCase/01-CounterApp/CounterApp";
import TaskTracker from "./PracticeCase/02-TaskTracker/TaskTracker";

function ReactLiveCodingHome() {
  // Array of practice links - updated paths to match the route structure
  const practicePages = [
    { path: "CounterApp", label: "Counter Application" },
    { path: "TaskTracker", label: "Task Tracker" },
    // Add more practice pages as needed
  ];

  const navigate = useNavigate();

  const handleOpenPractice = (path) => {
    navigate(path);
  };

  return (
    <div className="react-live-coding-container">
      <div className="react-live-coding-header">
        <h1>React Live Coding Practices</h1>
        <h2>Small React coding exercises and examples</h2>
      </div>

      <Container maxWidth="lg">
        <div className="practice-grid">
          {practicePages.map((page) => (
            <Card key={page.path} className="practice-card">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {page.label}
                </Typography>
                <CardActions sx={{ marginTop: "auto" }}>
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

function ReactLiveCoding() {
  return (
    <Routes>
      <Route path="/" element={<ReactLiveCodingHome />} />
      <Route path="/CounterApp" element={<CounterApp />} />
      <Route path="/TaskTracker" element={<TaskTracker />} />
      {/* Add more routes for other practice components here */}
    </Routes>
  );
}

export default ReactLiveCoding;