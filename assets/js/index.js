document.addEventListener('DOMContentLoaded', function () {
    // Get elements from the page
    const inputTask = document.getElementById('inputTask');
    const taskList = document.getElementById('list');

    // Get filter buttons
    const allButton = document.getElementById('all');
    const ongoingButton = document.getElementById('ongoing');
    const completedButton = document.getElementById('completed');

    // Filter all tasks
    allButton.addEventListener('click', function () {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.display = '';
        }
    });

    // Filter ongoing tasks
    ongoingButton.addEventListener('click', function () {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            if (
                tasks[i].querySelector('.check').classList.contains('completed')
            ) {
                tasks[i].style.display = 'none';
            } else {
                tasks[i].style.display = '';
            }
        }
    });

    // Filter completed tasks
    completedButton.addEventListener('click', function () {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            if (
                !tasks[i]
                    .querySelector('.check')
                    .classList.contains('completed')
            ) {
                tasks[i].style.display = 'none';
            } else {
                tasks[i].style.display = '';
            }
        }
    });

    // Function to create a new task element
    function createTaskElement(text, completed = false) {
        const newTask = document.createElement('li');

        const checkDiv = document.createElement('div');
        checkDiv.classList.add('check');

        const taskLabel = document.createElement('label');
        taskLabel.textContent = text;
        taskLabel.classList.add('task');

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');

        // Remove Task
        removeButton.addEventListener('click', function () {
            taskList.removeChild(newTask);
            saveTasksToLocalStorage();
        });

        // Mark task as completed
        checkDiv.addEventListener('click', function () {
            taskLabel.classList.toggle('completed');
            checkDiv.classList.toggle('completed');

            if (checkDiv.classList.contains('completed')) {
                newTask.style.backgroundColor = '#323b5c';
                checkDiv.style.backgroundColor = '#171d37';
            } else {
                newTask.style.backgroundColor = '';
                checkDiv.style.backgroundColor = '';
            }
            saveTasksToLocalStorage();
        });

        // Append elements to the new task
        newTask.appendChild(checkDiv);
        newTask.appendChild(taskLabel);
        newTask.appendChild(removeButton);

        // Append the new task to the task list
        taskList.appendChild(newTask);

        if (completed) {
            taskLabel.classList.add('completed');
            checkDiv.classList.add('completed');
            newTask.style.backgroundColor = '#323b5c';
            checkDiv.style.backgroundColor = '#171d37';
        }
    }

    // Function to add a new task
    function addTask() {
        const taskText = inputTask.value;

        if (taskText !== '') {
            createTaskElement(taskText);
            inputTask.value = ''; // Clear input field
            saveTasksToLocalStorage();
        }
    }

    // Function to save tasks to localStorage
    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.children).map((li) => {
            return {
                text: li.querySelector('label').textContent,
                completed: li
                    .querySelector('label')
                    .classList.contains('completed'),
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Load tasks from localStorage
    loadTasksFromLocalStorage();

    // Add task when pressing Enter key
    inputTask.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
