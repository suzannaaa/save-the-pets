// showAllBox.js
import currentUrl from "./getCurrentURL.js";

document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const petshopList = document.getElementById("petshopList");
    responseData.forEach((box) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
      <div class="card h-100">
        <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
          <img src="https://raw.githubusercontent.com/suzannaaa/Pet-World/main/pets/${box.pet_num}.png" class="card-img-top" alt="Pokemon Image" style="max-width: 100%; max-height: 100%;">
        </div>
        <div class="card-body">
          <h5 class="card-title">${box.pet_name}</h5>
          <p class="card-text">
              Rarity: ${box.pet_rarity}
          </p>
        </div>
      </div>
          `;
      petshopList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/box", callback, "GET", null, localStorage.getItem("token"));
});