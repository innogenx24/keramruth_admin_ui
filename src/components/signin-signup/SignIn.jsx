import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInRequest } from '../../redux/slices/authSlice';
import LoginImage from '../../assets/logo/LoginImage.png';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

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
      dispatch(signInRequest(values)); // Trigger sign-in request
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/sales');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth={false}>
      <Grid container sx={{ height: '100%', width:'100%' }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // Apply height 100% starting from sm breakpoint
            height: {
              xs: 'auto', // Auto height on extra small screens
              sm: '100vh' // Full viewport height on sm and up
            }
          }}
        >
          <Box>
            <img src={LoginImage} alt="Login" style={{ maxWidth: '100%', height: '100%', borderRadius:'8px' }} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {
              xs: 'auto', // Auto height on extra small screens
              sm: '100vh' // Full viewport height on sm and up
            },
            padding: '16px',
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '16px' }}>
                Sign In
              </Button>
              <Button
                color="secondary"
                variant="text"
                fullWidth
                style={{ marginTop: '16px' }}
                onClick={() => navigate('/signup')}
              >
                You have no account? Sign up
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
