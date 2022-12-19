import validator from "validator";

export function checkFileds(
  page,
  animalName,
  infos,
  socialNetworks,
  images,
  amount,
  files,
  description
) {
  console.log(infos);
  if (page === 1) {
    if (
      validator.isEmpty(animalName) ||
      validator.isEmpty(infos.specie) ||
      validator.isEmpty(infos.breed) ||
      validator.isEmpty(infos.age) ||
      validator.isEmpty(infos.sex) ||
      validator.isEmpty(description)
    ) {
      return {
        result: false,
        message: "Merci de bien remplir tous les champs",
      };
    }
    if (!validator.isNumeric(infos.age)) {
      return {
        result: false,
        message: `L'age de votre animal doit être un nombre`,
      };
    }
    if (socialNetworks.instagram) {
      if (
        !validator.isURL(socialNetworks.instagram, {
          protocols: ["http", "https"],
          require_protocol: false,
        })
      ) {
        return {
          result: false,
          message: `Le lien instagram renseigné n'est pas un lien valide`,
        };
      }
    }
    if (socialNetworks.twitter) {
      if (
        !validator.isURL(socialNetworks.twitter, {
          protocols: ["http", "https"],
          require_protocol: false,
        })
      ) {
        return {
          result: false,
          message: `Le lien twitter renseigné n'est pas un lien valide`,
        };
      }
    }
  } else if (page === 2) {
    if (images.length < 3) {
      return {
        result: false,
        message: "Merci d'ajouter trois photos minimum",
      };
    }
  } else if (page === 3) {
    if (!validator.isNumeric(amount)) {
      return {
        result: false,
        message: "Le montant de la cagnotte doit être un nombre",
      };
    }
  } else if (page === 5) {
    if (files.length < 1) {
      return {
        result: false,
        message: "Vous devez envoyer au moins 1 justificatif",
      };
    }
  }
  return { result: true };
}
