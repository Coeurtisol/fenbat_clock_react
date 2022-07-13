import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import adresseAPI from "../services/adresseAPI";

const InputAdresse = ({
  parentObject,
  setParentObject,
  // TODO: revoir gestion des coordonnees
  tempCoordonnees,
  setTempCoordonnees,
}) => {
  const [adresses, setAdresses] = useState([]);

  const handleChange = async ({ target }) => {
    let { name, value } = target;
    if (name === "adresse") {
      value = value.trimStart();
    }
    setParentObject({ ...parentObject, [name]: value });
  };

  const handleChangeTempCoordonnees = async ({ target }) => {
    let { value } = target;
    setTempCoordonnees(value);
  };

  const searchForAdresseAutocomplete = async (adresse) => {
    if (adresse != "") {
      try {
        const listeAdresse = await adresseAPI.searchForAutocomplete(adresse);
        // console.log("listeAdresse", listeAdresse);
        setAdresses(listeAdresse);

        const matchingAdresse = listeAdresse.find(
          (a) => a.label.toLowerCase() == parentObject.adresse.toLowerCase()
        );
        // console.log("matchingAdresse", matchingAdresse);
        if (matchingAdresse) {
          // console.log("match found");
          const newCoordonnees = [...matchingAdresse.coordonnees]
            ?.reverse()
            .join(",");
          // console.log("newCoordonnees", newCoordonnees);
          console.log();
          setTempCoordonnees(newCoordonnees);
        } else {
          // console.log("match missing");
          setTempCoordonnees("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(async () => {
    console.log("effect");
    setTempCoordonnees(parentObject.coordonnees);
    searchForAdresseAutocomplete(parentObject.adresse);
  }, [parentObject.adresse]);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>
          Adresse
          {/* {parentObject.coordonnees?.length ? (
            <>
              {` (Coordonnées: `}
              <span className="text-success">
                {`${parentObject.coordonnees.split(",")[0]},${
                  parentObject.coordonnees.split(",")[1]
                }`}
              </span>
              {`)`}
            </>
          ) : (
            <>
              {` (Coordonnées: `}
              <span className="text-danger">non trouvées</span>
              {`)`}
            </>
          )} */}
        </Form.Label>
        <Form.Control
          type="text"
          name="adresse"
          placeholder="Rechercher une adresse"
          value={parentObject.adresse}
          onChange={handleChange}
          required
          list="adresses"
        />
        <datalist id="adresses">
          {adresses.map((a, k) => (
            <option key={k} value={a.label}></option>
          ))}
        </datalist>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Coordonnees (latitude,longitude)</Form.Label>
        <Form.Control
          type="text"
          name="coordonnees"
          value={tempCoordonnees}
          onChange={handleChangeTempCoordonnees}
          required
          disabled
        />
      </Form.Group>
    </>
  );
};

export default InputAdresse;
