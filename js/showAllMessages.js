// showAllMessages.js

togglePopup();

function togglePopup() {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");

  if (popup && overlay) {
    if (popup.style.display === "none") {
      popup.style.display = "flex";
      overlay.style.display = "block";
    } else {
      popup.style.display = "none";
      overlay.style.display = "none";
    }
  } else {
    console.error("Popup or overlay element not found!");
  }
}

function closePopup() {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");

  popup.style.display = "none";
  overlay.style.display = "none";
}


function fetchAndDisplayMessages() {
  const messageList = document.getElementById("messageList");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    messageList.innerHTML = ''; // Clear previous messages before adding new ones

    responseData.forEach((messages) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-12 col-md-6 col-lg-4 col-xl-3 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
              <h5 class="card-title mb-3">Message:</h5>
              <p class="card-text p-3" style="background-color: #f8dffa">${messages.message_text}</p>
                      Created By: ${messages.username} <br>
                      Created At: ${messages.created_at} <br>
              </div>
          </div>
          `;
      messageList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + "/api/message", callback, "GET", null, localStorage.getItem("token"));
}

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", function () {
  console.log("submitButton.addEventListener");

  const messageInput = document.getElementById("popupMessageInput").value;

  const data = {
    message_text: messageInput
  };

  const successCallback = () => {
    fetchAndDisplayMessages();
    document.getElementById("popupMessageInput").value = '';
    closePopup();
  };

  fetchMethod(currentUrl + "/api/message", successCallback, "POST", data, localStorage.getItem("token"));
});

fetchAndDisplayMessages();