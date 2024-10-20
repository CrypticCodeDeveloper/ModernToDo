// Load tasks and mode from local storage
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
let mode = JSON.parse(localStorage.getItem("mode")) || "lightMode";

const todoForm = document.getElementById("add-task-form");
const taskInput = todoForm.input;
const dateInput = document.getElementById("date");

// Create date object
const today = new Date().toISOString().split("T")[0];
// Set the min attribute of the date input to today
dateInput.setAttribute("min", today);

// Render all tasks on document load
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

// Render all tasks
function renderTasks() {
  // Load mode
  if (mode === "darkMode") {
    document.getElementById("mode-icon").src = "./assets/icons/dark_mode_icon.png";
    document.body.classList.add("dark-mode");
  } else {
    document.getElementById("mode-icon").src = "./assets/icons/light_mode_icon.png";
    document.body.classList.remove("dark-mode");
  }

  // Render tasks
  if (allTasks.length > 0) {
    const html = allTasks.map((task) => {
      const status = task.isDone ? "checked" : "";

      return `
        <div class="wrapper">
          <div style="display:flex; align-items:center; gap:10px">
            <img src="./assets/icons/info.png" width="15px" height="15px" style="display:inline;" />
            <span class="due">${task.dueDate}</span>
          </div>
          <div class="task">
            <div class="checkbox-wrapper-43">
              <input 
                type="checkbox" 
                id="${task.id}" 
                name="checkbox" 
                ${status} 
                data-taskId="${task.id}" 
                onClick="setTimeout(() => { checkTask(Number(this.dataset.taskid), this.checked) }, 210);" />
              <label for="${task.id}" class="check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
            </div>
            <label 
              for="${task.id}" 
              style='text-decoration: ${task.isDone ? "line-through" : "none"}; font-family: "Playwrite NZ"'>
              ${task.context}
            </label>
            <img
              src="./assets/icons/delete.png" 
              data-taskId="${task.id}" 
              width="20px" height="20px" 
              onClick="deleteTask(Number(this.dataset.taskId))" />
          </div>
        </div>
      `;
    });

    // Push the html to the DOM
    document.querySelector(".tasks-wrapper").innerHTML = html.join("");
  }
}

// Check task
function checkTask(id, value) {
  const currentTask = allTasks.find(task => task.id === id);
  if (currentTask) {
    currentTask.isDone = value;
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  allTasks = allTasks.filter(task => task.id !== id);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  document.querySelector('.tasks-wrapper').innerHTML = `
    <div class="no-task-container">
          <img
            src="./assets/images/No-tasks.png"
            alt=""
            width="100px"
            id="no-tasks"
          />
          <h2>No tasks has been added</h2>
        </div>
  `
  renderTasks();
}

// Delete all tasks
function deleteAll() {
  allTasks = [];
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  renderTasks();
}

// When form is submitted
todoForm.submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let taskdue = document.getElementById("date").value === ""
    ? `Added on ${new Date().toLocaleDateString()}`
    : `Added on ${new Date().toLocaleDateString()} and due on ${dateInput.value}`;

  if (taskInput.value.trim() === "") {
    alert("Please input a task");
  } else {
    const taskObject = {
      context: taskInput.value,
      id: Math.floor(Math.random() * 10000000), // Random ID
      isDone: false,
      dueDate: taskdue,
    };
    
    // Push the task object to the allTasks array
    allTasks.push(taskObject);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    // Display all tasks
    renderTasks();
    taskInput.value = "";
    dateInput.value = "";
  }
});

// Light-mode/dark-mode switch
function switchMode() {
  document.body.classList.toggle("dark-mode");
  mode = document.body.classList.contains("dark-mode") ? "darkMode" : "lightMode";
  localStorage.setItem("mode", JSON.stringify(mode));
  document.getElementById("mode-icon").src = mode === "darkMode" 
    ? "./assets/icons/dark_mode_icon.png" 
    : "./assets/icons/light_mode_icon.png";
}

// Event listener for mode switch (add a button or something to trigger this)
document.getElementById("mode-toggle-btn").addEventListener("click", switchMode);
