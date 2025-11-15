import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js';
import { deleteTask, getAllTasks, getTaskById, newTask, updateTask } from '../controllers/task.controller.js';
const taskRouter=express.Router()
taskRouter.post('/create',verifyJWT,newTask);
taskRouter.get('/',verifyJWT,getAllTasks);
taskRouter.get('/:id',verifyJWT,getTaskById);
taskRouter.put('/:id',verifyJWT,updateTask);
taskRouter.delete('/:id',verifyJWT,deleteTask);
export default taskRouter;