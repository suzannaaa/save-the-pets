document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const playerId = urlParams.get("player_id");
  const form = document.getElementById("updateNameForm");
  const addPokemonForm = document.getElementById("addPokemonForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 204) {
        // Redirect or perform further actions for logged-in user
        window.location.href = "updatePlayer.html?player_id=" + playerId;
      } else {
        alert(responseData.message);
      }
    };

    const character_name = document.getElementById("newPlayerName").value;
    const data = {
      name: character_name,
    };
    fetchMethod(currentUrl + "/api/player/" + playerId, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
  });

  addPokemonForm.addEventListener("submit", function (event) {
    console.log("addPokemonForm.addEventListener");
    event.preventDefault();

    const callbackForAddPokemon = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 200) {
        // Redirect or perform further actions for logged-in user
        window.location.href = "updatePlayer.html?player_id=" + playerId;
      } else if (responseStatus == 401) {
        window.location.href = "login.html";
      } else {
        alert(responseData.message);
      }
    };

    // const pokemon_name = document.getElementById("newPokemonName").value;
    // const data = {
    //     name: pokemon_name,
    // };
    const data = {
      playerId: playerId,
    };

    fetchMethod(currentUrl + "/api/pokemon", callbackForAddPokemon, "POST", data, localStorage.getItem("token"));
  });
});