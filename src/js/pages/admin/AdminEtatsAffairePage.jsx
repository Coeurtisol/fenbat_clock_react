import React, { useEffect, useState } from "react";
import ETATSAFFAIRE_API from "../../services/etatsAffaireAPI";
import { Table } from "react-bootstrap";

const AdminEtatsAffairePage = () => {
  const [etatsAffaire, setEtatsAffaire] = useState([]);
  const [newEtatAffaire, setNewEtatAffaire] = useState({
    name: "",
  });

  // FETCH
  const fetchEtatsAffaire = async () => {
    try {
      const etatsAffaire = await ETATSAFFAIRE_API.findAll();
      console.log("success fetch", etatsAffaire);
      setEtatsAffaire(etatsAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchEtatsAffaire();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewEtatAffaire({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ETATSAFFAIRE_API.create(newEtatAffaire);
      console.log("success submit", response);
      setNewEtatAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchEtatsAffaire();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ETATSAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchEtatsAffaire();
  };

  // TEMPLATE
  return (
    <main className="admin">
      <h1>Liste des états d'affaire :</h1>
      {etatsAffaire.length === 0 ? (
        <p>Aucun état d'affaire n'est enregistré pour le moment</p>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {etatsAffaire.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>
                  <button>Modifier</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(m.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <br />
      <h1>Ajouter un état d'affaire :</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom : </label>
        <input
          type="text"
          name="name"
          value={newEtatAffaire.name}
          onChange={handlechange}
          required
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
};

export default AdminEtatsAffairePage;
