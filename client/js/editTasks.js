// editTasks.js
import currentUrl from "./getCurrentURL.js";

// Function to fetch tasks from the server
const fetchTasks = () => {
  const displayTasksCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; // Clear existing content

    responseData.forEach((task) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-12 col-md-6 col-lg-4 col-xl-3 p-3";
      displayItem.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">
              Description: ${task.description} <br>
              Points: ${task.points} <br>
            </p>
            <button class="btn btn-primary update-task-button">Edit</button>
            <button class="btn btn-danger delete-task-button">Delete</button>
          </div>
        </div>
      `;

      // Add event listeners for update and delete buttons
      const updateTaskButton = displayItem.querySelector(".update-task-button");
      updateTaskButton.addEventListener("click", () => {
        showUpdateForm(task.task_id, task.title, task.description, task.points);
      });

      const deleteTaskButton = displayItem.querySelector(".delete-task-button");
      deleteTaskButton.addEventListener("click", () => {
        confirmDelete(task.task_id);
      });

      taskList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + "/api/tasks", displayTasksCallback, "GET", null, localStorage.getItem("token"));
};

// Declare the updateTaskFormSubmitHandler function
const updateTaskFormSubmitHandler = function (event) {
  event.preventDefault();

  // Retrieve the task_id from the data attribute
  const updateTaskModal = bootstrap.Modal.getInstance(document.getElementById("updateTaskModal"));
  const updatedTaskId = updateTaskModal._element.getAttribute("data-task-id");

  const updatedTitle = document.getElementById("updateTaskTitle").value;
  const updatedDescription = document.getElementById("updateTaskDescription").value;
  const updatedPoints = document.getElementById("updateTaskPoints").value;

  updateTask(updatedTaskId, updatedTitle, updatedDescription, updatedPoints);
};

// Function to show the update form
const showUpdateForm = (task_id, title, description, points) => {
  // Create a new instance of the update task modal each time
  const updateTaskModal = new bootstrap.Modal(document.getElementById("updateTaskModal"));

  // Set initial values in the update form
  document.getElementById("updateTaskTitle").value = title;
  document.getElementById("updateTaskDescription").value = description;
  document.getElementById("updateTaskPoints").value = points;

  // Store the task_id as a data attribute in the modal
  updateTaskModal._element.setAttribute("data-task-id", task_id);

  // Remove previous event listeners to avoid duplication
  const updateTaskForm = document.getElementById("updateTaskForm");
  updateTaskForm.removeEventListener("submit", updateTaskFormSubmitHandler);

  // Add event listener for the update form submission
  updateTaskForm.addEventListener("submit", updateTaskFormSubmitHandler);

  updateTaskModal.show();
};

// Function to update a task
const updateTask = (task_id, updatedTitle, updatedDescription, updatedPoints) => {
  // Prepare the data for the PUT request
  const data = {
    title: updatedTitle,
    description: updatedDescription,
    points: updatedPoints
  };

  // Define the callback function for the PUT request
  const handleUpdateResponse = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      // Show success message for the update action
      alert("Task updated successfully.");
      // Close the update modal
      const updateTaskModal = bootstrap.Modal.getInstance(document.getElementById("updateTaskModal"));
      updateTaskModal.hide();
      // Refresh the task list
      fetchTasks();
    } else {
      console.error("Failed to update task:", responseData);
      // Show error message
      alert("Failed to update task.");
    }
  };

  fetchMethod(currentUrl + `/api/tasks/${task_id}`, handleUpdateResponse, "PUT", data, localStorage.getItem("token"));
};

// Function to confirm task deletion
const confirmDelete = (task_id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    deleteTask(task_id);
  }
};

// Function to delete a task
const deleteTask = (task_id) => {
  fetchMethod(currentUrl + `/api/tasks/${task_id}`, handleDeleteResponse, "DELETE", null, localStorage.getItem("token"));
};

// Function to handle the response after deleting a task
const handleDeleteResponse = (responseStatus, responseData) => {
  if (responseStatus === 204) {
    alert("Task deleted successfully.");
    fetchTasks();
  } else {
    console.error("Failed to delete task:", responseData);
    alert("Failed to delete task.");
  }
};

// Function to create a task
const createTask = (title, description, points) => {
  // Prepare the data for the POST request
  const data = {
    title: title,
    description: description,
    points: points
  };

  // Define the callback function for the POST request
  const handleCreateResponse = (responseStatus, responseData) => {
    if (responseStatus === 201) {
      // Show success message for the create action
      alert("Task created successfully.");
      // Close the create modal
      const createTaskModal = bootstrap.Modal.getInstance(document.getElementById("createTaskModal"));
      createTaskModal.hide();
      // Refresh the task list
      fetchTasks();
    } else {
      console.error("Failed to create task:", responseData);
      // Show error message
      alert("Failed to create task.");
    }
  };

  fetchMethod(currentUrl + "/api/tasks", handleCreateResponse, "POST", data, localStorage.getItem("token"));
};

document.addEventListener("DOMContentLoaded", () => {
  // Call fetchTasks to initially display tasks
  fetchTasks();

  // Event listener for creating a task
  const createTaskButton = document.getElementById("createTaskButton");
  createTaskButton.addEventListener("click", () => {
    showCreateTaskForm();
  });

  // Show the create task form
  const showCreateTaskForm = () => {
    const createTaskModal = new bootstrap.Modal(document.getElementById("createTaskModal"));
    const createTaskForm = document.getElementById("createTaskForm");
    createTaskForm.reset(); // Clear any previous input values
    createTaskModal.show();
  };

  // Add event listener for the create task form submission
  const createTaskForm = document.getElementById("createTaskForm");
  createTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("createTaskTitle").value;
    const description = document.getElementById("createTaskDescription").value;
    const points = document.getElementById("createTaskPoints").value;

    createTask(title, description, points);
  });
});