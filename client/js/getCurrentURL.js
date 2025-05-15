// getCurrentURL.js

// To get the current URL and store it as currentURL for reusability
const currentUrl = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://save-the-pets.onrender.com";

console.log("currentUrl:", currentUrl);