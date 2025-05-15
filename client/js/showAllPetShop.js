// showAllPetShop.js

function closePopup() {
  const popup = document.querySelector(".popup");
  const modalOverlay = document.querySelector(".modal-overlay");

  if (popup) {
    document.body.removeChild(popup);
  }

  if (modalOverlay) {
    document.body.removeChild(modalOverlay);
  }
}

document.addEventListener("DOMContentLoaded", function () {

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petshopList = document.getElementById("petshopList");
    petshopList.addEventListener("click", (event) => {
      // Check if the clicked element is a "View Box" button
      if (event.target.classList.contains("view-box-btn")) {
        const box_id = event.target.dataset.boxId;
        handleViewBoxButton(box_id);
      }
    });

    responseData.forEach((petshop) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
        <div class="card h-100">
          <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
            <img src="https://raw.githubusercontent.com/suzannaaa/Pet-World/main/boxes/${petshop.box_id}.png" class="card-img-top" alt="Box Image" style="max-width: 100%; max-height: 100%;">
          </div>
          <div class="card-body">
            <h5 class="card-title">${petshop.name}</h5>
            <p class="card-text">
              Price: ${petshop.price}
            </p>
            <button class="btn view-box-btn" data-box-id="${petshop.box_id}">View Box</button>
          </div>
        </div>
      `;
      petshopList.appendChild(displayItem);
    });

    // Function to handle the "View Box" button
    function handleViewBoxButton(box_id) {
      const displayPetsCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Create and show the modal overlay
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "modal-overlay";
        document.body.appendChild(modalOverlay);

        // Create and show the popup
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
          <div class="popup-content">
          <span class="close-popup" onclick="closePopup()" style="position: absolute; top: 15px; right: 20px; cursor: pointer;">&times;</span>
          <h3>Pets Available in this Box</h3>
          <div class="popup-pet-list-container">
            <div id="popupPetList" class="row"></div>
          </div>
          <button class="btn buy-box-btn mt-3" onclick="handleBuyBoxButton(${box_id})">Buy Box</button>
        </div>      
        `;
        document.body.appendChild(popup);

        const popupPetListContainer = document.querySelector('.popup-pet-list-container');
        popupPetListContainer.style.height = '260px'; // Adjust the height as needed
        popupPetListContainer.style.overflowY = 'auto';
        popupPetListContainer.style.overflowX = 'hidden';


        // Add event listener to the "Close Popup" button
        const closePopupButton = popup.querySelector(".close-popup");
        closePopupButton.addEventListener("click", closePopup);

        // Add event listener to the modal overlay to close the popup when clicked outside
        modalOverlay.addEventListener("click", closePopup);

        // Display pets in the popup
        const popupPetList = document.getElementById("popupPetList");
        responseData.forEach((box) => {
          const popupItem = document.createElement("div");
          popupItem.className = "col-4 p-3";
          popupItem.innerHTML = `
            <div class="card h-100">
              <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
                <img src="https://raw.githubusercontent.com/suzannaaa/Pet-World/main/pets/${box.pet_num}.png" class="card-img-top" alt="Pet Image" style="max-width: 100%; max-height: 100%;">
              </div>
              <div class="card-body">
                <h5 class="card-title">${box.pet_name}</h5>
                <p class="card-text">
                  Rarity: ${box.pet_rarity}
                </p>
              </div>
            </div>
          `;
          popupPetList.appendChild(popupItem);
        });
      };

      fetchMethod(currentUrl + `/api/box/${box_id}`, displayPetsCallback, "GET", null, localStorage.getItem("token"));
    }
  };

  fetchMethod(currentUrl + "/api/pet_shop", callback, "GET", null, localStorage.getItem("token"));
});

// Function to handle the "Buy Box" button
function handleBuyBoxButton(box_id) {
  const data = { box_id };

  const buyBoxCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseData && responseData.error) {
      alert("Error: " + responseData.error);
    } else {
      closePopup();
      // Assuming displayPoints is defined in displayPoints.js
      displayPoints();
      // Display a success message
      alert("Box bought successfully!");
    }
  };

  fetchMethod(currentUrl + `/api/pets`, buyBoxCallback, "POST", data, localStorage.getItem("token"));
}