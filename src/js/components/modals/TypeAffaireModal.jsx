import React, { useState } from "react";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const TypeAffaireModal = ({ fetchTypesAffaire, typeAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTypeAffaire, setNewTypeAffaire] = useState({
    name: "",
  });
  let edit = false;
  if (typeAffaire) edit = true;

  const handleShowTypeAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
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
      console.log("success create typesAffaire", response);
      toast.success("Corps d'état créé.");
      setNewTypeAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create typesAffaire", error);
      toast.error("Erreur à la création du corps d'état.");
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
      console.log("success update typesAffaire", response);
      toast.success("Corps d'état mit à jour.");
      setNewTypeAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update typesAffaire", error);
      toast.error("Erreur à la mise à jour du corps d'état.");
    }
    handleShowTypeAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await TYPESAFFAIRE_API.deleteOne(id);
      console.log("success delete typesAffaire", response);
      toast.success("Corps d'état surpprimé.");
    } catch (error) {
      console.log("erreur delete typesAffaire", error);
      toast.error("Erreur à la suppression du corps d'état.");
    }
    handleShowTypeAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowTypeAffaireModal}
      >
        {edit ? "Editer" : "Nouveau corps d'état"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowTypeAffaireModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit
              ? `Modification du corps d'état : ${typeAffaire.name}`
              : "Nouveau corps d'état"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
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
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(typeAffaire.id)}
                  disabled={typeAffaire.affaires.length > 0}
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
