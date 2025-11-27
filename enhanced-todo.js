// Select DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const searchInput = document.getElementById("search");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage or create empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ---------------------------
// Save tasks to localStorage
// ---------------------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ---------------------------
// Create a task element (li)
// ---------------------------
function createTaskElement(task) {
    const li = document.createElement("li");

    // Apply completed style
    if (task.completed) {
        li.style.textDecoration = "line-through";
        li.style.color = "green";
    }

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.style.marginLeft = "10px";

    completeBtn.addEventListener("click", function () {
        task.completed = !task.completed;  // Toggle complete
        saveTasks();
        renderTasks(tasks);  // Refresh UI
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", function () {
        tasks = tasks.filter(t => t.id !== task.id); // Remove task
        saveTasks();
        renderTasks(tasks);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}


// ---------------------------
// Render tasks in the UL
// ---------------------------
function renderTasks(taskArray) {
    taskList.innerHTML = ""; // Clear old list

    taskArray.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}


// ---------------------------
// Add task
// ---------------------------
addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),  // Unique ID
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(tasks);

    taskInput.value = ""; // Clear input
});


// ---------------------------
// Search tasks in real time
// ---------------------------
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(query)
    );

    renderTasks(filtered);
});


// ---------------------------
// Load tasks on page load
// ---------------------------
renderTasks(tasks);
