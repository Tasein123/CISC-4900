document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('priority'); 

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value; 
        if (taskText !== '') {
            addTask(taskText, priority);
            saveTasksToLocalStorage();
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    function addTask(taskText, priority) {
        tasks.push({ text: taskText, priority: priority }); 
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.text} - Priority: ${task.priority}`; 
            const deleteButton = document.createElement('span');
            deleteButton.textContent = ' ❌';
            deleteButton.classList.add('task-delete');
            deleteButton.addEventListener('click', function() {
                tasks = tasks.filter(t => t.text !== task.text); 
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
