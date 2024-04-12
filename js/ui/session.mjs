const nameDisplay = document.getElementById("user-name-value");
const idDisplay = document.getElementById("user-id-value");

/**
 * @param {import("../types.mjs").Message} obj 
 */
export function handleInitMessage(obj) {
  nameDisplay.innerHTML = obj.data.name;
  idDisplay.innerHTML = obj.data.id;
};
