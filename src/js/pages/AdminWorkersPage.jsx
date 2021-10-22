import React, { useEffect, useState } from "react";
import WORKERS_API from "../services/workersAPI";

const AdminWorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    firstname: "",
    lastname: "",
    accessCode: "",
  });

  const fetchWorkers = async () => {
    try {
      const workers = await WORKERS_API.findAll();
      console.log("success fetch", workers);
      setWorkers(workers);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handlechange = ({ target }) => {
    const { name, value } = target;
    if (name === "accessCode" && value.length > 4) {
      return;
    }
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await WORKERS_API.create(newWorker);
      console.log("success submit", response);
      setNewWorker({
        firstname: "",
        lastname: "",
        accessCode: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchWorkers();
  };

  const handleDelete = async (id) => {
    try {
      const response = await WORKERS_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchWorkers();
  };

  return (
    <main>
      <h1>Liste des employés :</h1>
      {workers.length === 0 ? (
        <p>Aucun employé n'est enregistré pour le moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Code d'accèss</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.firstname}</td>
                <td>{w.lastname}</td>
                <td>{w.accessCode}</td>
                <td>
                  <button onClick={() => handleDelete(w.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <h1>Ajouter un employé :</h1>
      <form onSubmit={handleSubmit}>
        <label>Prénom : </label>
        <input
          type="text"
          name="firstname"
          value={newWorker.firstname}
          onChange={handlechange}
          minLength="2"
          required
        />
        <br />
        <label>Nom : </label>
        <input
          type="text"
          name="lastname"
          value={newWorker.lastname}
          onChange={handlechange}
          minLength="2"
          required
        />
        <br />
        <label>Code d'accès : </label>
        <input
          type="number"
          name="accessCode"
          value={newWorker.accessCode}
          onChange={handlechange}
          minLength="4"
          required
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
};

export default AdminWorkersPage;
