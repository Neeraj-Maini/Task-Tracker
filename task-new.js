// Initial categories for tasks
const categories = {
  backlog: [
    {
      taskName: "TS-1305: Create Dashboard",
      taskDescription:
        "To create a visually appealing dashboard with api's endpoint integration.",
      dueDate: "2024-02-10",
      totalHours: "10",
    },
  ],
  selected: [
    {
      taskName: "TS-1306: Create Home Page",
      taskDescription:
        "To create a home page which consists of courosel of images and a sticky header.",
      dueDate: "2024-02-11",
      totalHours: "20",
    },
  ],
  running: [
    {
      taskName: "TS-1307: Create Landing page",
      taskDescription:
        "To create a landing page which consists of starter tiles to be displayed for the user.",
      dueDate: "2024-02-15",
      totalHours: "15",
    },
  ],
  inReview: [
    {
      taskName: "TS-1308: Create about page",
      taskDescription:
        "Create a about page which consist of information about the organization.",
      dueDate: "2024-02-30",
      totalHours: "25",
    },
  ],
  done: [
    {
      taskName: "TS-1309: Create Contact us page",
      taskDescription:
        "Create a contact us page which consists of contact information related to organization.",
      dueDate: "2024-02-03",
      totalHours: "30",
    },
  ],
};

// Data structure to hold deleted tasks
const deletedTask = [];
let showDeletedTaskContainer = false;
// Data structure to hold raw task data
const rawData = {
  task: [],
};
// Variable to track the current category being viewed
let presentCategory = "backlog";

// DOM elements
const addTaskBtn = document.getElementById("addTaskBtn");
const showDeletedTask = document.getElementById("deleteTaskBtn");
const taskForm = document.getElementById("taskForm");
const taskModal = new bootstrap.Modal(document.getElementById("taskModal"));

// Show task modal when "Add Task" button is clicked
addTaskBtn.addEventListener("click", () => {
  taskModal.show();
});

// Toggle deleted item div when "Show Deleted Task" button is clicked
showDeletedTask.addEventListener("click", () => {
  toggleDeleteItemDiv();
});

// Handle form submission to add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const dueDate = document.getElementById("dueDate").value;
  const totalHours = document.getElementById("totalHours").value;

  // Create new task object
  const task = { taskName, taskDescription, dueDate, totalHours };

  // Add task to categories and raw data
  categories[presentCategory].push(task);
  rawData.task.push(task);

  // Render tasks, hide modal, and reset form
  renderTasks();
  taskModal.hide();
  taskForm.reset();
});

// Render tasks in each category
const renderTasks = () => {
  for (const category in categories) {
    const categoryElement = document.getElementById(category);
    categoryElement.innerHTML = `<h4 class="text-center">${
      category.charAt(0).toUpperCase() + category.slice(1)
    }</h4>`;
    categories[category].forEach((task, index) => {
      if (task.taskName) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.draggable = true;
        taskElement.setAttribute(
          "ondragstart",
          `drag(event, ${index}, '${category}')`
        );
        taskElement.innerHTML = `
        <h5>${task.taskName}</h5>
        <p>Description: ${task.taskDescription}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Total Hours: ${task.totalHours}</p>
        <button class="btn btn-primary" onclick="editTask('${category}', ${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTask('${category}', ${index})">Delete</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton${index}" data-bs-toggle="dropdown" aria-expanded="false">&#8942;</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
            ${Object.keys(categories)
              .filter((cat) => cat !== category)
              .map(
                (cat) =>
                  `<li><a class="dropdown-item" href="#" onclick="moveToSection('${cat}', ${index}, '${category}')">${
                    cat[0].toUpperCase() + cat.slice(1, cat.length)
                  }</a></li>`
              )
              .join("")}
        </ul>`;
        categoryElement.appendChild(taskElement);
      }
    });
  }
};

// render deleted items
const renderDeletedTask = () => {
  const categoryElement = document.getElementById("deletedTask");
  categoryElement.innerHTML = `<h4 class="text-center">
    Deleted Task
  </h4>`;
  deletedTask.forEach((task) => {
    if (task.taskName) {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
        <h5>${task.taskName}</h5>
        <p>Description: ${task.taskDescription}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Total Hours: ${task.totalHours}</p>`;
      categoryElement.appendChild(taskElement);
    }
  });
};

// Allow drop event for drag and drop functionality
const allowDrop = (ev) => {
  ev.preventDefault();
};

// Move task to a different category using dropdown
const moveToSection = (targetCategory, index, currentCategory) => {
  const task = categories[currentCategory][index];
  categories[currentCategory].splice(index, 1);
  categories[targetCategory].push(task);
  renderTasks();
};

// Handle drag event for drag and drop functionality
const drag = (ev, index, category) => {
  ev.dataTransfer.setData("text/plain", JSON.stringify({ index, category }));
};

// Handle drop event for drag and drop functionality
const drop = (ev, targetCategory) => {
  ev.preventDefault();
  const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
  const { index, category } = data;
  const task = categories[category][index];
  categories[category].splice(index, 1);
  categories[targetCategory].push(task);
  renderTasks();
};

// Edit task details
const editTask = (category, index) => {
  presentCategory = category;
  const task = categories[category][index];
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("taskDescription").value = task.taskDescription;
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("totalHours").value = task.totalHours;
  taskModal.show();
  taskForm.onsubmit = (e) => {
    e.preventDefault();
    task.taskName = document.getElementById("taskName").value;
    task.taskDescription = document.getElementById("taskDescription").value;
    task.dueDate = document.getElementById("dueDate").value;
    task.totalHours = document.getElementById("totalHours").value;
    renderTasks();
    taskModal.hide();
    taskForm.reset();
  };
};

// Delete task from a category
const deleteTask = (category, index) => {
  swal({
    title: "Are you sure you want to delete this task?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: "Cancel",
  }).then((result) => {
    if (result.value) {
      deletedTask.push(categories[category].splice(index, 1)[0]);
      renderTasks();
      renderDeletedTask();
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

//toggle deleted item div
const toggleDeleteItemDiv = () => {
  const div = document.getElementById("deletedTask");
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");
  if (div.classList.contains("hidden")) {
    div.classList.remove("hidden");
    deleteTaskBtn.innerHTML = "Hide Deleted Task";
  } else {
    div.classList.add("hidden");
    deleteTaskBtn.innerHTML = "Show Deleted Task";
  }
};

renderTasks();
