import React from 'react';

// Import components
import Task from '../Task/Task';

// Import CSS
import styles from './TaskList.module.css';

const TaskList = ({ tasks, toggleComplete, removeTask, editTask }) => {
    return (
        <div className={styles.wrapperList}>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        task={task}
                        toggleComplete={() => toggleComplete(index)}
                        removeTask={() => removeTask(index)}
                        editTask={() => editTask(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
