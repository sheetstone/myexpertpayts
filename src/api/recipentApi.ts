import { onSuccess, baseUrl } from "./baseApi";

export async function getRecepient(): Promise<any> {
  return get(`recepients.json`);
}

export async function deletRecepient(id: string | null): Promise<any> {
  if (id === null || id === "") {
    return;
  }
  return del(`recepients/${id}.json`);
}

export async function addRecepient(data: any): Promise<any> {
  return post("recepients.json", data);
}

export async function updateRecepient(key: string, data: any): Promise<any> {
  return patch(`recepients/${key}.json`, data);
}

function get(url: string): Promise<any> {
  return fetch(baseUrl + url).then(onSuccess);
}

function del(url: string): Promise<any> {
  return fetch(baseUrl + url, {
    method: "DELETE",
  }).then(onSuccess);
}

function post(url: string, data: any): Promise<any> {
  return fetch(baseUrl + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(onSuccess)
    .then((json) => console.log("Recepient API: Add successful: ", json));
}

function patch(url: string, data: any): Promise<any> {
  return fetch(baseUrl + url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(onSuccess)
    .then((json) => console.log("Recepient API: Update successful", json));
}
