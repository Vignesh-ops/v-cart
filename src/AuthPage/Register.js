import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/register", { name, email, password });
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default Register;
