// Array para almacenar las tareas
var tasks = [];

// Función para agregar una tarea
function addTask() {
    var taskText = document.getElementById('new-task-input').value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
        document.getElementById('new-task-input').value = '';
    }
}

// Función para completar una tarea
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Función para renderizar la lista de tareas
function renderTasks(filteredTasks) {
    var taskList = document.getElementById('task-list');

    taskList.innerHTML = '';
    
    var tasksToRender = filteredTasks || tasks;

    // Iterar sobre cada tarea en las tareas a renderizar
    tasksToRender.forEach(function (task, index) {
        // Crear un elemento para representar la tarea
        var taskItem = document.createElement('li');
        // Establecer el texto de la tarea en el elemento
        taskItem.textContent = task.text;

        // Crear un contenedor para los iconos
        var iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');

        // Crear un elemento para el icono de completado
        var completeIcon = document.createElement('i');
        completeIcon.className = 'fas fa-check';
        // Si la tarea está completada, ocultar el icono de completado
        if (task.completed) {
            completeIcon.style.display = 'none';
        }
        // Agregar un controlador de evento de clic para marcar la tarea como completada
        completeIcon.addEventListener('click', function () {
            completeTask(index);
        });

        // Crear un elemento para el icono de eliminación
        var deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash';
        // Agregar un controlador de evento de clic para eliminar la tarea
        deleteIcon.addEventListener('click', function () {
            deleteTask(index);
        });

        // Agregar los iconos al contenedor de iconos
        iconsContainer.appendChild(completeIcon);
        iconsContainer.appendChild(deleteIcon);

        // Agregar el contenedor de iconos al elemento que representa la tarea
        taskItem.appendChild(iconsContainer);

        // Si la tarea está completada, agregar la clase 'completed' al elemento
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Agregar el elemento al contenedor de la lista de tareas
        taskList.appendChild(taskItem);
    });
}



// Agregar un evento de clic al botón de agregar tarea
document.getElementById('add-task-button').addEventListener('click', addTask);

// Agregar un evento de cambio al select para filtrar tareas
document.getElementById('task-filter').addEventListener('change', function () {
    var selectedFilter = this.value;
    var filteredTasks = [];

    if (selectedFilter === 'complet') {
        // Filtra las tareas completadas
        filteredTasks = tasks.filter(task => task.completed);
    } else if (selectedFilter === 'pend') {
        // Filtra las tareas pendientes
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        // todas las tareas
        filteredTasks = tasks;
    }

    // Renderiza las tareas filtradas
    renderTasks(filteredTasks);
});

// Inicializa la lista de tareas al cargar la página
renderTasks();