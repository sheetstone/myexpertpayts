import { onSuccess, baseUrl } from "./baseApi";

export function getMessages():Promise<any> {
  return get("messages.json");
}

function get(url:string): Promise<any> {
  return fetch(baseUrl + url).then(onSuccess);
}
