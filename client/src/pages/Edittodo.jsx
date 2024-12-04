import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodos, updateTodo } from './Todo'; // Assuming these functions are imported
import { TextField, Button, Select, MenuItem, Box, Typography } from '@mui/material';

const EditTodo = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodoData = async () => {
      if (!token) return alert('Please log in to edit a todo');
      setLoading(true);
      try {
        const { data } = await fetchTodos(token);
        const todoItem = data.find((todo) => todo.id === parseInt(id));
        if (todoItem) {
          setTodo(todoItem);
          setTitle(todoItem.title);
          setDescription(todoItem.description);
          setStatus(todoItem.status);
        } else {
          alert('Todo not found');
          navigate('/todos'); // Redirect to the todo list page if the todo is not found
        }
      } catch (err) {
        alert('Error fetching todo data');
      } finally {
        setLoading(false);
      }
    };

    fetchTodoData();
  }, [id, token, navigate]);

  const handleUpdateTodo = async () => {
    if (!title.trim()) return alert('Todo title cannot be empty');
    if (!token) return alert('Please log in to update a todo');
    try {
      await updateTodo(
        todo.id,
        { title, description, status },
        token
      );
      navigate('/todos'); // Redirect back to the todos list after successful update
    } catch (err) {
      alert('Error updating todo');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
        Edit Todo
      </Typography>
      {loading ? (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : (
        <form>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: 1, '& .MuiInputBase-root': { borderRadius: 1 } }}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: 1, '& .MuiInputBase-root': { borderRadius: 1 } }}
          />
          <Select
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: '#ffffff', borderRadius: 1, '& .MuiInputBase-root': { borderRadius: 1 } , marginBottom:"20px"}}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              padding: '12px',
              fontWeight: 'bold',
              borderRadius: 1,
            }}
            onClick={handleUpdateTodo}
            disabled={loading}
          >
            Update Todo
          </Button>
        </form>
      )}
    </Box>
  );
};

export default EditTodo;
