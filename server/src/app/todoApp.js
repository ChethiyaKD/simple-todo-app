const validateForm = require('../utils/validateForm');

const { createTodoSchema, updateTodoSchema } = require('../schemas/todoSchema');
const TaskModel = require('../models/task');

const getAllTodo = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'User not found' });

        const todos = await TaskModel.find({ user: user._id });
        if (!todos) return res.status(404).json({ message: 'Todos not found' });

        res.status(200).json({ message: 'Todos fetched successfully', data: todos.map(todo => ({ title: todo.title, description: todo.description, completed: todo.done, id: todo._id })) });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'User not found' });

        const error = validateForm(req.body, createTodoSchema);
        if (error) return res.status(400).json({ message: error });

        const { title, description } = req.body;

        const task = new TaskModel({
            title,
            description,
            user: user._id
        });

        await task.save();
        res.status(201).json({ message: 'Todo created successfully', data: task });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const error = validateForm(req.body, updateTodoSchema);
        if (error) return res.status(400).json({ message: error });

        const { title, description } = req.body;

        const task = await TaskModel.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!task) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ message: 'Todo updated successfully', data: task });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
};

const patchTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Todo ID is required' });

        const currentTask = await TaskModel.findById(id);
        if (!currentTask) return res.status(404).json({ message: 'Todo not found' });

        const task = await TaskModel.findByIdAndUpdate(id, { done: !currentTask.done }, { new: true });
        if (!task) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ message: 'Todo updated successfully', data: task });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Todo ID is required' });

        const task = await TaskModel.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ message: 'Todo deleted successfully', data: task });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    patchTodo,
    deleteTodo
};
