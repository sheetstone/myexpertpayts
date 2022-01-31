import { onSuccess, baseUrl } from "./baseApi";

export function getMessages() {
  return get("messages.json");
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess);
}
