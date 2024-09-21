import React, { useEffect, useState } from 'react';

// Import CSS
import './App.css';

// Import components
import TaskList from './components/TaskList/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Download tasks from the localStorage
    useEffect(() => {
        const savedTasks = getSavedTasks();
        setTasks(savedTasks);
    }, []);

    // Save tasks to the localStorage
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const getSavedTasks = () => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    };

    // Function to add a new task
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    // Function to tag task as completed
    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    // Function to edit a task
    const editTask = (index) => {
        const updatedTasks = [...tasks];
        const newText = prompt('Edit task', tasks[index].text);
        if (newText) {
            updatedTasks[index].text = newText;
            setTasks(updatedTasks);
        }
    };

    // Function to remove a task
    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Function to add task by pressing Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="todolist">
            <div className="header-container">
                <h1>Task Manager</h1>
            </div>

            <TaskList
                className="task-list"
                tasks={tasks}
                toggleComplete={toggleComplete}
                removeTask={removeTask}
                editTask={editTask}
            />

            <input
                onKeyDown={handleKeyPress}
                id="inputTask"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter your task"
            />
        </div>
    );
};

export default App;
