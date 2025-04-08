import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

function HTMLCSSAssignment1() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          HTML & CSS Assignment 1
        </Typography>
        <Typography variant="body1" paragraph>
          This is your HTML and CSS assignment page. You can add your exercises and practice content here.
        </Typography>
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

export default HTMLCSSAssignment1;