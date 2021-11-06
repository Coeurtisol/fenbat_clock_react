import React, { useEffect, useState } from "react";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";

const AdminSecteursAffairePage = () => {
  const [secteursAffaire, setSecteursAffaire] = useState([]);
  const [newSecteurAffaire, setNewSecteurAffaire] = useState({
    name: "",
  });

  // FETCH
  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchSecteursAffaire();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewSecteurAffaire({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await SECTEURSAFFAIRE_API.create(newSecteurAffaire);
      console.log("success submit", response);
      setNewSecteurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchSecteursAffaire();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await SECTEURSAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchSecteursAffaire();
  };

  // TEMPLATE
  return (
    <main>
      <h1>Liste des secteurs d'affaire :</h1>
      {secteursAffaire.length === 0 ? (
        <p>Aucun secteur d'affaire n'est enregistré pour le moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {secteursAffaire.map((m) => (
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
      <h1>Ajouter un secteur d'affaire :</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom : </label>
        <input
          type="text"
          name="name"
          value={newSecteurAffaire.name}
          onChange={handlechange}
          required
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
};

export default AdminSecteursAffairePage;
