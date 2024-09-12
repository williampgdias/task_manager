// Get elements from the page
const inputTask = document.getElementById('new-task');
const btnAdd = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Get filter buttons
const filterAll = document.getElementById('filter-all');
const filterCompleted = document.getElementById('filter-completed');
const filterPending = document.getElementById('filter-pending');

// Reusable Functions
function createElement(newElement, text, newClass) {
    const element = document.createElement(newElement);
    element.textContent = text;
    element.classList.add(newClass);

    return element;
}

function appendButtons(variable01, variable02) {
    variable01.appendChild(variable02);
}

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
    const btnComplete = createElement('button', 'Complete', 'complete');
    const btnRemove = createElement('button', 'Remove', 'remove');

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
    appendButtons(btnContainer, btnComplete);
    appendButtons(btnContainer, btnRemove);

    // Append the task text and the button container to the task item
    appendButtons(newTask, taskSpan);
    appendButtons(newTask, btnContainer);
    appendButtons(taskList, newTask);
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

// Filter Functions
const filterFunctions = {
    all: () => true,
    completed: (task) =>
        task.querySelector('span').classList.contains('completed'),
    pending: (task) =>
        !task.querySelector('span').classList.contains('completed'),
};

// Function to filter tasks
function filterTasks(filter) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach((task) => {
        task.style.display = filterFunctions[filter](task) ? 'flex' : 'none';
    });
}

// Add event listeners to a filter button
function addFilterEventListener(button, filter) {
    button.addEventListener('click', () => filterTasks(filter));
}

// Add event listeners for filter buttons
addFilterEventListener(filterAll, 'all');
addFilterEventListener(filterCompleted, 'completed');
addFilterEventListener(filterPending, 'pending');

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
