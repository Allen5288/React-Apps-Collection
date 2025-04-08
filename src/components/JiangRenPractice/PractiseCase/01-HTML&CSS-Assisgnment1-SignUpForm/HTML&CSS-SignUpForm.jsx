import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./HTML&CSS-SignUpForm.css"; // Import your CSS file

function SignUpForm() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="html-css-practise-box">
        {/* Sign Up Form with HTML5 validation */}
        <form
          className="signupForm"
          action="https://example.com/signup"
          method="POST"
        >
          <h1>Sign Up</h1>
          <p className="SecondTile">
            <span className="green-dot"></span>Your Basic Info
          </p>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
              required 
            />
            <small className="password-hint">Password must contain at least 8 characters, including uppercase, lowercase letters and numbers</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              required 
            />
          </div>

          <p className="SecondTile">
            <span className="green-dot"></span>Personal Details
          </p>
          <div className="form-group">
            <label htmlFor="birthdate">Date of Birth:</label>
            <input type="date" id="birthdate" name="birthdate" required />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  required
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="other" name="gender" value="other" />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="about">About Me:</label>
            <textarea 
              id="about" 
              name="about" 
              rows="4" 
              placeholder="Tell us something about yourself..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="profession">Choose Your Profession:</label>
            <select id="profession" name="profession" required>
              <option value="">-- Select a profession --</option>
              <option value="web-development">Web Development</option>
              <option value="data-analytics">Data Analytics</option>
              <option value="ui-ux-design">UI/UX Design</option>
              <option value="software-engineering">Software Engineering</option>
              <option value="devops">DevOps</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">I accept the Terms and Conditions</label>
          </div>

          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </form>
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

export default SignUpForm;
