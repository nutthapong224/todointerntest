import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './db.js';

// Function to create a new user in the database
export const createUser = async (email, password, fname, lname) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)',
      [email, password, fname, lname]
    );
    return result.insertId; // Return the ID of the created user
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Function to find user by email to check if they already exist
export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return result[0];  // Return the first user if found
  } catch (error) {
    throw new Error('Error fetching user by email');
  }
};

// Registration function to handle user sign up
export const register = async (req, res) => {
  const { email, password, fname, lname } = req.body;

  try {
    // Check if the user already exists by email
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

    // Create the user in the database with the hashed password
    const userId = await createUser(email, hashedPassword, fname, lname);

    // Create a JWT token for the user
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the JWT token
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
