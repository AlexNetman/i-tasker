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


function calculateTaskWeight(task) {
    // Настраиваемые весовые коэффициенты для каждого параметра
    const importanceWeight = 1.0;
    const urgencyWeight = 1.0;
    const easeWeight = 0.5;
    const motivationWeight = 0.5;

    // Вычисляем вес задачи
    const taskWeight =
        task.importance * importanceWeight +
        task.urgency * urgencyWeight +
        task.ease * easeWeight +
        task.motivation * motivationWeight;

    return taskWeight;
}


function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => calculateTaskWeight(b) - calculateTaskWeight(a));

    const tableBody = document.getElementById('tasks-table-body');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        // Добавляем кнопку удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', () => deleteTask(index));

        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = calculateTaskWeight(task).toFixed(2);
        row.appendChild(priorityCell);


        for (const key in task) {
            const cell = document.createElement('td');
            cell.textContent = task[key];
            row.appendChild(cell);
        }



        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayTasks);


//other - user service-worker for PWA app
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker: Registered', registration);
        })
        .catch((error) => {
          console.log('Service Worker: Failed to Register', error);
        });
    });
  }
  
