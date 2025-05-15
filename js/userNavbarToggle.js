document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const tasksButton = document.getElementById("tasksButton");
  const messageButton = document.getElementById("messageButton");
  const petsButton = document.getElementById("petsButton");
  const petshopButton = document.getElementById("petshopButton");

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
  } else {
    // Token does not exist, show register button and hide navbar and logout buttons
    registerButton && registerButton.classList.remove("d-none");
    logoutButton && logoutButton.classList.add("d-none");
    tasksButton && tasksButton.classList.add("d-none");
    messageButton && messageButton.classList.add("d-none");
    petsButton && petsButton.classList.add("d-none");
    petshopButton && petshopButton.classList.add("d-none");
  }

  logoutButton && logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});