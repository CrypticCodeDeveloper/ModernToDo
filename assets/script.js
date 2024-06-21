//
const allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
const mode = JSON.parse(localStorage.getItem("mode")) || "lightMode";
const todoForm = document.getElementById("add-task-form");
const taskInput = todoForm.input;
// create date object
const date = new Date();
// Get today's date in
const today = new Date().toISOString().split("T")[0];
// Set the min attribute of the date input to today
document.getElementById("date").setAttribute("min", today);

// render all tasks on document loaded
document.addEventListener("DOMContentLoaded", () => {
  renderTasks(allTasks);
});

//  render all tasks
function renderTasks(allTasks) {
  // load mode
  if (mode === "darkMode") {
    document.getElementById("mode-icon").src =
      "./assets/icons/dark_mode_icon.png";
    // check if body does not have dark mode
    if (!document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode");
    }
  } else {
    document.getElementById("mode-icon").src =
      "./assets/icons/light_mode_icon.png";
    // check if body have dark mode and remove dark mode
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
    }
  }

  // only render if there are objects in the Alltasks array
  if (allTasks.length > 0) {
    const html = allTasks.map((task) => {
      // status to check or uncheck checkbox onload
      let status;

      if (task.isDone === true) {
        status = "checked";
      } else {
        status = null;
      }

      return `
            <div class="wrapper">
              <div
               style="display:flex; align-items:center; gap:10px">
              <img src="./assets/icons/info.png" width="15px" height-"15px" style="display:inline;" />
              <span class="due""> ${task.dueDate} </span>
              </div>
                <div class="task">
                <!-- check box -->
               <div class="checkbox-wrapper-43">
                  <input 
                  type="checkbox" 
                  id="${task.id}" 
                  name="checkbox" 
                  ${status} 
                  data-taskId = "${task.id}"
                   onClick = "setTimeout(() => {checkTask(Number(this.dataset.taskid), this.checked)}, 210);" />
                   
                  <label for="${task.id}" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                </div>

                <label 
                for="${task.id}" 
                style='text-decoration: ${
                  task.isDone === false ? "none" : "line-through"
                }; 
                font-family: "Playwrite NZ"'>${task.context}
                </label>
                <img
                 src="./assets/icons/delete.png" 
                 data-taskId="${task.id}" 
                  width="20px" height="20px" 
                  id="delete" 
                  onClick="deleteTask(Number(this.dataset.taskid))" />
                  
                </div>
            </div>
      
            `;
    });

    // push the html to the DOM
    document.querySelector(".tasks-wrapper").innerHTML = html.join("");
  }
}

// Check task
function checkTask(id, value) {
  let currentTask = allTasks.filter((task) => task.id === id);
  currentTask = currentTask[0]; // Accessing the current task in the array

  //   check if box is checked to update task status
  if (value === true) {
    currentTask.isDone = true;
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    renderTasks(allTasks);
  } else if (value === false) {
    currentTask.isDone = false;
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    renderTasks(allTasks);
  }
}

// delete note
function deleteTask(id) {
  const filteredTasks = allTasks.filter((task) => {
    return task.id != id;
  });
  localStorage.setItem("allTasks", JSON.stringify(filteredTasks));
  window.location.reload();
}

// delete all notes
function deleteAll() {
  localStorage.setItem("allTasks", JSON.stringify([]));
  renderTasks(allTasks);
  window.location.reload();
}
// When form is submitted
todoForm.submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //   check for task due date to return due date if there is an input
  let taskdue;

  //   return due date based on input
  if (document.getElementById("date").value === "") {
    taskdue = `Added on ${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + Number(date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  } else {
    taskdue = `Added on ${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + Number(date.getMonth() + 1)
        : date.getMonth() + 1
    }-${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    } and due on ${document.getElementById("date").value}`;
  }

  if (taskInput.value.trim() === "") {
    alert("Please input a task");
  } else {
    // create a task object
    const taskObject = {
      context: taskInput.value,
      id: Math.floor(Math.random() * 10000000), // random Id
      isDone: false,
      dueDate: taskdue,
    };
    // Push the task object to the allTasks array
    allTasks.push(taskObject);

    // store allTasks to the local storage
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    // display all notes
    renderTasks(allTasks);
    taskInput.value = "";
    document.getElementById("date").value = "";
  }
});

// light-mode/dark-mode switch

function switchMode() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", JSON.stringify("darkMode"));
    document.getElementById("mode-icon").src =
      "./assets/icons/dark_mode_icon.png";
  } else {
    localStorage.setItem("mode", JSON.stringify("lightMode"));
    document.getElementById("mode-icon").src =
      "./assets/icons/light_mode_icon.png";
  }
}
