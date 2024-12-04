import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo } from './Todo'; // Import API functions
import { Button, List, ListItem, TextField, Box, Typography, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const token = localStorage.getItem('token');

  const fetchTodosData = async () => {
    if (!token) return alert('Please log in to view your todos');
    setLoading(true);
    try {
      const { data } = await fetchTodos(token);
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
   
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, [token]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return alert('Todo title cannot be empty');
    if (!token) return alert('Please log in to add a todo');
    try {
      await addTodo({ title: newTodo, description, status }, token);
      setNewTodo('');
      setDescription('');
      setStatus('pending');
      fetchTodosData();
    } catch (err) {
      alert('Error adding todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!token) return alert('Please log in to delete a todo');
    try {
      await deleteTodo(id, token);
      fetchTodosData();
    } catch (err) {
      alert('Error deleting todo');
    }
  };

  const handleEditTodo = (todo) => {
    navigate(`/edit-todo/${todo.id}`); // Navigate to the EditTodo page with the todo ID
  };

  const handleViewDetails = (todo) => {
    navigate(`/todo-details/${todo.id}`); // Navigate to the TodoDetails page with the todo ID
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
        Todo List
      </Typography>
      <TextField
        label="New Todo"
        fullWidth
        margin="normal"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          mb: 1,
          '& .MuiInputBase-root': { fontSize: '1rem' },
        }}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          mb: 1,
          '& .MuiInputBase-root': { fontSize: '1rem' },
        }}
      />
      <Select
        label="Status"
        fullWidth
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        margin="normal"
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          mb: 2,
        }}
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
        }}
        onClick={handleAddTodo}
        disabled={loading}
      >
        Add Todo
      </Button>

      <List sx={{ padding: 0 }}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                border: '1px solid #ccc',
                mb: 1,
                padding: { xs: 1, sm: 2 }, // Adjust padding for mobile
                borderRadius: 1,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fafafa',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  mb: { xs: 1, sm: 0 }, // Adjust margin for mobile
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Reduce font size on mobile
                }}
              >
                {todo.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                <Button
                  color="primary"
                  onClick={() => handleViewDetails(todo)}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Adjust button font size for mobile
                    width: { xs: '100%', sm: 'auto' }, // Make buttons full width on mobile
                  }}
                >
                  View Details
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleEditTodo(todo)}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Adjust button font size for mobile
                    width: { xs: '100%', sm: 'auto' }, // Make buttons full width on mobile
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Adjust button font size for mobile
                    width: { xs: '100%', sm: 'auto' }, // Make buttons full width on mobile
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No todos available
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default Todos;
