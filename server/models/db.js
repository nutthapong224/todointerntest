import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool with a limit of 5 simultaneous connections
export const pool = mariadb.createPool({
  host: process.env.DB_HOST,        // Database host
  user: process.env.DB_USER,        // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME,    // Database name
  connectionLimit: 10,     
  bigNumberStrings: true, 
  charset: 'utf8mb4' 
});

// Establish a database connection and verify it
export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();  // Get a connection from the pool
    console.log('Database connected');        // Log successful connection
    conn.release();                           // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', error); // Log any connection errors
    process.exit(1); // Exit the process if database connection fails
  }
};
