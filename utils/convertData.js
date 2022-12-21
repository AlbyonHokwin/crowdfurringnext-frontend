export function convertData({
  files,
  images,
  animalName,
  infos,
  socialNetworks,
  description,
  compensations,
  amount,
  urgent,
  explanation,
}) {
  const data = new FormData();
  for (const file of files) {
    data.append("documents", {
      uri: file.file,
      name: "document.jpg",
      type: "image/jpeg",
    });
  }
  for (const image of images) {
    data.append("images", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });
  }
  data.append("animalName", animalName);
  data.append("infos", JSON.stringify(infos));
  data.append("socialNetworks", JSON.stringify(socialNetworks));
  data.append("description", description);
  data.append("compensations", JSON.stringify(compensations));
  data.append("amount", amount);
  data.append("urgent", urgent);
  data.append("explanation", explanation);

  return data;
}
