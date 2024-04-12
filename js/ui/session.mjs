const nameDisplay = document.getElementById("user-name-value");
const idDisplay = document.getElementById("user-id-value");

/** @type {string} */
export let SELF_USER = undefined;
/** @type {string} */
export let SELF_NAME = undefined;

/**
 * @param {import("../types.mjs").Message} obj 
 */
export function handleInitMessage(obj) {
  SELF_USER = obj.data.id;
  SELF_NAME = obj.data.name;

  nameDisplay.innerHTML = obj.data.name;
  idDisplay.innerHTML = obj.data.id;
};
