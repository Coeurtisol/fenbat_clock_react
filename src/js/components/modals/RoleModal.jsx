import React, { useState } from "react";
import ROLES_API from "../../services/rolesAPI";
import PERMISSIONS_API from "../../services/permissionsAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const RoleModal = ({ fetchRoles, role }) => {
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    permissionId: "",
  });

  // FETCH FUNCTIONS
  const fetchPermissions = async () => {
    try {
      const permissions = await PERMISSIONS_API.getAll();
      console.log("success fetch permissions", permissions);
      setPermissions(permissions);
    } catch (error) {
      console.log("erreur fetch permissions", error);
      toast.error("Erreur au chargement des permissions.");
    }
  };

  // FUNCTIONS
  const handleShowRoleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (role) {
        setNewRole({
          ...setNewRole,
          name: role.name,
          permissionId: role.permission.id,
        });
      }
      fetchPermissions();
    } else {
      fetchRoles();
    }
  };

  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewRole({ ...newRole, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create role", newRole);
    try {
      const response = await ROLES_API.create(newRole);
      console.log("success create role", response);
      toast.success("Rôle créé.");
      setNewRole({
        name: "",
        permissionId: "",
      });
    } catch (error) {
      console.log("erreur create role", error);
      toast.error("Erreur à la création du rôle.");
    }
    handleShowRoleModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newRole.accessCode;
    console.log("update role", newRole);
    try {
      const response = await ROLES_API.update(role.id, newRole);
      console.log("success update role", response);
      toast.success("Rôle mit à jour.");
      setNewRole({
        name: "",
        permissionId: "",
      });
    } catch (error) {
      console.log("erreur update role", error);
      toast.error("Erreur à la mise à jour du rôle.");
    }
    handleShowRoleModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ROLES_API.deleteOne(id);
      console.log("success delete role", response);
      toast.success("Rôle supprimé.");
    } catch (error) {
      console.log("erreur delete role", error);
      toast.error("Erreur à la suppression du rôle.");
    }
    handleShowRoleModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={role ? "primary" : "success"}
        type="button"
        onClick={handleShowRoleModal}
      >
        {role ? "Editer" : "Nouveau rôle"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowRoleModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {role ? `Modification du rôle : ${role.name}` : "Nouveau rôle"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={role ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du rôle"
                value={newRole.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permission</Form.Label>
              <Form.Select
                name="permissionId"
                onChange={handlechange}
                value={newRole.permissionId}
                required
              >
                {!newRole.permissionId && (
                  <option>Selectionnez l'entité</option>
                )}
                {permissions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {role && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(role.id)}
                >
                  Supprimer
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RoleModal;
