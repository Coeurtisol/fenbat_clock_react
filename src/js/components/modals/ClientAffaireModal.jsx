import React, { useState } from "react";
import CLIENTSAFFAIRE_API from "../../services/clientsAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";

const ClientAffaireModal = ({ fetchClientsAffaire, clientAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newClientAffaire, setNewClientAffaire] = useState({
    name: "",
  });

  const handleShowClientAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (clientAffaire) {
        setNewClientAffaire({
          ...setNewClientAffaire,
          name: clientAffaire.name,
        });
      }
    } else {
      fetchClientsAffaire();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewClientAffaire({ ...newClientAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create clientAffaire", newClientAffaire);
    try {
      const response = await CLIENTSAFFAIRE_API.create(newClientAffaire);
      console.log("success create", response);
      setNewClientAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create", error);
    }
    handleShowClientAffaireModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newClientAffaire.accessCode;
    console.log("update clientAffaire", newClientAffaire);
    try {
      const response = await CLIENTSAFFAIRE_API.update(
        clientAffaire.id,
        newClientAffaire
      );
      console.log("success update", response);
      setNewClientAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update", error);
    }
    handleShowClientAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await CLIENTSAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    handleShowClientAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={clientAffaire ? "primary" : "success"}
        type="button"
        onClick={handleShowClientAffaireModal}
      >
        {clientAffaire ? "Editer" : "Nouveau type de client"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowClientAffaireModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {clientAffaire
              ? `Modification du type de client : ${clientAffaire.name}`
              : "Nouveau type de client"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={clientAffaire ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du type client"
                value={newClientAffaire.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {clientAffaire && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(clientAffaire.id)}
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

export default ClientAffaireModal;
