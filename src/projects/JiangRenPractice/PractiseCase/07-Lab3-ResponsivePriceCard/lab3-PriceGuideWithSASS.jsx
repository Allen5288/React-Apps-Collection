import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";
import "./lab3-PriceGuideWithSASS.scss";

// Price plan data
const pricePlans = [
  {
    id: 1,
    title: "Basic",
    price: "19",
    period: "/month",
    features: [
      "1 Website",
      "5GB Storage",
      "10GB Bandwidth",
      "Basic Support"
    ],
    featured: false
  },
  {
    id: 2,
    title: "Professional",
    price: "49",
    period: "/month",
    features: [
      "10 Websites",
      "50GB Storage",
      "100GB Bandwidth",
      "Priority Support",
      "Free Domain"
    ],
    featured: true
  },
  {
    id: 3,
    title: "Enterprise",
    price: "99",
    period: "/month",
    features: [
      "Unlimited Websites",
      "500GB Storage",
      "Unlimited Bandwidth",
      "24/7 Support",
      "Free Domain",
      "Custom Solutions"
    ],
    featured: false
  }
];

// Individual Price Card Component
const PriceCard = ({ title, price, period, features, featured }) => {
  return (
    <div className={`price-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="popular-tag">Most Popular</div>}
      <div className="card-header">
        <h2>{title}</h2>
        <div className="price">
          <span className="dollar-sign">$</span>
          <span className="amount">{price}</span>
          <span className="period">{period}</span>
        </div>
      </div>
      <div className="card-content">
        <ul className="features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button className="btn-select">Select Plan</button>
      </div>
    </div>
  );
};

function PriceGuideWithSASS() {
  return (
    <Container maxWidth="lg">
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        className="price-guide-title"
        gutterBottom
      >
        Responsive Price Card with SASS
      </Typography>
      
      <main className="price-guide-container">
        <div className="price-cards">
          {pricePlans.map(plan => (
            <PriceCard 
              key={plan.id} 
              title={plan.title} 
              price={plan.price} 
              period={plan.period} 
              features={plan.features}
              featured={plan.featured} 
            />
          ))}
        </div>
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

export default PriceGuideWithSASS;