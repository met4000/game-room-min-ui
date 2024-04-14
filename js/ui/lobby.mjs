/**
 * @typedef {{ id: string, name: string | null }} LobbyData
 */

const lobbyIndexAttribute = "data-lobby-index";

const lobbyListContainer = document.getElementById("lobby-list-display");
const selectedLobbyDisplay = document.getElementById("selected-lobby-display");

/** @type {LobbyData[]} */
const lobbies = [];
/** @type {{ [string]: number }} */
const lobbyIndexMap = {};
/** @type {number} */
let currentLobbyIndex = undefined;
/** @type {LobbyData} */
export let CURRENT_LOBBY = undefined;

/**
 * @param {import("../types.mjs").Message} obj 
 */
export function handleInitMessage(obj) {
  // TODO
}

/**
 * @param {import("../types.mjs").Message} obj 
 */
export function handleLobbyJoinMessage(obj) {
  /** @type {LobbyData} */
  const lobbyData = obj.data;

  if (lobbyData.id === "00000000-0000-0000-0000-000000000000") {
    // response from leaving a lobby
    return;
  }

  let i = lobbyIndexMap[lobbyData.id];
  if (i !== undefined) {
    lobbies[i] = lobbyData;
    if (currentLobbyIndex == i) updateCurrentLobbyDisplay();
    return;
  }

  i = lobbies.push(lobbyData) - 1;
  lobbyIndexMap[lobbyData.id] = i;

  /** @type {HTMLDivElement} */
  const wrapper = document.createElement("div");
  wrapper.setAttribute(lobbyIndexAttribute, i);
  wrapper.classList.add("lobby");
  wrapper.addEventListener("click", lobbyClick);

  /** @type {HTMLDivElement} */
  const idDisplay = document.createElement("div");
  idDisplay.classList.add("lobby-id");
  idDisplay.innerText = lobbyData.id;

  wrapper.appendChild(idDisplay);

  lobbyListContainer.appendChild(wrapper);
}

/**
 * @param {MouseEvent} e 
 */
export function lobbyClick(e) {
  const lobbyDiv = e.currentTarget;
  const i = parseInt(lobbyDiv.getAttribute(lobbyIndexAttribute));
  if (isNaN(i)) throw new Error("bad lobby index attribute");

  updateCurrentLobby(i);
}

/**
 * @param {number} lobbyIndex
 */
function updateCurrentLobby(lobbyIndex) {
  const oldLobbyWrapper = document.querySelector(`#lobby-list .lobby[${lobbyIndexAttribute}="${currentLobbyIndex}"]`);
  const newLobbyWrapper = document.querySelector(`#lobby-list .lobby[${lobbyIndexAttribute}="${lobbyIndex}"]`);
  currentLobbyIndex = lobbyIndex;

  const currentLobby = lobbies[currentLobbyIndex]
  CURRENT_LOBBY = currentLobby;

  oldLobbyWrapper?.classList?.remove("selected");
  newLobbyWrapper.classList.add("selected");

  updateCurrentLobbyDisplay();
}

function updateCurrentLobbyDisplay() {
  const currentLobby = lobbies[currentLobbyIndex]
  const formattedData = JSON.stringify(currentLobby, null, 2);
  selectedLobbyDisplay.innerHTML = formattedData;
}
