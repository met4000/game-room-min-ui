import { send } from "./client.mjs";

/**
 * 
 * @param {string} obj join link or lobby id to try and join 
 */
export function join(obj) {
  const id = obj.slice(-36);
  return send("client_lobby_join", { id });
}
