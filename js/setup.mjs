import { initConnection } from "./client.mjs";
import { CURRENT_MESSAGE, handleMessage } from "./ui/messages.mjs";

// quick reference
console.log(`quick reference:
- \`send(type: string, data: object)\` for sending data
// - \`o.SELF_USER\`/\`o.SELF_NAME\` is the id/name of the current player
// - \`o.TYPE\` is a string of the currently selected packet type
// - likewise \`o.LOBBY\` is the lobby id (todo \`o.USER\`?)
- \`o.MESSAGE\` is the data object of the currently selected server message
`);

// TODO set domain based on a toggle (dev vs actual)
// TODO get autoSend from a checkbox
initConnection("games.base67.com", handleMessage, true);

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
      case "SELF_USER":
      case "SELF_NAME":
      case "TYPE":
      case "LOBBY":
      case "USER":
        throw new Error("not yet implemented");

      case "MESSAGE":
        return CURRENT_MESSAGE;
    }

    return Reflect.get(...arguments);
  }
});
