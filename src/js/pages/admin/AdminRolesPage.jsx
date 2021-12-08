import React, { useEffect, useState } from "react";
import ROLES_API from "../../services/rolesAPI";
import { Table } from "react-bootstrap";
import RoleModal from "../../components/modals/RoleModal";
import { toast } from "react-toastify";

const AdminRolesPage = () => {
  const [roles, setRoles] = useState([]);

  // FETCH
  const fetchRoles = async () => {
    try {
      const roles = await ROLES_API.findAll();
      console.log("success fetch roles", roles);
      setRoles(roles);
    } catch (error) {
      console.log("erreur fetch roles", error);
      toast.error("Erreur au chargement des rôles.");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text">
      <h1 className="text-center">Rôles</h1>
      {roles.length === 0 ? (
        <p>Aucun rôle n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du rôle</th>
              <th className="text-center">Permission du rôle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.permission.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <RoleModal fetchRoles={fetchRoles} role={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <RoleModal fetchRoles={fetchRoles} />
    </main>
  );
};

export default AdminRolesPage;
