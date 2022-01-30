import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { auth } from "../firebase";
import { AccountCircleOutlined } from "@mui/icons-material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(newUser.user, {
        displayName: `${values.lastName} ${values.firstName}`,
        photoURL: values.photoUrl,
      });
      console.log(newUser);
      navigate("/rooms");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5rem",
          padding: "1.5rem",
          backgroundColor: "#FFF",
          borderRadius: "15px",
        }}
      >
        <Avatar>
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          style={{ width: "100%", marginTop: "1.5rem" }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleInputChange}
                value={values.firstName}
                name="firstName"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={handleInputChange}
                value={values.lastName}
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleInputChange}
                value={values.email}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="photoUrl"
                label="Photo URL"
                onChange={handleInputChange}
                value={values.photoUrl}
                name="photoUrl"
                type="url"
                autoComplete="photo"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                sx={{ width: "100%", marginBottom: "1rem" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  value={values.password}
                  autoComplete="new-password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
