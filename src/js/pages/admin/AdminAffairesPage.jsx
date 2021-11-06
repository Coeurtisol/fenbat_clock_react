import React, { useEffect, useState } from "react";
import AFFAIRES_API from "../../services/affairesAPI";
import ENTITES_API from "../../services/entitesAPI";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
// import ETATSAFFAIRE_API from "../../services/etatsAffaireAPI";
import { Table, Form, Button } from "react-bootstrap";

const AdminAffairesPage = () => {
  const [affaires, setAffaires] = useState([]);
  const [entites, setEntites] = useState([]);
  const [typesAffaire, setTypesAffaire] = useState([]);
  const [secteursAffaire, setSecteursAffaire] = useState([]);
  // const [etatsAffaire, setEtatsAffaire] = useState([]);
  const etatsAffaire = ["En cours", "SAV", "Assurance", "Cloturé"];
  const [newAffaire, setNewAffaire] = useState({
    name: "",
    secteurAffaireId: "",
    typeAffaireId: "",
    etat: "En cours",
    entiteId: "",
  });

  // FETCH
  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  // const fetchEtatsAffaire = async () => {
  //   try {
  //     const etatsAffaire = await ETATSAFFAIRE_API.findAll();
  //     console.log("success fetch", etatsAffaire);
  //     setEtatsAffaire(etatsAffaire);
  //   } catch (error) {
  //     console.log("erreur fetch", error);
  //   }
  // };

  useEffect(() => {
    fetchAffaires();
    fetchEntites();
    fetchTypesAffaire();
    fetchSecteursAffaire();
    // fetchEtatsAffaire();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewAffaire({ ...newAffaire, [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.values(newAffaire).every(v => v === '')) {
    //   console.log('Veuillez remplir tout les champs');
    //   return
    // }
    console.log(Object.values(newAffaire).every(v => v === ''));
    // try {
    //   const response = await AFFAIRES_API.create(newAffaire);
    //   console.log("success submit", response);
    //   setNewAffaire({
    //     name: "",
    //     secteurAffaireId: "",
    //     typeAffaireId: "",
    //     etat: "En cours",
    //     entiteId: "",
    //   });
    // } catch (error) {
    //   console.log("erreur submit", error);
    // }
    // fetchAffaires();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await AFFAIRES_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchAffaires();
  };

  // TEMPLATE
  return (
    <main className="admin-form">
      <h1>Liste des affaires :</h1>
      {affaires.length === 0 ? (
        <p>Aucune affaire n'est enregistrée pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr>
              <th>Entité</th>
              <th>Affaire</th>
              <th>Type</th>
              <th>Secteur</th>
              <th>Etat</th>
            </tr>
          </thead>
          <tbody>
            {affaires.map((a) => (
              <tr key={a.id}>
                <td>{a.entite.name}</td>
                <td>{a.name}</td>
                <td>{a.typeAffaire.name}</td>
                <td>{a.secteurAffaire.name}</td>
                <td>{a.etat}</td>
                <td style={{ width: "1px" }}>
                  <Button variant="primary" type="submit" disabled size="sm">
                    Modifier
                  </Button>
                </td>
                <td style={{ width: "1px" }}>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => handleDelete(a.id)}
                    size="sm"
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h1>Ajouter une affaire :</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nom de l'affaire"
            value={newAffaire.name}
            onChange={handlechange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Entité</Form.Label>
          <Form.Select name="entiteId" onChange={handlechange}>
            <option>Selectionnez l'entité</option>
            {entites.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select name="typeAffaireId" onChange={handlechange}>
            <option>Selectionnez le type d'affaire</option>
            {typesAffaire.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Secteur</Form.Label>
          <Form.Select name="secteurAffaireId" onChange={handlechange}>
            <option>Selectionnez le secteur de l'affaire</option>
            {secteursAffaire.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Etat</Form.Label>
          <Form.Select name="etatAffaireId" onChange={handlechange}>
            <option>Selectionnez l'etat' de l'affaire</option>
            {etatsAffaire.map((e, k) => (
              <option key={k} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Envoyer
        </Button>
      </Form>
    </main>
  );
};

export default AdminAffairesPage;
