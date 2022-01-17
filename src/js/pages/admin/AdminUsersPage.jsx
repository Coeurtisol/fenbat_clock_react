import React, { useEffect, useState } from "react";
import USERS_API from "../../services/usersAPI";
import { Table } from "react-bootstrap";
import UserModal from "../../components/modals/UserModal";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  // FETCH
  const fetchUsers = async () => {
    try {
      const users = await USERS_API.findAll();
      console.log("success fetch users", users);
      setUsers(users);
    } catch (error) {
      console.log("erreur fetch users", error);
      toast.error("Erreur au chargement des utilisateurs.");
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
              <th className="text-center">Email</th>
              <th className="text-center">N° téléphone</th>
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
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.role.name}</td>
                <td>{u.entite && u.entite.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <UserModal fetchUsers={fetchUsers} user={u} />
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
