import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";
import "./HTMLCSS-Assign2-CardUIDesign.css";

// Separated cards into their own components for better structure
const FeatureCard = () => (
  <div className="business-card feature-card">
    <h2 className="card-title">UX Research</h2>
    <p className="card-content">
      UI design and research, focusing on user experience and intuitive 
      interfaces that improve product usability and customer satisfaction.
    </p>
    <button className="card-button">LEARN MORE</button>
  </div>
);

const TestimonialCard = () => (
  <div className="business-card testimonial-card">
    <div className="card-header">
      <div className="personal-info">
        <div className="personal-info-name">John Doe</div>
        <div className="personal-info-title">
          Founder & CEO.{" "}
          <a href="https://www.sketch.com" className="company-link">
            Sketch App
          </a>
        </div>
      </div>
      <div className="star-rating">★★★★★</div>
    </div>
    <p className="card-content">
      All users praise the intuitive interface and responsive design. The 
      application has greatly improved our workflow and productivity.
    </p>
  </div>
);

function BusinessCardUIDesign() {
  return (
    <Container id="business-card-ui-design" maxWidth="lg">
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        className="section-title"
        gutterBottom
      >
        Card UI Design Examples
      </Typography>
      
      <div className="cards-container">
        <Box className="card-wrapper">
          <FeatureCard />
        </Box>

        <Box className="card-wrapper">
          <TestimonialCard />
        </Box>
      </div>

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

export default BusinessCardUIDesign;
