import React, { useEffect, useState } from "react";
import MOTIFSABSENCE_API from "../../services/motifsAbsenceAPI";

const AdminMotifsAbsencePage = () => {
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [newMotifAbsence, setNewMotifAbsence] = useState({
    name: "",
  });

  // FETCH
  const fetchMotifsAbsence = async () => {
    try {
      const motifsAbsence = await MOTIFSABSENCE_API.findAll();
      console.log("success fetch", motifsAbsence);
      setMotifsAbsence(motifsAbsence);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchMotifsAbsence();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewMotifAbsence({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MOTIFSABSENCE_API.create(newMotifAbsence);
      console.log("success submit", response);
      setNewMotifAbsence({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchMotifsAbsence();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await MOTIFSABSENCE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchMotifsAbsence();
  };

  // TEMPLATE
  return (
    <main>
      <h1>Liste des motifs d'absence :</h1>
      {motifsAbsence.length === 0 ? (
        <p>Aucun motif d'absence n'est enregistré pour le moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {motifsAbsence.map((m) => (
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
      <h1>Ajouter un motif d'absence :</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom : </label>
        <input
          type="text"
          name="name"
          value={newMotifAbsence.name}
          onChange={handlechange}
          required
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
};

export default AdminMotifsAbsencePage;
