// taskService.js
const { db } = require('./config/database');
const { v4: uuidv4 } = require('uuid');

const TaskService = {
    createTask: async (taskData) => {
        try {
            const id = uuidv4();
            const originalTime = typeof taskData.original_time === 'number' ? taskData.original_time : 0;
            const remainingTime = typeof taskData.remaining_time === 'number'
                ? taskData.remaining_time
                : originalTime;
            const sql = `
                INSERT INTO tasks (id, text, category_id, priority, original_time, remaining_time, completed)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await db.run(sql, [
                id,
                taskData.text,
                taskData.category_id,
                taskData.priority || 'Medium',
                originalTime,
                remainingTime,
                0
            ]);
            return {
                id,
                text: taskData.text,
                category_id: taskData.category_id,
                priority: taskData.priority || 'Medium',
                original_time: originalTime,
                remaining_time: remainingTime,
                completed: false
            };
        } catch (error) {
            throw new Error(`Failed to create task: ${error.message}`);
        }
    },

    getAllTasks: async () => {
        try {
            const sql = `
                SELECT t.*, c.name as category 
                FROM tasks t
                LEFT JOIN categories c ON t.category_id = c.id
                ORDER BY t.created_at DESC
            `;
            return await db.all(sql);
        } catch (error) {
            throw new Error(`Failed to retrieve tasks: ${error.message}`);
        }
    },

    getTaskById: async (id) => {
        try {
            const sql = `
                SELECT t.*, c.name as category 
                FROM tasks t
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.id = ?
            `;
            return await db.get(sql, [id]);
        } catch (error) {
            throw new Error(`Failed to retrieve task: ${error.message}`);
        }
    },

    updateTask: async (id, updates) => {
        try {
            const fields = [];
            const values = [];
            for (const [key, value] of Object.entries(updates)) {
                if (key !== 'id' && key !== 'created_at') {
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }
            fields.push('updated_at = CURRENT_TIMESTAMP');
            values.push(id);

            const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
            await db.run(sql, values);
            return await TaskService.getTaskById(id);
        } catch (error) {
            throw new Error(`Failed to update task: ${error.message}`);
        }
    },

    toggleTaskCompletion: async (id) => {
        try {
            const task = await TaskService.getTaskById(id);
            if (!task) throw new Error('Task not found');
            const completed = task.completed ? 0 : 1;
            return await TaskService.updateTask(id, { completed });
        } catch (error) {
            throw new Error(`Failed to toggle task completion: ${error.message}`);
        }
    },

    updateTaskTimer: async (id, remaining_time, original_time) => {
        try {
            const updates = {
                remaining_time: remaining_time < 0 ? 0 : remaining_time
            };
            if (typeof original_time === 'number') {
                updates.original_time = original_time;
                if (remaining_time == null) {
                    updates.remaining_time = original_time;
                }
            }
            return await TaskService.updateTask(id, updates);
        } catch (error) {
            throw new Error(`Failed to update task timer: ${error.message}`);
        }
    },

    deleteTask: async (id) => {
        try {
            await db.run('DELETE FROM tasks WHERE id = ?', [id]);
            return { success: true, message: 'Task deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete task: ${error.message}`);
        }
    },

    getTasksByCategory: async (categoryId) => {
        try {
            const sql = `
                SELECT t.*, c.name as category 
                FROM tasks t
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.category_id = ?
                ORDER BY t.created_at DESC
            `;
            return await db.all(sql, [categoryId]);
        } catch (error) {
            throw new Error(`Failed to retrieve tasks by category: ${error.message}`);
        }
    },

    searchTasks: async (query) => {
        try {
            const sql = `
                SELECT t.*, c.name as category 
                FROM tasks t
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.text LIKE ? OR c.name LIKE ?
                ORDER BY t.created_at DESC
            `;
            return await db.all(sql, [`%${query}%`, `%${query}%`]);
        } catch (error) {
            throw new Error(`Failed to search tasks: ${error.message}`);
        }
    },

    getTasksByPriority: async (priority) => {
        try {
            const sql = `
                SELECT t.*, c.name as category 
                FROM tasks t
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.priority = ?
                ORDER BY t.created_at DESC
            `;
            return await db.all(sql, [priority]);
        } catch (error) {
            throw new Error(`Failed to retrieve tasks by priority: ${error.message}`);
        }
    }
};

const CategoryService = {
    createCategory: async (name) => {
        try {
            const id = uuidv4();
            await db.run('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name]);
            return { id, name };
        } catch (error) {
            if (error.message && error.message.includes('UNIQUE')) {
                throw new Error('Category already exists');
            }
            throw new Error(`Failed to create category: ${error.message}`);
        }
    },

    getAllCategories: async () => {
        try {
            const sql = `
                SELECT c.*, COUNT(t.id) as task_count 
                FROM categories c
                LEFT JOIN tasks t ON c.id = t.category_id
                GROUP BY c.id
                ORDER BY c.name
            `;
            return await db.all(sql);
        } catch (error) {
            throw new Error(`Failed to retrieve categories: ${error.message}`);
        }
    },

    getCategoryById: async (id) => {
        try {
            return await db.get('SELECT * FROM categories WHERE id = ?', [id]);
        } catch (error) {
            throw new Error(`Failed to retrieve category: ${error.message}`);
        }
    },

    deleteCategory: async (id) => {
        try {
            await db.run('DELETE FROM categories WHERE id = ?', [id]);
            return { success: true, message: 'Category deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete category: ${error.message}`);
        }
    },

    updateCategory: async (id, name) => {
        try {
            await db.run('UPDATE categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, id]);
            return await CategoryService.getCategoryById(id);
        } catch (error) {
            throw new Error(`Failed to update category: ${error.message}`);
        }
    }
};

module.exports = {
    TaskService,
    CategoryService
};