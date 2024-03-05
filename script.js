document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page loads
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks from local storage
    tasks.forEach(taskText => addTask(taskText));

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasksToLocalStorage();
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = ' ❌';
        deleteButton.classList.add('task-delete');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(Array.from(taskList.children).map(li => li.textContent)));
    }

    function removeTaskFromLocalStorage(taskText) {
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
