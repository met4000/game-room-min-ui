const messageIndexAttribute = "data-message-index";

const serverMessagesContainer = document.getElementById("server-messages");
const selectedTypeDisplay = document.getElementById("selected-message-type");
const selectedDataDisplay = document.getElementById("selected-message-data");

/** @type {{type: string, data: any}[]} */
const messages = [];
/** @type {number} */
let currentMessageIndex = undefined;
/** @type {any} */
export let CURRENT_MESSAGE = undefined;

/**
 * @param {string} rawObj 
 */
export function handleMessage(rawObj) {
  const obj = JSON.parse(rawObj);
  const i = messages.push(obj) - 1;

  /** @type {HTMLDivElement} */
  const wrapper = document.createElement("div");
  wrapper.setAttribute(messageIndexAttribute, i);
  wrapper.classList.add("message");
  wrapper.addEventListener("click", messageClick);

  /** @type {HTMLDivElement} */
  const typeDisplay = document.createElement("div");
  typeDisplay.classList.add("message-type");
  typeDisplay.innerHTML = obj.type;
  
  /** @type {HTMLPreElement} */
  const dataDisplay = document.createElement("pre");
  dataDisplay.classList.add("message-data");
  dataDisplay.innerHTML = JSON.stringify(obj.data, null, 2);

  wrapper.appendChild(typeDisplay);
  wrapper.appendChild(dataDisplay);

  serverMessagesContainer.appendChild(wrapper);
}

/**
 * @param {MouseEvent} e 
 */
export function messageClick(e) {
  const messageDiv = e.currentTarget;
  const i = parseInt(messageDiv.getAttribute(messageIndexAttribute));
  if (isNaN(i)) throw new Error("bad message index attribute");

  updateCurrentMessage(i);
}

/**
 * @param {number} messageIndex
 */
function updateCurrentMessage(messageIndex) {
  const oldMessageWrapper = document.querySelector(`#server-messages .message[${messageIndexAttribute}="${currentMessageIndex}"]`);
  const newMessageWrapper = document.querySelector(`#server-messages .message[${messageIndexAttribute}="${messageIndex}"]`);
  currentMessageIndex = messageIndex;

  const currentMessage = messages[currentMessageIndex]
  CURRENT_MESSAGE = currentMessage.data;

  oldMessageWrapper?.classList?.remove("selected");
  newMessageWrapper.classList.add("selected");

  selectedTypeDisplay.innerHTML = currentMessage.type;

  const formattedData = JSON.stringify(currentMessage.data, null, 2);
  selectedDataDisplay.innerHTML = formattedData;
}
