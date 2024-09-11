// Get elements from the page
const inputTask = document.getElementById('new-task');
const btnAdd = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
    const taskText = inputTask.value;

    if (taskText !== '') {
        const newTask = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create a div to hold the buttons
        const btnContainer = document.createElement('div');

        const btnComplete = document.createElement('button');
        btnComplete.textContent = 'Complete';
        btnComplete.classList.add('completed');

        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Remove';
        btnRemove.classList.add('remove');

        // Mark task as complete
        btnComplete.addEventListener('click', function () {
            taskSpan.classList.toggle('completed');
        });

        // Remove task
        btnRemove.addEventListener('click', function () {
            taskList.removeChild(newTask);
        });

        // Append buttons to the button container
        btnContainer.appendChild(btnComplete);
        btnContainer.appendChild(btnRemove);

        // Append the task text and the button container to the task item
        newTask.appendChild(taskSpan);
        newTask.appendChild(btnContainer);
        taskList.appendChild(newTask);

        inputTask.value = ''; // Clear input field
    }
}

// Add task when clicking the "Add" button
btnAdd.addEventListener('click', addTask);

// Add task when pressing Enter key
inputTask.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
