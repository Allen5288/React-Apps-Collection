import React, { useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import "./CodeComparatorPage.css";

function CodeComparatorPage() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [diff, setDiff] = useState("");

  const compareCode = () => {
    const code1Lines = code1.split("\n");
    const code2Lines = code2.split("\n");
    let diffText = "";

    const maxLength = Math.max(code1Lines.length, code2Lines.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = code1Lines[i] || "";
      const line2 = code2Lines[i] || "";

      if (line1 !== line2) {
        diffText += `Line ${i + 1}:\n`;
        diffText += `  <div class="diff-line diff-removed">  - ${line1}</div>\n`;
        diffText += `  <div class="diff-line diff-added">  + ${line2}</div>\n`;
      }
    }

    setDiff(diffText);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Code Comparator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Code Snippet 1</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Code Snippet 2</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={compareCode}>
            Compare Code
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Diff</Typography>
          <div
            style={{
              width: "100%",
              minHeight: "240px",
              border: "1px solid #ccc",
              padding: "10px",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{ __html: diff }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CodeComparatorPage;
