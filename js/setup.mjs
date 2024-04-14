import { initConnection } from "./client.mjs";
import { CURRENT_MESSAGE, handleMessage } from "./ui/messages.mjs";
import { SELF_NAME, SELF_USER, handleInitMessage } from "./ui/session.mjs";

// quick reference
console.log(`quick reference:
- \`send(type: string, data: object)\` for sending data
- \`join(obj: url | UUID | string)\` to join a lobby by id (or join link, etc.)
- \`o.SELF_USER\`/\`o.SELF_NAME\` is the id/name of the current player
// - \`o.TYPE\` is a string of the currently selected packet type
// - likewise \`o.LOBBY\` is the lobby id (todo \`o.USER\`?)
- \`o.MESSAGE\` is the data object of the currently selected server message
`);

// export constants for console use
export const o = new Proxy({
  SELF_USER: undefined,
  SELF_NAME: undefined,
  TYPE: undefined,
  LOBBY: undefined,
  USER: undefined,
  MESSAGE: undefined
}, {
  get(target, prop, receiver) {
    switch (prop) {
      case "TYPE":
      case "LOBBY":
      case "USER":
        throw new Error("not yet implemented");
            
      case "SELF_USER":
        return SELF_USER
      case "SELF_NAME":
        return SELF_NAME;

      case "MESSAGE":
        return CURRENT_MESSAGE;
    }

    return Reflect.get(...arguments);
  }
});

function newSession() {
  // TODO set domain based on a toggle (dev vs actual)
  // TODO get autoSend from a checkbox
  initConnection("games.base67.com", rawObj => {
    const obj = JSON.parse(rawObj);
    
    // general message handling
    handleMessage(obj);

    // specific message handling
    switch (obj.type) {
      case "server_user_init":
        handleInitMessage(obj);
        break;
    }
  }, true);
}

// hook up buttons
document.getElementById("new-session-button").addEventListener("click", () => newSession());
