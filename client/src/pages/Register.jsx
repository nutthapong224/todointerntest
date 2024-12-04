import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { registerUser } from './Todo';

const Register = () => {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Registration successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500, // Similar width to login
        margin: 'auto',
        mt: { xs: 4, md: 6 },
        px: { xs: 3, md: 4 },
        py: 6,
        boxShadow: 4, // Same shadow as login
        borderRadius: 3, // Rounded corners like login
        backgroundColor: 'white',
      }}
    >
      <Typography
        variant="h4" // Same font size as login
        align="center"
        mb={4} // More margin below the title
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Register
      </Typography>
      <TextField
        label="First Name"
        name="fname"
        fullWidth
        margin="normal"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        name="lname"
        fullWidth
        margin="normal"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
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
        sx={{ mb: 4 }} // Similar spacing to login
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          py: 2, // Same button size as login
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#155fa0' },
          fontSize: '1.2rem', // Same font size as login button
        }}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
