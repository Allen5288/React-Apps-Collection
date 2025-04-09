import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./HTMLCSS-Assign2-CardUIDesign.css"; // Import the CSS file for styling

function BusinessCardUIDesign() {
  return (
    <Container id="business-card-ui-design" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="business-card-style-1">
        <div className="business-card">
          <h2 className="business-card-title">UX Reasearch</h2>
          <p className="business-card-content">
            UI emi, ad ,omo, vemoa, quis nostrud exercitation ullamaco laboris
            nusi yut abfiua fia agyuidsg fao
          </p>
          <button className="business-card-button">LEARN MORE</button>
        </div>
      </Box>

      <Box className="business-card-style-2">
        <div className="business-card2">
          <div>
            <div className="personal-info">
              <div className="personal-info-name">John Doe</div>
              <div className="personal-info-title">
                Founder & CEO.{" "}
                <a href="https://www.sketch.com" className="company-link">
                  Sketch App
                </a>
              </div>
            </div>

            <div class="star-rating">★★★★★ </div>
          </div>
          <p className="business-card-content2">
            all users on mysofgn fibdsIFUHGIUDF ihfDSUu i fipSBFIUIPUhsbf
            IPUSDFB DJFGH FIDW dfnius fnidsafh iuwafhe9w nbfiaeb iuebgf jkwbef
            piwbfp fiwpuBEFWpib
          </p>
        </div>
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

export default BusinessCardUIDesign;
