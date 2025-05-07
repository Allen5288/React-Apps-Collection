import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography, Chip } from "@mui/material";
import "./MoocPlatformCourseCard.scss";
import {
  Language,
  AccessTime,
  LocationOn,
  AttachMoney,
} from "@mui/icons-material";

const courseCardListData = [
  {
    title: "Course 1",
    price: "$100",
    language: "English",
    duration: "4 weeks",
    location: "Online",
    isNew: true,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxGDAb3cfmL8w84tKjYGzZQATlCjI0vsAbOXUZ3TD6m7jlk2iwQ&s=10&ec=72940545",
  },
  {
    title: "Course 2",
    price: "$200",
    language: "Spanish",
    duration: "6 weeks",
    location: "Online",
    isNew: true,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdqOq89ZEZ3huwCGzGB1JOXaZGCUyLUyIpw3Y1FYKqVdV8gN6Jw&s=10&ec=72940545",
  },
  {
    title: "Course 3",
    price: "$150",
    language: "French",
    duration: "5 weeks",
    location: "Online",
    isNew: false,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8O_rOK7IiQE_hNf5mKuyF7gOY9rZE0Bc7oSaSKlJdv9GJuRC2A&s=10&ec=72940545",
  },
  {
    title: "Course 4",
    price: "$250",
    language: "German",
    duration: "8 weeks",
    location: "Online",
    isNew: false,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcZgnSzir_duWTVVgGnqewMTjKHi9zS_tcBzn1e9vZdEwBHDuxw&s=10&ec=72940545",
  },
  {
    title: "Course 5",
    price: "$300",
    language: "Italian",
    duration: "7 weeks",
    location: "Online",
    isNew: false,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWg7Eef316gr4tmZTtAwfjlFgLzHeqQF__xfmTGrAYE9GLv8K-w&s=10&ec=72940545",
  },
  {
    title: "Course 6",
    price: "$350",
    language: "Portuguese",
    duration: "9 weeks",
    location: "Online",
    isNew: false,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkzfCQiXJ728GyGmEywSznbFYRbjduqasRqt1AqYviGVQY95u8Q&s=10&ec=72940545",
  },
];

// CourseCard component for better separation of concerns
const CourseCard = ({ course }) => {
  // Destructuring the course object using ES6 feature
  const { title, price, language, duration, location, isNew, imageUrl } =
    course;

  return (
    <div className="course-card">
      <div className="course-card-image-part">
        <img
          src={imageUrl}
          alt={`${title} course preview`}
          className="course-image"
        />
        {isNew && <Chip label="New" color="error" className="new-badge" />}
      </div>

      <div className="course-info">
        <Typography variant="h5" className="course-title">
          {title}
        </Typography>

        <div className="course-detail">
          <AttachMoney className="detail-icon" />
          <Typography className="course-price">{price}</Typography>
        </div>

        <div className="course-detail">
          <Language className="detail-icon" />
          <Typography className="course-language">{language}</Typography>
        </div>

        <div className="course-detail">
          <AccessTime className="detail-icon" />
          <Typography className="course-duration">{duration}</Typography>
        </div>

        <div className="course-detail">
          <LocationOn className="detail-icon" />
          <Typography className="course-location">{location}</Typography>
        </div>
      </div>
    </div>
  );
};

function MoocPlatformCourseCard() {
  return (
    <Container id="mooc-platform-course-card" maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Available Courses
      </Typography>

      <Box className="course-card-container">
        {courseCardListData.map((course, index) => (
          <CourseCard key={`course-${index}`} course={course} />
        ))}
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

export default MoocPlatformCourseCard;
