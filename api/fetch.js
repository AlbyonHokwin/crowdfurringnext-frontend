const BACKEND_URL = 'http://192.168.10.143:3000';

export async function fetcher(data, url, token) {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "POST",
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
