document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('priority'); 
    const feedbackContainer = document.createElement('div'); 

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value; 
        if (taskText !== '') {
            addTask(taskText, priority);
            saveTasksToLocalStorage();
            taskInput.value = '';
            showFeedbackMessage('Task added successfully!', 'success');
        } else {
            showFeedbackMessage('Please enter a task!', 'error');
        }
    });

    function addTask(taskText, priority) {
        tasks.push({ text: taskText, priority: priority, completed: false }); 
        renderTasks();
    }

    function renderTasks() {
        tasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        taskList.innerHTML = '';
        tasks.forEach((task, index) => { // Use the index of the forEach loop
            const li = document.createElement('li');
            li.classList.add('task-item');
            
            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = `${task.text} - `;
            
            // Apply priority class based on task.priority
            li.classList.add(task.priority + '-priority'); // Simplified priority class addition
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'task-' + index; // Use index to create a unique ID
            checkbox.checked = task.completed;
    
            const label = document.createElement('label');
            label.htmlFor = 'task-' + index;
    
            li.appendChild(checkbox);
            li.appendChild(label); // Append label after checkbox
            
            const deleteButton = document.createElement('span');
            deleteButton.innerHTML = ' ❌';
            deleteButton.classList.add('task-delete');
            deleteButton.addEventListener('click', function() {
                tasks = tasks.filter((_, taskIndex) => taskIndex !== index); // Use index to filter out the task
                renderTasks();
                saveTasksToLocalStorage();
                showFeedbackMessage('Task deleted successfully!', 'success');
            });
    
            li.appendChild(taskTextElement); // Ensure taskTextElement is appended to li
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
    

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function showFeedbackMessage(message, type) {
        feedbackContainer.textContent = message;
        feedbackContainer.classList.add('feedback', type); 
        if (type === 'success') {
            feedbackContainer.style.color = 'green';
        } else if (type === 'error') {
            feedbackContainer.style.color = 'red';
        }
        const container = document.querySelector('.container');
        container.appendChild(feedbackContainer);
        setTimeout(() => {
            feedbackContainer.remove();
        }, 3000);
    }
});
