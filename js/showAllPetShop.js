// Declare closePopup globally
function closePopup() {
  const popup = document.querySelector(".popup");
  if (popup) {
    document.body.removeChild(popup);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petshopList = document.getElementById("petshopList");
    responseData.forEach((petshop) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
      <div class="card h-100">
        <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
          <img src="https://raw.githubusercontent.com/suzannaaa/Pet-World/main/boxes/${petshop.box_id}.png" class="card-img-top" alt="Pokemon Image" style="max-width: 100%; max-height: 100%;">
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
      const viewBoxButton = displayItem.querySelector(".view-box-btn");
      viewBoxButton.addEventListener("click", () => {
        handleViewBoxButton(petshop.box_id);
      });
      petshopList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + "/api/pet_shop", callback, "GET", null, localStorage.getItem("token"));

  // Function to handle the "View Box" button
  function handleViewBoxButton(box_id) {
    // Fetch pets in the specified box using the box_id
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
        <span class="close-popup" onclick="closePopup()" style="position: absolute; top: 10px; right: 10px; cursor: pointer;">&times;</span>
        <h3>Pets</h3>
        <div id="popupPetList" class="row"></div>
        <button class="btn buy-box-btn" onclick="handleBuyBoxButton(${box_id})">Buy Box</button>
      </div>
    `;
      document.body.appendChild(popup);

      // Add event listener to the "Close Popup" button
      const closePopupButton = popup.querySelector(".close-popup");
      closePopupButton.addEventListener("click", () => {
        // Remove both the popup and the modal overlay
        document.body.removeChild(popup);
        document.body.removeChild(modalOverlay);
      });

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

    // Fetch pets for the specified box_id
    fetchMethod(currentUrl + `/api/box/${box_id}`, displayPetsCallback, "GET", null, localStorage.getItem("token"));
  }
});

// Function to handle the "Buy Box" button
function handleBuyBoxButton(box_id) {
  // Construct data for the POST request
  const data = { box_id };

  // Callback function for the POST request
  const buyBoxCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Check if the response contains an error message
    if (responseData && responseData.error) {
      // Display the error message to the user
      alert("Error: " + responseData.error);
    } else {
      // Box bought successfully, you can add any additional logic here based on the response
      // Close the popup after buying the box
      closePopup();
    }
  };

  // Make the POST request to buy the box
  fetchMethod(currentUrl + `/api/pets`, buyBoxCallback, "POST", data, localStorage.getItem("token"));
}