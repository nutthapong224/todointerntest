import express from 'express';
import { getTodos, addTodo,updateTodo,deleteTodoController } from '../controllers/todoController.js';
import { authenticate } from '../middlewares/authmiddleware.js';

const router = express.Router();

router.get('/', authenticate, getTodos);
router.post('/', authenticate, addTodo);
router.put('/:id', authenticate, updateTodo);  // Update Todo by ID
router.delete('/:id', authenticate, deleteTodoController);  // Delete Todo by ID
export default router;
