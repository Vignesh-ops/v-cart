import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(DataContext);


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={10}
        p={3}
        boxShadow={3}
        borderRadius={2}
      >
        <Typography variant="h5" mb={2}>
          Chat App Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={() => handleLogin(email,password)}>
          Login
        </Button>
        <Typography mt={2}>
          Don't have an account? <a href="/register">Register Here</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
