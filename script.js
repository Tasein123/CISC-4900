document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('priority'); // Add this line to capture the priority dropdown menu

    // Load tasks from local storage when the page loads
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks from local storage
    renderTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value; // Get the selected priority value
        if (taskText !== '') {
            addTask(taskText, priority); // Pass the priority value when adding a task
            saveTasksToLocalStorage();
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    function addTask(taskText, priority) {
        tasks.push({ text: taskText, priority: priority }); // Store task with priority information
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.text} - Priority: ${task.priority}`; // Display task text and priority
            const deleteButton = document.createElement('span');
            deleteButton.textContent = ' ❌';
            deleteButton.classList.add('task-delete');
            deleteButton.addEventListener('click', function() {
                tasks = tasks.filter(t => t.text !== task.text); // Remove task from tasks array
                renderTasks();
                saveTasksToLocalStorage();
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
