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
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginImage from "../../assets/logo/LoginImage.png"; // Assuming you have this image
import "./style.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role_id: 1,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5004/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setSuccessMessage("You have registered successfully!");
          setErrorMessage("");
          formik.resetForm();
          setTimeout(() => {
            navigate("/signin"); // Redirect to sign-in page after success
          }, 2000);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error submitting data");
        }
      } catch (error) {
        setErrorMessage("Error submitting data");
      }
    },
  });

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
          <Box width="100%" maxWidth={400}>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                label="Role ID"
                name="role_id"
                type="number"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("role_id")}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#00C853",
                  "&:hover": { backgroundColor: "#00A04D" },
                  padding: { xs: "8px", sm: "10px" }, // Responsive button padding
                  fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size
                }}
              >
                SIGN UP
              </Button>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    onClick={() => navigate("/signin")}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Box>
            </form>

            {/* Success and Error Snackbar */}
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage("")}
            >
              <Alert onClose={() => setSuccessMessage("")} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={Boolean(errorMessage)}
              autoHideDuration={6000}
              onClose={() => setErrorMessage("")}
            >
              <Alert onClose={() => setErrorMessage("")} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
