import "./reactIntro.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

function ReactIntro() {
  // 按钮数据数组
  const pages = [
    { path: "/home", label: "Go to Home Page" },
    { path: "/reactEssentials", label: "Go to reactEssentials Page" },
    { path: "/ticTacToe", label: "Go to ticTacToe Page" },
    { path: "/investmentCalculator", label: "Go to investmentCalculator Page" },
    { path: "/styleAuthInput", label: "Go to styleAuthInput Page" },
    { path: "/refPortalPlayers", label: "Go to refPortalPlayers Page" },
    {
      path: "/tailWindProjectManagement",
      label: "Go to tailWindProjectManagement Page",
    },
    {
      path: "/contextShoppingCart",
      label: "Go to contextShoppingCart Page",
    },
    {
      path: "/sideEffectChooseDestination",
      label: "Go to sideEffectChooseDestination Page",
    },
    {
      path: "/quizApp",
      label: "Go to quizApp Page",
    },
    {
      path: "/compareCode",
      label: "Go to CodeCompare Page",
    },
    {
      path: "/salaryCalculator",
      label: "Go to SalaryCalculator Page" },
    {
      path: "/currencyExchange",
      label: "Go to Currency Exchange Page",
    },
    {
      path: "/jiangRenPractice",
      label: "Go to JiangRen Practice Page",
    },
    // 将来可以在这里添加更多页面
  ];

  return (
    <div id="introPage">
      <div className="App">
        <h1>React Practice Projects</h1>
        <h2>A Collection of React Learning Examples</h2>
      </div>

      <div
        style={{
          width: "90%", // Reduce width to prevent overflow
          margin: "0 auto", // Center the grid
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Changed to auto-fit and increased minimum width
          rowGap: "30px", // Reduced row gap
          columnGap: "30px", // Reduced column gap
          padding: "20px",
        }}
      >
        {pages.map((page) => (
          <Card
            key={page.path}
            sx={{
              width: "100%", // Make cards fill their grid cells
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {page.label.replace("Go to ", "").replace(" Page", "")}
              </Typography>
              <CardActions>
                <Button
                  component={Link}
                  to={page.path}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Project
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReactIntro;
