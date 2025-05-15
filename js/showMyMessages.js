// showMyMessages.js
import currentUrl from "./getCurrentURL.js";
import { fetchMethod } from './queryCmds.js';

function fetchMessages() {
    console.log("Fetching messages...");
    const messageList = document.getElementById("messageList");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        messageList.innerHTML = ''; // Clear previous messages before adding new ones

        responseData.forEach((messages) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4";
            displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title mb-3">Message:</h5>
                      <p class="card-text p-3" style="background-color: #f8dffa">${messages.message_text}</p>
                      <p class="card-text">Created On: ${messages.created_at}</p>
                      <button class="btn btn-primary update-button">Edit</button>
                      <button class="btn btn-danger delete-button">Delete</button>
                  </div>
              </div>
          `;
            messageList.appendChild(displayItem);

            // Add event listeners to update and delete buttons
            const updateButton = displayItem.querySelector(".update-button");
            updateButton.addEventListener("click", () => showUpdateForm(messages.id, messages.message_text));

            const deleteButton = displayItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => confirmDelete(messages.id));

        });
    };
    fetchMethod(currentUrl + `/api/message/:id`, callback, "GET", null, localStorage.getItem("token"));
}

const showUpdateForm = (messageId, messageText) => {
    const updateMessageModal = new bootstrap.Modal(document.getElementById("updateMessageModal"));
    const messageTextInput = document.getElementById("updateMessageText");
    messageTextInput.value = messageText;

    const updateForm = document.getElementById("updateForm");
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const updatedMessageText = messageTextInput.value;
        updateMessage(messageId, updatedMessageText);
    });

    updateMessageModal.show();
};

const updateMessage = (messageId, updatedMessageText) => {

    // Prepare the data for the PUT request
    const data = {
        message_text: updatedMessageText
    };

    // Define the callback function for the PUT request
    const handleUpdateResponse = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            // Show success message for update action
            alert("Message updated successfully.");
            // Close the update modal
            const updateMessageModal = bootstrap.Modal.getInstance(document.getElementById("updateMessageModal"));
            updateMessageModal.hide();
            // Refresh message list
            fetchMessages();
        } else {
            console.error("Failed to update message:", responseData);
            // Show error message
            alert("Failed to update message.");
        }
    };

    fetchMethod(currentUrl + `/api/message/${messageId}`, handleUpdateResponse, "PUT", data, localStorage.getItem("token"));
};

const confirmDelete = (messageId) => {
    if (confirm("Are you sure you want to delete this message?")) {
        deleteMessage(messageId);
    }
};

const deleteMessage = (messageId) => {
    fetchMethod(currentUrl + `/api/message/${messageId}`, handleDeleteResponse, "DELETE", null, localStorage.getItem("token"));
};

const handleDeleteResponse = (responseStatus, responseData) => {
    if (responseStatus === 200) {
        alert("Message deleted successfully.");
        fetchMessages();
    } else {
        console.error("Failed to delete message:", responseData);
        alert("Failed to delete message.");
    }
};

fetchMessages();