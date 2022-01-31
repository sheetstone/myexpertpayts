import { onSuccess, baseUrl } from "./baseApi";

export function getEvents() {
  return get("events.json");
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess);
}
