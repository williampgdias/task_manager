document.addEventListener('DOMContentLoaded', function () {
    // Get elements from the page
    const inputTask = document.getElementById('inputTask');
    const taskList = document.getElementById('list');

    // Function to create a new task element
    function createTaskElement(text) {
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
        });

        // Append elements to the new task
        newTask.appendChild(checkDiv);
        newTask.appendChild(taskLabel);
        newTask.appendChild(removeButton);

        // Append the new task to the task list
        taskList.appendChild(newTask);
    }

    // Function to add a new task
    function addTask() {
        const taskText = inputTask.value;

        if (taskText !== '') {
            createTaskElement(taskText);
            inputTask.value = ''; // Clear input field
        }
    }

    // Add task when pressing Enter key
    inputTask.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
