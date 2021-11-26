import React, { useEffect, useState } from "react";
import USERS_API from "../../services/usersAPI";
import { Table } from "react-bootstrap";
import UserModal from "../../components/modals/UserModal";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  // FETCH
  const fetchUsers = async () => {
    try {
      const users = await USERS_API.findAll();
      // console.log("success fetch", users);
      setUsers(users);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text">
      <h1 className="text-center">Utilisateurs</h1>
      {users.length === 0 ? (
        <p>Aucun utilisateur n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Prénom Nom</th>
              <th className="text-center">Rôle</th>
              <th className="text-center">Entité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.firstname} {u.lastname}
                </td>
                <td>{u.role.name}</td>
                <td>{u.entite && u.entite.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <UserModal fetchUsers={fetchUsers} userId={u.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <UserModal fetchUsers={fetchUsers} />
    </main>
  );
};

export default AdminUsersPage;
