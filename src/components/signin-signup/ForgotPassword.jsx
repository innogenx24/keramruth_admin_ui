import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import LoginImage from "../../assets/logo/LoginImage.png";
import "./style.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5004/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset link sent to your email");
        setEmail(""); // Clear the email field
      } else {
        setErrorMessage(data.message || "Error sending reset link");
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
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <Typography variant="h4" gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant="body1" gutterBottom>
              Enter Your Email And We'll Send You Instructions To Reset Your
              Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Enter Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errorMessage)}
                helperText={errorMessage}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 2, backgroundColor: "#00b050", fontSize: "16px" }}
              >
                NEXT
              </Button>
            </form>

            {/* Success Snackbar */}
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage("")}
            >
              <Alert onClose={() => setSuccessMessage("")} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar
              open={Boolean(errorMessage)}
              autoHideDuration={6000}
              onClose={() => setErrorMessage("")}
            >
              <Alert onClose={() => setErrorMessage("")} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>

            {/* Back to Login */}
            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center", color: "#777" }}
            >
              Back to Login?{" "}
              <Button
                variant="text"
                sx={{ color: "#007bff" }}
                onClick={() => navigate("/signin")}
              >
                Click Here
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
