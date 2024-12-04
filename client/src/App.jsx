import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';
import NavBar from './pages/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import TodoDetail from './pages/Tododetail';
import EditTodo from './pages/Edittodo';
// Create a theme
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />

              </ProtectedRoute>
            }
          />
          <Route path="/todo-details/:id" element={
            <ProtectedRoute>
              <TodoDetail />

            </ProtectedRoute>
          } />

          <Route path="/edit-todo/:id" element={
            <ProtectedRoute>
              <EditTodo />

            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
