import { pool } from './db.js';

export const createTodo = async (title, description, status, userId) => {
  try {
    const result = await pool.query('INSERT INTO todos (title, description, status, user_id) VALUES (?, ?, ?, ?)', [title, description, status, userId]);
    const todoId = result.insertId;  // `insertId` is usually a BigInt

    // Convert the BigInt to a string or number
    return todoId.toString();  // Return as string (you can also use `Number(todoId)` if you prefer a number)
  } catch (error) {
    console.error('Error in createTodo function:', error);
    throw new Error('Error creating todo in database');
  }
};



export const getTodosByUserId = async (userId) => {
  try {
    // Query to fetch todos by userId
    const result = await pool.query('SELECT id, title, description, status FROM todos WHERE user_id = ?', [userId]);

    // Return the result from the database
    return result;
  } catch (error) {
    console.error('Error fetching todos by user ID:', error);
    throw new Error('Error fetching todos');
  }
};

export const updateTodoStatus = async (id, userId, status, title, description) => {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Prepare the SQL query to update the todo's status, title, and description
    const query = `
      UPDATE todos 
      SET status = ?, title = ?, description = ? 
      WHERE id = ? AND user_id = ?
    `;

    // Execute the update query
    const result = await connection.query(query, [status, title, description, id, userId]);

    return result; // The result will contain information about the number of affected rows
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};


export const deleteTodoModel = async (todoId, userId) => {
  try {
    const conn = await pool.getConnection(); // Get a connection from the pool
    const result = await conn.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [todoId, userId] // These values will be injected into the query
    );
    conn.release(); // Release the connection back to the pool

    // If no rows were affected, return 0 (no todo found or not owned by the user)
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Error deleting todo');
  }
};

