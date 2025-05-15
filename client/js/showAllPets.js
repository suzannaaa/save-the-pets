// showAllPets.js
import currentUrl from "./getCurrentURL.js";
import { fetchMethod } from './queryCmds.js';

const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const petList = document.getElementById("petList");
  responseData.forEach((pet) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3";
    displayItem.innerHTML = `
      <div class="card h-100 w-100">
        <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
          <img src="https://raw.githubusercontent.com/suzannaaa/PetShop/main/pets/${pet.pet_num}.png" class="card-img-top" alt="Pet Image" style="max-width: 100%; max-height: 100%;">
        </div>
        <div class="card-body">
          <h5 class="card-title">${pet.name}</h5>
          <p class="card-text">
            Rarity: ${pet.rarity} <br>
          </p>
        </div>
      </div>
    `;
    petList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/pets/:id", callback, "GET", null, localStorage.getItem("token"));