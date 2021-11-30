import React, { useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const EntiteModal = ({ fetchEntites, entite }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEntite, setNewEntite] = useState({
    name: "",
  });

  const handleShowEntiteModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (entite) {
        setNewEntite({ ...setNewEntite, name: entite.name });
      }
    } else {
      fetchEntites();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewEntite({ ...newEntite, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create entite", newEntite);
    try {
      const response = await ENTITES_API.create(newEntite);
      console.log("success create entite", response);
      toast.success("Entité créée.");
      setNewEntite({
        name: "",
      });
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
    try {
      const response = await ENTITES_API.update(entite.id, newEntite);
      console.log("success update entite", response);
      toast.success("Entité mise à jour.");
      setNewEntite({
        name: "",
      });
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

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={entite ? "primary" : "success"}
        type="button"
        onClick={handleShowEntiteModal}
      >
        {entite ? "Editer" : "Nouvelle entité"}
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
            {entite
              ? `Modification de l'entité : ${entite.name}`
              : "Nouvelle entité"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={entite ? handleUpdate : handleCreate}>
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
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {entite && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(entite.id)}
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
