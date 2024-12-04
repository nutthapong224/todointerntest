import { getTodosByUserId, createTodo, updateTodoStatus,  deleteTodoModel } from '../models/todoModel.js';

export const getTodos = async (req, res) => {
  try {
    // Fetch all todos associated with the authenticated user
    const todos = await getTodosByUserId(req.user.id);

    // If no todos are found, send a 404 response
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: 'No todos found for the user' });
    }

    // Send the todos data as JSON response
    res.json(todos);
  } catch (error) {
    // Catch any errors and send a server error response
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addTodo = async (req, res) => {
  const { title, description, status } = req.body;
  console.log('Incoming request data:', { title, description, status });
  console.log('User ID from req.user:', req.user?.id);

  try {
    if (!req.user?.id) {
      return res.status(400).json({ message: 'User is not authenticated' });
    }

    const todoId = await createTodo(title, description, status, req.user.id);
    console.log('Todo created with ID:', todoId);  // The ID is now a string or number
    res.status(201).json({ message: 'Todo added', todoId });  // Send it in the response
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Error adding todo', error: error.message });
  }
};


export const updateTodo = async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameters
  const { status, title, description } = req.body;  // Get other fields from the body

  try {
    // Assuming `updateTodoStatus` can accept the `id` and update other fields (status, title, description)
    const updated = await updateTodoStatus(id, req.user.id, status, title, description);
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Todo not found or not owned by user' });
    }
    
    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Renamed this function to avoid conflict
export const deleteTodoController = async (req, res) => {
  const { id } = req.params; // Use req.params to get the id from the URL parameter

  try {
    // Call the deleteTodoModel function with the id and the user id from the request
    const deleted = await deleteTodoModel(id, req.user.id);

    if (deleted === 0) {
      // If the deleted count is 0, return a 404 message indicating the todo wasn't found or owned by the user
      return res.status(404).json({ message: 'Todo not found or not owned by user' });
    }

    // If successful, return a success message
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    // If there's an error during the process, return a 500 server error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
