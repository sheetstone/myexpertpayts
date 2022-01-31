export const baseUrl = "https://myexpertpay.firebaseio.com/";

/*
 * Process data when get successful response from server
 */
export function onSuccess(response: any) {
  if (response.ok) {
    return response.json();
  } else {
    const err = new Error(response.statusText);
    throw err;
  }
}

export function get(url: string) {
  return fetch(baseUrl + url).then(onSuccess);
}

export function del(url: string) {
  return fetch(baseUrl + url, {
    method: "DELETE",
  }).then(onSuccess);
}

export function post(url: string, data: any) {
  // Post the wrapped data to server
  return fetch(baseUrl + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(onSuccess)
    .then((json) => console.log("Bank API Post", json));
}

export function patch(url: string, data: any) {
  return fetch(baseUrl + url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(onSuccess)
    .then((json) => console.log("Bank API Patch", json));
}
