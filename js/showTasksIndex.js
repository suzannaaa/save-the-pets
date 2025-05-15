// showTasksIndex.js
import currentUrl from "./getCurrentURL.js";
import { fetchMethod } from './queryCmds.js';

const displayTasksIndexCallback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const taskListContainer = document.getElementById("taskListContainer");

  responseData.forEach((task) => {
    const displayItem = document.createElement("div");
    displayItem.innerHTML = `
        <div class="card mt-3 mb-3" style="width: 500px;">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">
                    Description: ${task.description} <br>
                    Points: ${task.points} <br>
                </p>
            </div>
        </div>
        `;

    taskListContainer.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/tasks/index", displayTasksIndexCallback, "GET", null, localStorage.getItem("token"));