import "./reactIntro.scss";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Container,
  Box,
} from "@mui/material";

function ReactIntro() {
  // Projects organized by category
  const projectCategories = [
    // {
    //   name: "HomePage",
    //   projects: [{ path: "/home", label: "Home Page" }],
    // },
    {
      name: "Required Start Backend Projects",
      projects: [
        { path: "/cms", label: "cms system" },
        { path: "/imageUpload", label: "Image Upload" },
        { path: "/productManagement", label: "Product Management" },
      ],
    },
    {
      name: "Practice Exercises",
      projects: [
        { path: "/jiangRenPractice", label: "JR Practice collections" },
        { path: "/ReactLiveCoding", label: "React Live Coding" },
      ],
    },
    {
      name: "Small Projects",
      projects: [
        { path: "/reactEssentials", label: "React Essentials" },
        { path: "/ticTacToe", label: "Tic Tac Toe Game" },
        { path: "/investmentCalculator", label: "Investment Calculator" },
        { path: "/styleAuthInput", label: "Styled Auth Input" },
        { path: "/compareCode", label: "Code Comparator" },
        { path: "/salaryCalculator", label: "Salary Calculator" },
        { path: "/currencyExchange", label: "Currency Exchange" },
      ],
    },
    {
      name: "Middle Projects",
      projects: [
        { path: "/refPortalPlayers", label: "Ref Portal Players" },
        { path: "/contextShoppingCart", label: "Context Shopping Cart" },
        { path: "/sideEffectChooseDestination", label: "Destination Chooser" },
        { path: "/quizApp", label: "Quiz Application" },
        {
          path: "/tailWindProjectManagement",
          label: "Project Management (Tailwind)",
        },
        { path: "/reduxBookLibrary", label: "Redux Book Library" },
        { path: "/reduxLoginApp", label: "Redux Login App" },
        { path: "/weatherApp", label: "Weather App" },
      ],
    },
    {
      name: "Large Projects",
      projects: [{ path: "/myToyRobot", label: "My Toy Robot" }],
    },
    
  ];

  return (
    <div id="introPage">
      <div className="App">
        <h1>React Practice Projects</h1>
        <h2>A Collection of React Personal Learning Examples</h2>
      </div>

      <Container className="categories-container">
        {projectCategories.map(
          (category, index) =>
            category.projects.length > 0 && (
              <div key={index} className="category-section">
                <div className="category-header">
                  <h2>{category.name}</h2>
                  <Divider className="category-divider" />
                </div>

                <Box className="project-grid">
                  {category.projects.map((project) => (
                    <Card key={project.path} className="project-card">
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          className="project-title"
                        >
                          {project.label}
                        </Typography>
                        <CardActions>
                          <Button
                            component={Link}
                            to={project.path}
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="view-button"
                          >
                            View Project
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </div>
            )
        )}
      </Container>
    </div>
  );
}

export default ReactIntro;
