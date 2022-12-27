import { BACKEND_URL } from "../global";

export async function fetcher(data, url, method, token) {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        return data;
      } else {
        return false;
      }
    });
  return response;
}
