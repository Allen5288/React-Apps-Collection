import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Lab5-ProgressBar.scss";

function Lab5ProgressBar() {
  const [currentActive, setCurrentActive] = useState(1);
  const circles = [1, 2, 3, 4]; // The circle numbers

  const handleNext = () => {
    setCurrentActive((prev) => {
      return prev < circles.length ? prev + 1 : prev;
    });
  };

  const handlePrev = () => {
    setCurrentActive((prev) => {
      return prev > 1 ? prev - 1 : prev;
    });
  };

  // Calculate progress width as a percentage
  const progressWidth = ((currentActive - 1) / (circles.length - 1)) * 100;

  return (
    <Container id="Lab5ProgressBar" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="progress-container">
        <div 
          className="progress" 
          style={{ width: `${progressWidth}%` }}
        ></div>
        
        {circles.map((circle, idx) => (
          <div 
            key={idx} 
            className={`circle ${idx + 1 <= currentActive ? 'active' : ''}`}
          >
            {circle}
          </div>
        ))}
      </Box>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          id="prev" 
          className="btn" 
          onClick={handlePrev} 
          disabled={currentActive === 1}
          variant="contained"
        >
          Prev
        </Button>
        <Button 
          id="next" 
          className="btn" 
          onClick={handleNext} 
          disabled={currentActive === circles.length}
          variant="contained"
        >
          Next
        </Button>
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

export default Lab5ProgressBar;