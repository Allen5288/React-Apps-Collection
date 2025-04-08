import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";

function XXXXX() {
  return (
    <Container id="XXXXX" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="XXXX">
       
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

export default XXXXX;
