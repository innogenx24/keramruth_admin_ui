import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid, Box, Snackbar, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInRequest } from '../../redux/slices/authSlice';
import LoginImage from '../../assets/logo/LoginImage.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './style.css';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  // Local state for managing password visibility, remember me, and snackbar
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      dispatch(signInRequest({ ...values, rememberMe }));

      // Store token in localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('email', values.email); // Store email (or token) in localStorage
      } else {
        sessionStorage.setItem('email', values.email); // Store temporarily in sessionStorage
      }
    }
  });

  // Handle authentication redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/sales');
    }
  }, [isAuthenticated, navigate]);

  // Prefill email from storage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
    if (storedEmail) {
      formik.setFieldValue('email', storedEmail);
    }
  }, []);

  // Handle error Snackbar display
  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth={false}>
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {/* Image Section */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {
              xs: 'auto',
              sm: '100vh'
            }
          }}
        >
          <Box>
            <img src={LoginImage} alt="Login" style={{ maxWidth: '100%', height: '100%', borderRadius: '8px' }} />
          </Box>
        </Grid>

        {/* Form Section */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {
              xs: 'auto',
              sm: '100vh'
            },
            padding: '16px'
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              {/* Password Field with Visibility Toggle */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Remember Me Checkbox */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember" style={{ marginLeft: '8px' }}>
                  Remember Me
                </label>
              </Box>

              {/* Submit Button */}
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{ marginTop: '16px' }}
              >
                LOGIN
              </Button>

              {/* Forgot Password Link */}
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Typography variant="body2">
                  Forgot Your Password?{' '}
                  <Button
                    variant="text"
                    onClick={() => navigate('/forgot-password')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Click Here
                  </Button>
                </Typography>
              </Box>

              {/* Sign Up Link */}
              <Box sx={{ mt: -1, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button
                    variant="text"
                    onClick={() => navigate('/signup')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Click Here
                  </Button>
                </Typography>
              </Box>

              {/* Snackbar for Error Display */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;










// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Grid,
//   Box,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import LoginImage from "../../assets/logo/LoginImage.png";
// import "./style.css";
// const SignIn = () => {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string().required("Required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await fetch("http://localhost:5004/signin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // Navigate to dashboard on successful login
//           navigate("/dashboard");
//         } else {
//           // Display error message if login fails
//           setErrorMessage(data.message || "Email or password incorrect");
//         }
//       } catch (error) {
//         setErrorMessage("Error connecting to server");
//       }
//     },
//   });

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         height: "100vh",
//         alignItems: "center",
//         padding: { xs: 2, sm: 3, md: 5 }, // Responsive padding
//       }}
//     >
//       <Grid container sx={{ height: "100%" }}>
//         {/* Left section with the image */}
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           sx={{
//             display: { xs: "none", sm: "block" },
//             backgroundImage: `url(${LoginImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100%",
//           }}
//         />

//         {/* Right section with the form */}
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             padding: { xs: "16px", sm: "32px" }, // Responsive padding
//           }}
//         >
//           <Box width="100%" maxWidth={400}>
//             <Typography variant="h4" gutterBottom>
//               Login
//             </Typography>
//             <form onSubmit={formik.handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 variant="outlined"
//                 margin="normal"
//                 {...formik.getFieldProps("email")}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"} // Toggle password visibility
//                 variant="outlined"
//                 margin="normal"
//                 {...formik.getFieldProps("password")}
//                 error={
//                   formik.touched.password && Boolean(formik.errors.password)
//                 }
//                 helperText={formik.touched.password && formik.errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                 <input type="checkbox" id="remember" name="remember" />
//                 <label htmlFor="remember" style={{ marginLeft: "8px" }}>
//                   Remember Me
//                 </label>
//               </Box>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 fullWidth
//                 type="submit"
//                 sx={{
//                   mt: 2,
//                   backgroundColor: "#00C853",
//                   "&:hover": { backgroundColor: "#00A04D" },
//                   padding: { xs: "8px", sm: "10px" }, // Responsive button padding
//                   fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size
//                 }}
//               >
//                 LOGIN
//               </Button>
//               <Box sx={{ mt: 2, textAlign: "center" }}>
//                 <Typography variant="body2">
//                   Forgot Your Password?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => navigate("/forgot-password")}
//                     sx={{ textTransform: "none", fontWeight: "bold" }}
//                   >
//                     Click Here
//                   </Button>
//                 </Typography>
//               </Box>

//               {/* Don't have an account section */}
//               <Box sx={{ mt: 2, textAlign: "center" }}>
//                 <Typography variant="body2">
//                   Don't have an account?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => navigate("/signup")}
//                     sx={{ textTransform: "none", fontWeight: "bold" }}
//                   >
//                     Click Here
//                   </Button>
//                 </Typography>
//               </Box>
//             </form>

//             {/* Error Snackbar */}
//             <Snackbar
//               open={Boolean(errorMessage)}
//               autoHideDuration={6000}
//               onClose={() => setErrorMessage("")}
//             >
//               <Alert onClose={() => setErrorMessage("")} severity="error">
//                 {errorMessage}
//               </Alert>
//             </Snackbar>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default SignIn;
