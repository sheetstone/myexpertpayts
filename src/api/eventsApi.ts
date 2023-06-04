import { baseUrl, onSuccess } from "./baseApi";

export function getEvents() {
  return get("events.json");
}

function get(url:string): Promise<any> {
  return fetch(baseUrl + url).then(onSuccess);
}
