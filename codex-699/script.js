const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", addTask);

// 页面打开时，把以前保存的任务重新显示出来
renderTasks();
const durationInput = document.getElementById("durationInput");

function addTask() 
const duration = Number(durationInput.value);{
    const taskName = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskName === "") {
    alert("Please enter a task.");
    return;
}

if (duration <= 0 || isNaN(duration)) {
    alert("Please enter the estimated time.");
    return;
}
    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const newTask = document.createElement("li");

        if (task.completed) {
            newTask.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = `${task.name} — ${task.priority}`;

        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";

        completeButton.addEventListener("click", function () {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        newTask.appendChild(taskText);
        newTask.appendChild(completeButton);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
    });
}

function toggleTask(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}