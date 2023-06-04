export const baseUrl = "https://myexpertpay.firebaseio.com/";
/**
 * Process data when get successful response from server
 * @param response - The response object from the server
 * @returns The JSON data from the response object
 * @throws An error if the response is not ok
 */
export function onSuccess(response: any): Promise<any> {
  if (response.ok) {
    return response.json();
  } else {
    const err = new Error(response.statusText);
    throw err;
  }
}

/**
 * Sends a GET request to the server with the specified URL
 * @param url - The URL to send the GET request to
 * @returns A Promise that resolves to the JSON data from the server's response
 */
export function get(url: string): Promise<any> {
  return fetch(baseUrl + url).then(onSuccess);
}

/**
 * Sends a DEL request to the server with the specified URL
 * @param url - The URL to send the DEL request to
 * @returns A Promise that resolves to the JSON data from the server's response
 */
export function del(url: string): Promise<any> {
  return fetch(baseUrl + url, {
    method: "DELETE",
  }).then(onSuccess);
}


/**
 * Sends a POST request to the server with the specified URL and data
 * @param url - The URL to send the POST request to
 * @param data - The data to be sent in the request body
 * @returns A Promise that resolves to the JSON data from the server's response
 */
export function post(url: string, data: any): Promise<any> {
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

/**
 * Sends a PATCH request to the server with the specified URL and data
 * @param url - The URL to send the PATCH request to
 * @param data - The data to be sent in the request body
 * @returns A Promise that resolves to the JSON data from the server's response
 */
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
