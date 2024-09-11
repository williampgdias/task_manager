// Get elements from the page
const inputTask = document.getElementById('new-task');
const btnAdd = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Get filter buttons
const filterAll = document.getElementById('filter-all');
const filterCompleted = document.getElementById('filter-completed');
const filterPending = document.getElementById('filter-pending');

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem
            .querySelector('span')
            .classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(text, completed = false) {
    const newTask = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    if (completed) {
        taskSpan.classList.add('completed');
    }

    // Create a div to hold the buttons
    const btnContainer = document.createElement('div');

    const btnComplete = document.createElement('button');
    btnComplete.textContent = 'Complete';
    btnComplete.classList.add('complete');

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';
    btnRemove.classList.add('remove');

    // Mark tas as complete
    btnComplete.addEventListener('click', function () {
        taskSpan.classList.toggle('completed');
        saveTasks(); // Save after toggling
    });

    // Remove Task
    btnRemove.addEventListener('click', function () {
        taskList.removeChild(newTask);
        saveTasks(); // Save after removal
    });

    // Append buttons to the button container
    btnContainer.appendChild(btnComplete);
    btnContainer.appendChild(btnRemove);

    // Append the task text and the button container to the task item
    newTask.appendChild(taskSpan);
    newTask.appendChild(btnContainer);
    taskList.appendChild(newTask);
}

// Function to add a new task
function addTask() {
    const taskText = inputTask.value;

    if (taskText !== '') {
        createTaskElement(taskText);
        inputTask.value = ''; // Clear input field
        saveTasks(); // Save after adding
    }
}

// Filter to filter tasks
function filterTasks(filter) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach((task) => {
        const isCompleted = task
            .querySelector('span')
            .classList.contains('completed');
        if (filter === 'all') {
            task.style.display = 'flex';
        } else if (filter === 'completed') {
            task.style.display = isCompleted ? 'flex' : 'none';
        } else if (filter === 'pending') {
            task.style.display = !isCompleted ? 'flex' : 'none';
        }
    });
}

// Add event listeners for filter buttons
filterAll.addEventListener('click', () => filterTasks('all'));
filterCompleted.addEventListener('click', () => filterTasks('completed'));
filterPending.addEventListener('click', () => filterTasks('pending'));

// Add task when clicking the "Add" button
btnAdd.addEventListener('click', addTask);

// Add task when pressing Enter key
inputTask.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks on page load
window.addEventListener('load', loadTasks);
