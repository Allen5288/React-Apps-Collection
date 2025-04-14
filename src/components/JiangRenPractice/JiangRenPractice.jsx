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
import SignUpForm from "./PractiseCase/01-HTML&CSS-Assisgnment1-SignUpForm/HTML&CSS-SignUpForm";
import Lab1ResponsiveList from "./PractiseCase/02-HTMLCSS-Lab1-resposiveList/lab1-responsiveList";
import BusinessCardUIDesign from "./PractiseCase/03-HTMLCSS-Assign2-CardUIDesign/HTMLCSS-Assign2-CardUIDesign";
import Lab2GridCard from "./PractiseCase/05-Lab2-Grid-Flexcbox-Card/Lab2-gridCard";

function JiangRenPracticeHome() {
  // Array of practice links - updated paths to match the route structure
  const practicePages = [
    { path: "SignUpForm", label: "SignUpForm" },
    { path: "Lab1ResponsiveList", label: "Lab1ResponsiveList" },
    { path: "HTMLCSS-Assign2-CardUIDesign", label: "HTMLCSS-Assign2-CardUIDesign" },
    { path: "Lab2-Grid-Flexcbox-Card", label: "Grid & Flexbox Card Layout" },
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
      <Route path="/Lab1ResponsiveList" element={<Lab1ResponsiveList />} />
      <Route path="/HTMLCSS-Assign2-CardUIDesign" element={<BusinessCardUIDesign />} />
      <Route path="/Lab2-Grid-Flexcbox-Card" element={<Lab2GridCard />} />
      {/* Add more routes for other practice components here */}
    </Routes>
  );
}

export default JiangRenPractice;