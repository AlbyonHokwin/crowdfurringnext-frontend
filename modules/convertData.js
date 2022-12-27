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

  const uploadedDocuments = [];
  for (const file of files) {
    if (/cloudinary/i.test(file.file)) {
      uploadedDocuments.push(file.file);
    } else {
      data.append("documents", {
        uri: file.file,
        name: "document.jpg",
        type: "image/jpeg",
      });
    }
  }

  const uploadedImages = [];
  for (const image of images) {
    if (/cloudinary/i.test(image)) {
      uploadedImages.push(image);
    } else {
      data.append("images", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }
  }

  data.append("uploadedDocuments", JSON.stringify(uploadedDocuments));
  data.append("uploadedImages", JSON.stringify(uploadedImages));
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
