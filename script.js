function saveTask(event) {
    event.preventDefault();
    const task = {
        name: document.getElementById('task-name').value,
        importance: document.getElementById('importance').value,
        urgency: document.getElementById('urgency').value,
        ease: document.getElementById('ease').value,
        motivation: document.getElementById('motivation').value,
        timeInterval: document.getElementById('time-interval').value
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('task-form').reset();
    displayTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tableBody = document.getElementById('tasks-table-body');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        for (const key in task) {
            const cell = document.createElement('td');
            cell.textContent = task[key];
            row.appendChild(cell);
        }

        // Добавляем кнопку удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTask(index));

        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayTasks);

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Сортируем задачи по важности в порядке убывания
    tasks.sort((a, b) => b.importance - a.importance);

    const tableBody = document.getElementById('tasks-table-body');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        for (const key in task) {
            const cell = document.createElement('td');
            cell.textContent = task[key];
            row.appendChild(cell);
        }

        // Добавляем кнопку удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTask(index));

        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayTasks);
