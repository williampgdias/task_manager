import React from 'react';
import styles from './Task.module.css';

const Task = ({
    task,
    toggleComplete,
    removeTask,
    editTask,
    moveUp,
    moveDown,
}) => {
    return (
        <li className={styles.taskItem}>
            <div
                className={`${styles.check} ${
                    task.completed ? styles.completed : ''
                }`}
                onClick={toggleComplete}
            ></div>
            <label
                className={`${styles.task} ${
                    task.completed ? styles.completed : ''
                }`}
            >
                {task.text}
            </label>
            <div>
                <button className={styles.edit} onClick={editTask}>
                    Edit
                </button>
                <button className={styles.remove} onClick={removeTask}>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;
