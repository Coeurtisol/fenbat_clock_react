import React, { useState } from "react";
import USERS_API from "../../services/usersAPI";
import ENTITES_API from "../../services/entitesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UserModal = ({ fetchUsers, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [entites, setEntites] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    accessCode: "",
    entiteId: null,
    roleId: 5,
  });
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Responsable de site" },
    { id: 3, name: "Responsable de production" },
    { id: 4, name: "Chef d'équipe" },
    { id: 5, name: "Technicien" },
  ];

  // FETCH
  const fetchUser = async (userId) => {
    try {
      const user = await USERS_API.findOne(userId);
      console.log("success fetch user", user);
      setNewUser({
        ...newUser,
        firstname: user.firstname,
        lastname: user.lastname,
        entiteId: user.entite && user.entite.id,
        roleId: user.role.id,
      });
    } catch (error) {
      console.log("erreur fetch user", error);
      toast.error("Erreur au chargement de l'utilisateur.");
    }
  };

  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch entites", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch entites", error);
      toast.error("Erreur au chargement des entités.");
    }
  };

  const handleShowUserModal = () => {
    setShowModal(!showModal);
    // logique inversée : showModal n'est pas encore à true dans la condition
    if (!showModal) {
      if (userId) {
        fetchUser(userId);
      }
      fetchEntites();
    } else {
      fetchUsers();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    if (name === "accessCode" && value.length > 4) {
      return;
    }
    setNewUser({ ...newUser, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create user", newUser);
    try {
      const response = await USERS_API.create(newUser);
      console.log("success create user", response);
      toast.success("Utilisateur créé.");
      setNewUser({
        firstname: "",
        lastname: "",
        accessCode: "",
        entiteId: 0,
        roleId: 5,
      });
    } catch (error) {
      console.log("erreur create user", error);
      toast.error("Erreur à la création de l'utilisateur.");
    }
    handleShowUserModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    !newUser.accessCode && delete newUser.accessCode;
    console.log("update user", newUser);
    try {
      const response = await USERS_API.update(userId, newUser);
      console.log("success update user", response);
      toast.success("Utilisateur mit à jour.");
      setNewUser({
        firstname: "",
        lastname: "",
        accessCode: "",
        entiteId: null,
        roleId: 5,
      });
    } catch (error) {
      console.log("erreur update user", error);
      toast.error("Erreur à la mise à jour de l'utilisateur.");
    }
    handleShowUserModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await USERS_API.deleteOne(id);
      console.log("success delete user", response);
      toast.success("Utilisateur supprimé.");
    } catch (error) {
      console.log("erreur delete user", error);
      toast.error("Erreur à la suppression de l'utilisateur.");
    }
    handleShowUserModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={userId ? "primary" : "success"}
        type="button"
        onClick={handleShowUserModal}
      >
        {userId ? "Editer" : "Nouvel utilisateur"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowUserModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {userId ? `Modification` : "Nouvel Utilisateur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={userId ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Prénom de l'utilisateur"
                value={newUser.firstname}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Nom de l'utilisateur"
                value={newUser.lastname}
                onChange={handlechange}
                required
              />
            </Form.Group>
            {/* {!userId && ( */}
            <Form.Group className="mb-3">
              <Form.Label>Code d'accès</Form.Label>
              <Form.Control
                type="number"
                name="accessCode"
                placeholder={`Code d'accès de l'utilisateur${
                  userId
                    ? " (laisser vide pour ne pas modifier le code d'accès)"
                    : ""
                }`}
                value={newUser.accessCode}
                onChange={handlechange}
                required={userId ? false : true}
              />
            </Form.Group>
            {/* )} */}
            <Form.Group className="mb-3">
              <Form.Label>Entité</Form.Label>
              <Form.Select
                name="entiteId"
                onChange={handlechange}
                value={newUser.entiteId || ""}
                required
              >
                <option value="0">
                  -- Ne pas assigner d'entité à l'utilisateur --
                </option>
                {entites.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rôle</Form.Label>
              <Form.Select
                name="roleId"
                onChange={handlechange}
                value={newUser.roleId}
                required
              >
                {!newUser.roleId && (
                  <option>Selectionnez le rôle de l'utilisateur</option>
                )}
                {roles.map((r) => (
                  <option key={r.id} value={r.id} disabled={r.id == 1}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {userId && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(userId)}
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

export default UserModal;
