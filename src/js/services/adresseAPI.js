const searchForAutocomplete = async (adresse) => {
  const url =
    "https://api-adresse.data.gouv.fr/search?" +
    new URLSearchParams({
      q: adresse,
    });
  const response = await fetch(url).then((res) => res.json());
  console.log(response);
  const adresses = response.features.map((e) => ({
    label: e.properties.label,
    coordonnees: e.geometry.coordinates,
  }));
  return adresses;
};

export default { searchForAutocomplete };
