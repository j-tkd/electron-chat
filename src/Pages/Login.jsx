import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
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
import { Link, useNavigate } from "react-router-dom";
import { Error } from "../componets/Error";

export const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const [errors, setErrors] = useState([]);
  let isValid = true;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      console.log(`isValid: ${isValid}`);
      return;
    }

    try {
      if (isValid) {
        const { email, password } = values;
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(`Login Successfully: ${JSON.stringify(user)}`);
        navigate("/rooms");
      } else {
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            style={{ width: "100%", marginTop: "1.5rem" }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.email}
                  autoFocus
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
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                <div style={{ marginTop: "2rem" }}>
                  <Link to="/signup">Create New Accoount</Link>
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
