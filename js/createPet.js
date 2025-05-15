// createPet.js
import currentUrl from "./getCurrentURL.js";
import { fetchMethod } from './queryCmds.js';

function createPetMethod() {
  const data = {
    pet_num: pet_num,
  };
  // Perform post request
  fetchMethod(currentUrl + "/api/pet", callback, "POST", data, localStorage.getItem("token"));  console.log("Buy Box functionality executed!");
}