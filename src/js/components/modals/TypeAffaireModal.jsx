import React, { useState } from "react";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";

const TypeAffaireModal = ({ fetchTypesAffaire, typeAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTypeAffaire, setNewTypeAffaire] = useState({
    name: "",
  });

  const handleShowTypeAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (typeAffaire) {
        setNewTypeAffaire({
          ...setNewTypeAffaire,
          name: typeAffaire.name,
        });
      }
    } else {
      fetchTypesAffaire();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewTypeAffaire({ ...newTypeAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create typeAffaire", newTypeAffaire);
    try {
      const response = await TYPESAFFAIRE_API.create(newTypeAffaire);
      console.log("success create", response);
      setNewTypeAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create", error);
    }
    handleShowTypeAffaireModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newTypeAffaire.accessCode;
    console.log("update typeAffaire", newTypeAffaire);
    try {
      const response = await TYPESAFFAIRE_API.update(
        typeAffaire.id,
        newTypeAffaire
      );
      console.log("success update", response);
      setNewTypeAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update", error);
    }
    handleShowTypeAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await TYPESAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    handleShowTypeAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={typeAffaire ? "primary" : "success"}
        type="button"
        onClick={handleShowTypeAffaireModal}
      >
        {typeAffaire ? "Editer" : "Nouveau type"}
      </Button>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowTypeAffaireModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {typeAffaire
              ? `Modification du type : ${typeAffaire.name}`
              : "Nouveau type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={typeAffaire ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du type"
                value={newTypeAffaire.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {typeAffaire && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(typeAffaire.id)}
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

export default TypeAffaireModal;
