import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginImage from "../../assets/logo/LoginImage.png";
import "./style.css";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validations
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Password strength validation
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, including one uppercase, one lowercase, one digit, and one special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5004/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send both email and password
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password successfully reset");
        setEmail(""); // Clear fields after success
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.message || "Error resetting password");
      }
    } catch (error) {
      setErrorMessage("Error connecting to server");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        padding: { xs: 2, sm: 3, md: 5 }, // Responsive padding
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Left section with the image */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundImage: `url(${LoginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />

        {/* Right section with the form */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: { xs: "16px", sm: "32px" }, // Responsive padding
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* New Password Field */}
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password Field */}
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Error Message */}
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 1, textAlign: "left" }}
                >
                  {errorMessage}
                </Typography>
              )}

              {/* Submit Button */}
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#00c853", // Green button
                  "&:hover": { backgroundColor: "#00b24a" }, // Hover effect
                }}
              >
                Submit
              </Button>

              {/* Back to Login */}
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Back to Login?{" "}
                  <Button
                    color="secondary"
                    variant="text"
                    onClick={() => navigate("/signin")}
                    sx={{ textTransform: "none" }}
                  >
                    Click Here
                  </Button>
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateNewPassword;
