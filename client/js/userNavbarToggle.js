// userNavbarToggle.js

document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const tasksButton = document.getElementById("tasksButton");
  const messageButton = document.getElementById("messageButton");
  const petsButton = document.getElementById("petsButton");
  const petshopButton = document.getElementById("petshopButton");
  const adminButton = document.getElementById("adminButton"); // Add this line

  // Check if token exists in local storage
  const token = localStorage.getItem("token");

  if (token) {
    // Token exists, show navbar and logout buttons and hide register button
    registerButton && registerButton.classList.add("d-none");
    logoutButton && logoutButton.classList.remove("d-none");
    tasksButton && tasksButton.classList.remove("d-none");
    messageButton && messageButton.classList.remove("d-none");
    petsButton && petsButton.classList.remove("d-none");
    petshopButton && petshopButton.classList.remove("d-none");

    // Decode the token to get user_id
    const decodedToken = decodeToken(token);
    const user_id = decodedToken.user_id;

    // Check user_id and hide adminButton if not equal to 1
    if (user_id !== 1) {
      adminButton && adminButton.classList.add("d-none");
    }
  } else {
    // Token does not exist, show register button and hide navbar and logout buttons
    registerButton && registerButton.classList.remove("d-none");
    logoutButton && logoutButton.classList.add("d-none");
    tasksButton && tasksButton.classList.add("d-none");
    messageButton && messageButton.classList.add("d-none");
    petsButton && petsButton.classList.add("d-none");
    petshopButton && petshopButton.classList.add("d-none");
    adminButton && adminButton.classList.add("d-none");
  }

  logoutButton && logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});

// Function to decode the token
function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const decodedToken = JSON.parse(atob(base64));
  return decodedToken;
}