import React, { useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import InputAdresse from "../InputAdresseComponent";

const EntiteModal = ({ fetchEntites, entite }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEntite, setNewEntite] = useState({
    name: "",
    adresse: "",
    coordonnees: "",
  });
  // TODO: revoir gestion des coordonnees
  const [tempCoordonnees, setTempCoordonnees] = useState("");
  const edit = entite ? true : false;

  const handleShowEntiteModal = async () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewEntite({
          ...setNewEntite,
          name: entite.name,
          adresse: entite.adresse,
          coordonnees: entite.coordonnees,
        });
        setTempCoordonnees(entite.coordonnees);
      }
    } else {
      fetchEntites();
    }
  };

  // FUNCTIONS
  const handlechange = async ({ target }) => {
    const { name, value } = target;
    setNewEntite({ ...newEntite, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create entite", newEntite);
    const entite = { ...newEntite, coordonnees: tempCoordonnees };
    try {
      const response = await ENTITES_API.create(entite);
      console.log("success create entite", response);
      toast.success("Entité créée.");
      setNewEntite({
        name: "",
        adresse: "",
        coordonnees: "",
      });
      setTempCoordonnees("");
    } catch (error) {
      console.log("erreur create entite", error);
      toast.error("Erreur à la création de l'entité.");
    }
    handleShowEntiteModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newEntite.accessCode;
    console.log("update entite", newEntite);
    const updatedEntite = { ...newEntite, coordonnees: tempCoordonnees };
    try {
      const response = await ENTITES_API.update(entite.id, updatedEntite);
      console.log("success update entite", response);
      toast.success("Entité mise à jour.");
    } catch (error) {
      console.log("erreur update entite", error);
      toast.error("Erreur à la mise à jour de l'entité.");
    }
    handleShowEntiteModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ENTITES_API.deleteOne(id);
      console.log("success delete entite", response);
      toast.success("Entité supprimée.");
    } catch (error) {
      console.log("erreur delete entite", error);
      toast.error("Erreur à la suppression de l'entité.");
    }
    handleShowEntiteModal();
  };

  // FUNCTIONS
  let entiteUtilisee = false;
  if (edit) {
    if (
      entite.Users.length > 0 ||
      entite.affaires.length > 0 ||
      entite.pointages.length > 0
    ) {
      entiteUtilisee = true;
    }
  }

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowEntiteModal}
      >
        {edit ? "Editer" : "Nouvelle entité"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowEntiteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit
              ? `Modification de l'entité : ${entite.name}`
              : "Nouvelle entité"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'entité"
                value={newEntite.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <InputAdresse
              parentObject={newEntite}
              setParentObject={setNewEntite}
              tempCoordonnees={tempCoordonnees}
              setTempCoordonnees={setTempCoordonnees}
            />
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(entite.id)}
                  disabled={entiteUtilisee}
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

export default EntiteModal;
