// Function to render tasks
export const renderTasks = () => {
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
                <li><a class="dropdown-item" href="#" onclick="moveToSection('backlog', ${index}, '${category}')">Backlog</a></li>
                <li><a class="dropdown-item" href="#" onclick="moveToSection('selected', ${index}, '${category}')">Selected</a></li>
                <li><a class="dropdown-item" href="#" onclick="moveToSection('running', ${index}, '${category}')">Running</a></li>
                <li><a class="dropdown-item" href="#" onclick="moveToSection('inReview', ${index}, '${category}')">In Review</a></li>
                <li><a class="dropdown-item" href="#" onclick="moveToSection('done', ${index}, '${category}')">Done</a></li>
            </ul>`;
        categoryElement.appendChild(taskElement);
      }
    });
  }
};

// Function to add new task
export const addTask = (title, description) => {
  // Add new task
};

// Function to update task
export const updateTask = (id, newDescription) => {
  // Update task
};

// Function to mark task as completed
export const completeTask = (id) => {
  // Mark task as completed
};

// Function to delete completed tasks
export const deleteCompletedTasks = () => {
  // Delete completed tasks
};
