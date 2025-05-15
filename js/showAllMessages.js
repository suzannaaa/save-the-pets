togglePopup();
function togglePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = (popup.style.display === "none") ? "flex" : "none";
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
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
                  <h5 class="card-title">Username: ${messages.username}</h5>
                  <p class="card-text">
                      Message: ${messages.message_text} <br>
                      Created At: ${messages.created_at} <br>
                  </p>
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
    message_text: messageInput,
  };

  fetchMethod(currentUrl + "/api/message", fetchAndDisplayMessages, "POST", data, localStorage.getItem("token"));

  closePopup();
});

fetchAndDisplayMessages();