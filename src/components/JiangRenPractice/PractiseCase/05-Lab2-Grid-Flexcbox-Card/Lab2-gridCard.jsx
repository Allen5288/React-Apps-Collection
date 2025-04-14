import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";
import "./Lab2-gridCard.css";

// Card data - using the same images from the HTML template
const cardData = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsZXh8ZW58MHx8fHwxNjg3NTY5NzA1&ixlib=rb-4.0.3&q=80&w=400",
    alt: "Nature Image"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400",
    alt: "City Image"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400",
    alt: "Animal Image"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400",
    alt: "Flower Image"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400",
    alt: "Mountain Image"
  }
];

// Individual Card Component
const Card = ({ imageUrl, alt }) => {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={imageUrl} alt={alt} className="card__image" />
      </div>
    </div>
  );
};

function Lab2GridCard() {
  return (
    <Container maxWidth="lg">
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        className="section-title"
        gutterBottom
      >
        Grid & Flexbox Card Layout
      </Typography>
      
      <main>
        <section className="cards">
          {cardData.map(card => (
            <Card 
              key={card.id} 
              imageUrl={card.imageUrl} 
              alt={card.alt} 
            />
          ))}
        </section>
      </main>

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

export default Lab2GridCard;