// displayPoints.js
import currentUrl from "./getCurrentURL.js";
import { fetchMethod } from './queryCmds.js';

function displayPoints() {
  const displayPointscallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const pointsValue = document.getElementById("pointsValue");
    pointsValue.innerHTML = ''; // Clear existing content

    // Access the properties directly
    const user = responseData;

    const displayItem = document.createElement("div");
    displayItem.className = "col-12 col-md-6 col-lg-4 p-3";
    displayItem.innerHTML = `
      <div class="card">
        <div class="card-body">
          <p class="card-text">
            Points: ${user.total_points}
          </p>
        </div>
      </div>
    `;
    pointsValue.appendChild(displayItem);
  };

  fetchMethod(currentUrl + "/api/users/:id", displayPointscallback, "GET", null, localStorage.getItem("token"));
}

// Call displayPoints when the page loads, assuming you want to display points initially
displayPoints();