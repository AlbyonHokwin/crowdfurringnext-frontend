export async function fetcher(data, url, token) {
  const response = await fetch(`http://192.168.10.140:3000${url}`, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
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
