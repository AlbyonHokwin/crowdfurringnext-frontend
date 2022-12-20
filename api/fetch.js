export async function fetcher(data, url) {
  const response = await fetch(`http://192.168.10.138:3000${url}`, {
    method: "POST",
    headers: {
      // 'Authorization':'Bearer' + token il sera dans le store reduce
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
