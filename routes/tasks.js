// routes/tasks.js
const express = require('express');
const router = express.Router();
const { TaskService } = require('../taskService');

// Get all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json({ success: true, data: tasks });
    } catch (error) {
        next(error);
    }
});

// Get task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const task = await TaskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        res.json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

// Create task
router.post('/', async (req, res, next) => {
    try {
        const newTask = await TaskService.createTask(req.body);
        res.status(201).json({ success: true, data: newTask, message: 'Task created successfully' });
    } catch (error) {
        next(error);
    }
});

// Update task
router.put('/:id', async (req, res, next) => {
    try {
        const updatedTask = await TaskService.updateTask(req.params.id, req.body);
        res.json({ success: true, data: updatedTask, message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
});

// Toggle completion status
router.patch('/:id/toggle', async (req, res, next) => {
    try {
        const updatedTask = await TaskService.toggleTaskCompletion(req.params.id);
        res.json({ success: true, data: updatedTask, message: 'Task completion toggled' });
    } catch (error) {
        next(error);
    }
});

// Update task timer
router.patch('/:id/timer', async (req, res, next) => {
    try {
        const { remaining_time, original_time } = req.body;
        const updatedTask = await TaskService.updateTaskTimer(req.params.id, remaining_time, original_time);
        res.json({ success: true, data: updatedTask, message: 'Task timer updated' });
    } catch (error) {
        next(error);
    }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await TaskService.deleteTask(req.params.id);
        res.json({ success: true, data: result, message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;