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
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            
            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = `${task.text} - `;
    
            let priorityIndicator = '';
            switch (task.priority) {
                case 'high':
                    priorityIndicator = '!!!';
                    taskTextElement.style.color = 'maroon'; 
                    break;
                case 'medium':
                    priorityIndicator = '!!';
                    taskTextElement.style.color = 'navy'; 
                    break;
                case 'low':
                    priorityIndicator = '!';
                    taskTextElement.style.color = 'green'; 
                    break;
                default:
                    break;
            }
            taskTextElement.textContent += priorityIndicator;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                task.completed = checkbox.checked;
                renderTasks();
                saveTasksToLocalStorage();
            });

            li.appendChild(checkbox);
            li.appendChild(taskTextElement);

            const deleteButton = document.createElement('span');
            deleteButton.textContent = ' ❌';
            deleteButton.classList.add('task-delete');
            deleteButton.addEventListener('click', function() {
                tasks = tasks.filter(t => t.text !== task.text); 
                renderTasks();
                saveTasksToLocalStorage();
                showFeedbackMessage('Task deleted successfully!', 'success');
            });

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
