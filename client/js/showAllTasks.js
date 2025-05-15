// showAllTasks.js
import currentUrl from "./getCurrentURL.js";

function handleDoTaskButtonClick(taskId) {
  showDatePickerPopup((selectedDate) => {
    if (selectedDate) {
      const data = {
        task_id: taskId,
        completion_date: selectedDate,
      };

      fetchMethod(currentUrl + "/api/task_progress", () => {
        console.log("Task progress submitted successfully.");
        alert("Task completed successfully!");
        // Assuming displayPoints is defined in displayPoints.js
        displayPoints();
        // Assuming displayTasks is defined in displayTasks.js
        displayTasks();
      }, "POST", data, localStorage.getItem("token"));
    } else {
      alert("Please select a date before submitting.");
    }
  });
}

function showDatePickerPopup(callback) {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Date</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" id="datepickerInput" class="form-control" placeholder="Date / Time">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const datepickerInput = modal.querySelector('#datepickerInput');
  flatpickr(datepickerInput, {
    enableTime: true,
    dateFormat: "Y-m-d / H:i:S",
  });

  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener("click", () => {
    $(modal).modal('hide');
  });

  const confirmButton = modal.querySelector('.btn-primary');
  confirmButton.addEventListener("click", () => {
    const selectedDate = datepickerInput.value;
    if (selectedDate) {
      callback(selectedDate);
      $(modal).modal('hide');
    } else {
      alert("Please select a date before confirming.");
    }
  });

  // Handle modal close using Bootstrap's modal event
  $(modal).on('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });

  $(modal).modal('show');
}

// Add this script after including the Flatpickr library
document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".flatpickr", {});
});

const displayTasksCallback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ''; // Clear existing content

  responseData.forEach((task) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-12 col-md-6 col-lg-4 col-xl-3 p-3";
    displayItem.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">
                    Description: ${task.description} <br>
                    Points: ${task.points} <br>
                </p>
                <button class="btn do-task-btn flatpickr" data-task-id="${task.task_id}">Do Task</button>
            </div>
        </div>
        `;

    const doTaskButton = displayItem.querySelector(".do-task-btn");
    doTaskButton.addEventListener("click", () => {
      handleDoTaskButtonClick(task.task_id);
    });

    taskList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/tasks", displayTasksCallback, "GET", null, localStorage.getItem("token"));