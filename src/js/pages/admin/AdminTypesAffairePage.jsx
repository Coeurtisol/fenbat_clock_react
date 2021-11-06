import React, { useEffect, useState } from "react";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";

const AdminTypesAffairePage = () => {
  const [typesAffaire, setTypesAffaire] = useState([]);
  const [newTypeAffaire, setNewTypeAffaire] = useState({
    name: "",
  });

  // FETCH
  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchTypesAffaire();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewTypeAffaire({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TYPESAFFAIRE_API.create(newTypeAffaire);
      console.log("success submit", response);
      setNewTypeAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchTypesAffaire();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await TYPESAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchTypesAffaire();
  };

  // TEMPLATE
  return (
    <main>
      <h1>Liste des types d'affaire :</h1>
      {typesAffaire.length === 0 ? (
        <p>Aucun type d'affaire n'est enregistré pour le moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {typesAffaire.map((m) => (
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
        </table>
      )}
      <br />
      <h1>Ajouter un type d'affaire :</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom : </label>
        <input
          type="text"
          name="name"
          value={newTypeAffaire.name}
          onChange={handlechange}
          required
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
};

export default AdminTypesAffairePage;
