/** @type {WebSocket} */
export let conn;

/**
 * @param {string} domain 
 * @param {(rawObj: string) => void} handler
 * @param {bool} autoSendOnOpen 
 */
export function initConnection(domain, handler, autoSendOnOpen) {
  conn = new WebSocket(`wss://${domain}/ws`);
  conn.onmessage = ev => {
    handler(ev.data);
  };

  if (autoSendOnOpen) conn.onopen = () => conn.send({});
}

/**
 * @param {string} type 
 * @param {any} data 
 */
export function send(type, data) {
  conn.send(JSON.stringify({ type, data }));
}
