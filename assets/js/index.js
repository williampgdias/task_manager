const inputTask = document.getElementById('new-task');
const btnAdd = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
    const taskText = inputTask.value;

    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Remove';
        btnRemove.classList.add('remove');

        // Remove Task
        btnRemove.addEventListener('click', function () {
            taskList.removeChild(newTask);
        });

        newTask.appendChild(btnRemove);
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
