import React, { useEffect, useState } from "react";
import USERS_API from "../../services/usersAPI";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    accessCode: "",
  });

  // FETCH
  const fetchUsers = async () => {
    try {
      const users = await USERS_API.findAll();
      console.log("success fetch", users);
      setUsers(users);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    if (name === "accessCode" && value.length > 4) {
      return;
    }
    setNewUser({ ...newUser, [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await USERS_API.create(newUser);
      console.log("success submit", response);
      setNewUser({
        firstname: "",
        lastname: "",
        accessCode: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchUsers();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await USERS_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchUsers();
  };

  // TEMPLATE
  return (
    <main>
      <h1>Liste des utilisateurs :</h1>
      {users.length === 0 ? (
        <p>Aucun utilisateur n'est enregistré pour le moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Prénom</th>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {users.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.firstname}</td>
                <td>{w.lastname}</td>
                <td>
                  <button onClick={() => handleDelete(w.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <h1>Ajouter un utilisateur :</h1>
      <form onSubmit={handleSubmit}>
        <label>Prénom : </label>
        <input
          type="text"
          name="firstname"
          value={newUser.firstname}
          onChange={handlechange}
          minLength="2"
          required
        />
        <br />
        <label>Nom : </label>
        <input
          type="text"
          name="lastname"
          value={newUser.lastname}
          onChange={handlechange}
          minLength="2"
          required
        />
        <br />
        <label>Code d'accès : </label>
        <input
          type="number"
          name="accessCode"
          value={newUser.accessCode}
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

export default AdminUsersPage;
