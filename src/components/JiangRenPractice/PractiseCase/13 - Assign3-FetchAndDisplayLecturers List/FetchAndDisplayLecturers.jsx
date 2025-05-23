import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./FetchAndDisplayLecturers.scss"; // Import your CSS file here

const URL =
  "https://my-json-server.typicode.com/JustinHu8/courseCardMock/lecturers";

/**
 * one lecture content is like this
 * {
    "id": 1,
    "name": "Prof. Jane Doe",
    "title": "Expert in TypeScript",
    "biography": "Jane has over a decade of experience teaching JavaScript and TypeScript. She focuses on simplifying complex programming concepts.",
    "coursesTaught": [
      {
        "courseId": 1,
        "courseTitle": "TypeScript Basic",
        "lessons": 10
      },
      {
        "courseId": 2,
        "courseTitle": "JavaScript Basic",
        "lessons": 90
      }
    ],
    "yearsOfExperience": 12
  },
 */
const LectureCard = ({ lecturer }) => {
  return (
    <div className="lecture-card">
      <h2>{lecturer.name}</h2>
      <h3>{lecturer.title}</h3>
      <p>{lecturer.biography}</p>
      <h4>Courses Taught:</h4>
      <ul>
        {lecturer.coursesTaught.map((course) => (
          <li key={course.courseId}>
            {course.courseTitle} - {course.lessons} lessons
          </li>
        ))}
      </ul>
      <p>Years of Experience: {lecturer.yearsOfExperience}</p>
    </div>
  );
};

function FetchAndDisplayLecturers() {
  let [lecturers, setLecturers] = React.useState([]);
  let [loading, setLoading] = React.useState(true);
  let [error, setError] = React.useState(null);

  useEffect(() => {
    // Using fetch with Promises instead of async/await
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLecturers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // ***with async/await***
  // useEffect(() => {
  // const fetchLecturers = async () => {
  //   try {
  //     const response = await fetch(URL);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setLecturers(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // fetchLecturers();
  // }, []);

  // ***with axios***
  // useEffect(() => {
  //   const fetchLecturers = async () => {
  //     try {
  //       const response = await axios.get(URL);
  //       setLecturers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchLecturers();
  // }, []);

  // Show loading state
  if (loading) {
    return (
      <Container id="fetch-and-display-lecturers" maxWidth="lg" sx={{ mt: 4 }}>
        <Box className="container loading-container">
          <h2>Loading lecturer data...</h2>
        </Box>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container id="fetch-and-display-lecturers" maxWidth="lg" sx={{ mt: 4 }}>
        <Box className="container error-container">
          <h2>Error loading lecturer data</h2>
          <p>{error.message}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container id="fetch-and-display-lecturers" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="container">
        <h1>Lecturers List</h1>
        <div className="lecturers-list">
          {lecturers &&
            lecturers.map((lecturer) => (
              <LectureCard key={lecturer.id} lecturer={lecturer} />
            ))}
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

export default FetchAndDisplayLecturers;
