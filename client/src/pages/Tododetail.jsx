import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTodos } from './Todo'; // Assuming this function fetches todos
import { Box, Typography, CircularProgress, Paper, Button } from '@mui/material';

const TodoDetail = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const { data } = await fetchTodos();
        const todoItem = data.find(todo => todo.id === parseInt(id));
        setTodo(todoItem);
        setLoading(false); // Stop loading after fetching data
      } catch (err) {
        alert('Error fetching todo details');
        setLoading(false); // Stop loading on error
      }
    };

    fetchTodoDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!todo) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h6" color="error">
          Todo not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        padding: 3,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
          {todo.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Status: <strong>{todo.status}</strong>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {todo.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
};

export default TodoDetail;
