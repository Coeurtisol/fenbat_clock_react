import React, { useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import AFFAIRES_API from "../../services/affairesAPI";
import { Form, Button, Modal } from "react-bootstrap";

const UserModal = ({ fetchAffaires, affaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [entites, setEntites] = useState([]);
  const [typesAffaire, setTypesAffaire] = useState([]);
  const [secteursAffaire, setSecteursAffaire] = useState([]);
  const etatsAffaire = ["En cours", "SAV", "Assurance", "Cloturé"];
  const [newAffaire, setNewAffaire] = useState({
    name: "",
    secteurAffaireId: "",
    typeAffaireId: "",
    etat: "En cours",
    entiteId: "",
  });

  // FETCH
  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const handleShowUserModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (affaire) {
        setNewAffaire({
          ...newAffaire,
          name: affaire.name,
          secteurAffaireId: affaire.secteurAffaire.id,
          typeAffaireId: affaire.typeAffaire.id,
          etat: affaire.etat,
          entiteId: affaire.entite.id,
        });
      }
      fetchEntites();
      fetchTypesAffaire();
      fetchSecteursAffaire();
    } else {
      fetchAffaires();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewAffaire({ ...newAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create affaire", newAffaire);
    try {
      const response = await AFFAIRES_API.create(newAffaire);
      console.log("success create", response);
      setNewAffaire({
        name: "",
        secteurAffaireId: "",
        typeAffaireId: "",
        etat: "En cours",
        entiteId: "",
      });
    } catch (error) {
      console.log("erreur create", error);
    }
    handleShowUserModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update affaire", newAffaire);
    try {
      const response = await AFFAIRES_API.update(affaire.id, newAffaire);
      console.log("success update", response);
      setNewAffaire({
        name: "",
        secteurAffaireId: "",
        typeAffaireId: "",
        etat: "En cours",
        entiteId: "",
      });
    } catch (error) {
      console.log("erreur update", error);
    }
    handleShowUserModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await AFFAIRES_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    handleShowUserModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={affaire ? "primary" : "success"}
        type="button"
        onClick={handleShowUserModal}
      >
        {affaire ? "Editer" : "Nouvelle affaire"}
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
            {affaire ? `Modification` : "Nouvelle affaire"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={affaire ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'affaire"
                value={newAffaire.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Entité</Form.Label>
              <Form.Select
                name="entiteId"
                onChange={handlechange}
                value={newAffaire.entiteId}
              >
                <option>Selectionnez l'entité</option>
                {entites.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="typeAffaireId"
                onChange={handlechange}
                value={newAffaire.typeAffaireId}
              >
                <option>Selectionnez le type d'affaire</option>
                {typesAffaire.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Secteur</Form.Label>
              <Form.Select
                name="secteurAffaireId"
                onChange={handlechange}
                value={newAffaire.secteurAffaireId}
              >
                <option>Selectionnez le secteur de l'affaire</option>
                {secteursAffaire.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {affaire && (
              <Form.Group className="mb-3">
                <Form.Label>Etat</Form.Label>
                <Form.Select
                  name="etat"
                  onChange={handlechange}
                  value={newAffaire.etat}
                >
                  {etatsAffaire.map((e, k) => (
                    <option key={k} value={e}>
                      {e}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {affaire && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(affaire.id)}
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
