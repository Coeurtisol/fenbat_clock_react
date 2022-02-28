import React, { useState } from "react";
import USERS_API from "../../services/usersAPI";
import ENTITES_API from "../../services/entitesAPI";
import ROLES_API from "../../services/rolesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UserModal = ({ fetchUsers, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [lockedSubmit, setLockedSubmit] = useState(false);
  const [entites, setEntites] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    accessCode: "",
    password: "",
    entiteId: null,
    roleId: 5,
    status: "1",
  });
  let edit = false;
  if (user) edit = true;

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

  // HANDLE FUNCTIONS
  const handleShowUserModal = () => {
    setShowModal(!showModal);
    // logique inversée : showModal n'est pas encore à true dans la condition
    if (!showModal) {
      if (edit) {
        setNewUser({
          ...newUser,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          entiteId: user.entite && user.entite.id,
          roleId: user.role.id,
          status: user.status ? "1" : "0",
        });
      }
      fetchEntites();
      fetchRoles();
    } else {
      fetchUsers();
    }
  };
  const handlechange = ({ target }) => {
    const { name, value } = target;
    if (name === "accessCode") {
      if (value.length > 0 && value.length < 4) {
        setLockedSubmit(true);
      } else {
        setLockedSubmit(false);
      }
      if (value.length > 4) {
        return;
      }
    }
    setNewUser({ ...newUser, [name]: value });
  };
  // console.log(newUser);

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
        email: "",
        phoneNumber: "",
        accessCode: "",
        password: "",
        entiteId: 0,
        roleId: 5,
        status: "1",
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
    !newUser.password && delete newUser.password;
    console.log("update user", newUser);
    try {
      const response = await USERS_API.update(user.id, newUser);
      console.log("success update user", response);
      toast.success("Utilisateur mit à jour.");
      setNewUser({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        accessCode: "",
        password: "",
        entiteId: null,
        roleId: 5,
        status: "1",
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

  // FUNCTIONS
  let utilisateurActif = false;
  if (edit) {
    if (user.pointages.length > 0 || user.commandes.length > 0) {
      utilisateurActif = true;
    }
  }

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowUserModal}
      >
        {edit ? "Editer" : "Nouvel utilisateur"}
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
            {edit ? `Modification` : "Nouvel Utilisateur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
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
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Adresse email de l'utilisateur"
                value={newUser.email || ""}
                onChange={handlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Numéro de téléphone de l'utilisateur"
                value={newUser.phoneNumber || ""}
                onChange={handlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Code d'accès (4 chiffres)</Form.Label>
              <Form.Control
                type="number"
                name="accessCode"
                placeholder={`Code d'accès de l'utilisateur${
                  edit
                    ? " (laisser vide pour ne pas modifier)"
                    : ""
                }`}
                value={newUser.accessCode}
                onChange={handlechange}
                required={edit ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={`Mot de passe de l'utilisateur${
                  edit
                    ? " (laisser vide pour ne pas modifier)"
                    : ""
                }`}
                value={newUser.password}
                onChange={handlechange}
                minLength="4"
                required={edit ? false : true}
              />
            </Form.Group>
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
                  <React.Fragment key={r.id}>
                    {r.id != 1 && <option value={r.id}>{r.name}</option>}
                  </React.Fragment>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Actif</Form.Label>
              <Form.Check
                onChange={handlechange}
                type="radio"
                name="status"
                label="Oui"
                value={"1"}
                checked={newUser.status == "1"}
              />
              <Form.Check
                onChange={handlechange}
                type="radio"
                name="status"
                label="Non"
                value={"0"}
                checked={newUser.status == "0"}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" disabled={lockedSubmit}>
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  disabled={utilisateurActif}
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
