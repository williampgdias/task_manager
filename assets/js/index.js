document.addEventListener('DOMContentLoaded', function () {
    const inputTask = document.getElementById('inputTask');
    const taskList = document.getElementById('list');
    const allButton = document.getElementById('all');
    const ongoingButton = document.getElementById('ongoing');
    const completedButton = document.getElementById('completed');

    const filterTasks = (condition) => {
        Array.from(taskList.children).forEach((task) => {
            task.style.display = condition(task) ? '' : 'none';
        });
    };

    allButton.addEventListener('click', () => filterTasks(() => true));
    ongoingButton.addEventListener('click', () =>
        filterTasks(
            (task) =>
                !task.querySelector('.check').classList.contains('completed')
        )
    );
    completedButton.addEventListener('click', () =>
        filterTasks((task) =>
            task.querySelector('.check').classList.contains('completed')
        )
    );

    const createTaskElement = (text, completed = false) => {
        const newTask = document.createElement('li');
        const checkDiv = document.createElement('div');
        checkDiv.classList.add('check');
        const taskLabel = document.createElement('label');
        taskLabel.textContent = text;
        taskLabel.classList.add('task');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.classList.add('remove');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');

        // Add move up and move down buttons
        const moveDownButton = document.createElement('button');
        moveDownButton.textContent = 'Move Down';
        moveDownButton.classList.add('move-down');

        const moveUpButton = document.createElement('button');
        moveUpButton.textContent = 'Move Up';
        moveUpButton.classList.add('move-up');

        // Move task up
        // Move task down
        moveDownButton.addEventListener('click', () => {
            if (newTask.nextElementSibling) {
                taskList.insertBefore(newTask.nextElementSibling, newTask);
                saveTasksToLocalStorage();
            }
        });

        moveUpButton.addEventListener('click', () => {
            if (newTask.previousElementSibling) {
                taskList.insertBefore(newTask, newTask.previousElementSibling);
                saveTasksToLocalStorage();
            }
        });

        removeButton.addEventListener('click', () => {
            taskList.removeChild(newTask);
            saveTasksToLocalStorage();
        });

        editButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskLabel.textContent;
            newTask.replaceChild(input, taskLabel);
            input.focus();
            input.addEventListener('blur', () => {
                taskLabel.textContent = input.value;
                newTask.replaceChild(taskLabel, input);
                saveTasksToLocalStorage();
            });
        });

        checkDiv.addEventListener('click', () => {
            const completed = taskLabel.classList.toggle('completed');
            checkDiv.classList.toggle('completed');
            newTask.style.backgroundColor = completed ? '#323b5c' : '';
            checkDiv.style.backgroundColor = completed ? '#171d37' : '';
            saveTasksToLocalStorage();
        });

        newTask.append(
            checkDiv,
            taskLabel,
            removeButton,
            editButton,
            moveUpButton,
            moveDownButton
        );
        taskList.appendChild(newTask);

        if (completed) {
            taskLabel.classList.add('completed');
            checkDiv.classList.add('completed');
            newTask.style.backgroundColor = '#323b5c';
            checkDiv.style.backgroundColor = '#171d37';
        }
    };

    const addTask = () => {
        const taskText = inputTask.value;
        if (taskText !== '') {
            createTaskElement(taskText);
            inputTask.value = '';
            saveTasksToLocalStorage();
        }
    };

    const saveTasksToLocalStorage = () => {
        const tasks = Array.from(taskList.children).map((li) => ({
            text: li.querySelector('label').textContent,
            completed: li
                .querySelector('label')
                .classList.contains('completed'),
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => createTaskElement(task.text, task.completed));
    };

    loadTasksFromLocalStorage();
    inputTask.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
