// loginUser.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  const loginContainer = document.querySelector(".login");
  const joingameSection = document.querySelector(".joingame");
  const indexHeading = document.querySelector(".index");
  const indexcontainer = document.querySelector("#indexContainer");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  if (token) {
    // Token exists, user is logged in
    loginContainer.classList.add("d-none");
    indexHeading.style.width = "1000px";
    joingameSection.querySelector(".task").classList.remove("mt-4");
    joingameSection.classList.remove("px-5");
    joingameSection.classList.add("mx-auto");
    joingameSection.style.backgroundColor = "#f8abff";
    joingameSection.style.width = "1000px";
    joingameSection.querySelector(".task").style.backgroundColor = "#f8abff";
    joingameSection.querySelector(".task").style.height = "500px";
    joingameSection.querySelector(".task").style.width = "900px";
    joingameSection.querySelector("#taskListContainer").style.height = "350px";
    joingameSection.querySelector("#taskListContainer").style.width = "850px";

    joingameSection.querySelectorAll(".btn-primary").forEach(btn => {
      btn.style.fontSize = "16px";
    });
  } else {
    // Token does not exist, user is not logged in
    loginContainer.classList.remove("d-none");
    indexcontainer.classList.add("mt-5");
    joingameSection.classList.remove("mx-auto");
    joingameSection.style.backgroundColor = "";
    joingameSection.querySelector("#taskListContainer").style.height = "300px";
    joingameSection.querySelector("#taskListContainer").style.width = "600px";
    joingameSection.querySelectorAll(".btn-primary").forEach(btn => {
      btn.style.fontSize = "";
    });
  }

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      username: username,
      password: password,
    };

    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);
  });

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus === 200 && responseData.token) {
      // Store the token in local storage
      localStorage.setItem("token", responseData.token);
      // Redirect or perform further actions for logged-in user
      const user_id = parseInt(responseData.user_id); // Assuming user_id is returned in responseData
      console.log("user_id:", user_id);
      if (user_id === 1) {
        // Redirect the user to admin.html
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };
});