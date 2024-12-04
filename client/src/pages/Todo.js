import axios from 'axios';

// Axios instance configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use .env variable for base URL
});

// Interceptor to add token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Export API functions
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const fetchTodos = () => API.get('/todos');
export const addTodo = (data) => API.post('/todos', data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`, { data: { id } });
