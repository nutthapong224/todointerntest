import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { loginUser } from './Todo';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      localStorage.setItem('token', data.token);
      navigate('/todos');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500, // Increased width for larger card
        margin: 'auto',
        mt: { xs: 4, md: 6 },
        px: { xs: 3, md: 4 }, // Increased padding for more content space
        py: 6, // Increased vertical padding
        boxShadow: 4, // Slightly more pronounced shadow
        borderRadius: 3, // Slightly more rounded corners
        backgroundColor: 'white',
      }}
    >
      <Typography
        variant="h4" // Larger title
        align="center"
        mb={4}
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Login
      </Typography>
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
        sx={{ mb: 4 }} // Increased spacing below password field
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          py: 2, // Larger button
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#155fa0' },
          fontSize: '1.2rem', // Increased font size
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
