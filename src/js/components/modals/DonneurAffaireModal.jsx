import React, { useState } from "react";
import DONNEURSAFFAIRE_API from "../../services/donneursAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const DonneurAffaireModal = ({ fetchDonneursAffaire, donneurAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newDonneurAffaire, setNewDonneurAffaire] = useState({
    name: "",
  });
  let edit = false;
  if (donneurAffaire) edit = true;

  const handleShowDonneurAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewDonneurAffaire({
          ...setNewDonneurAffaire,
          name: donneurAffaire.name,
        });
      }
    } else {
      fetchDonneursAffaire();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewDonneurAffaire({ ...newDonneurAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create donneurAffaire", newDonneurAffaire);
    try {
      const response = await DONNEURSAFFAIRE_API.create(newDonneurAffaire);
      console.log("success create donneurAffaire", response);
      toast.success("Donneur d'affaires créé.");
      setNewDonneurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create donneurAffaire", error);
      toast.error("Erreur à la création du donneur d'affaires.");
    }
    handleShowDonneurAffaireModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newDonneurAffaire.accessCode;
    console.log("update donneurAffaire", newDonneurAffaire);
    try {
      const response = await DONNEURSAFFAIRE_API.update(
        donneurAffaire.id,
        newDonneurAffaire
      );
      console.log("success update donneurAffaire", response);
      toast.success("Donneur d'affaire mit à jour.");
      setNewDonneurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update donneurAffaire", error);
      toast.error("Erreur à la mise à jour du donneur d'affaires.");
    }
    handleShowDonneurAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await DONNEURSAFFAIRE_API.deleteOne(id);
      console.log("success delete donneurAffaire", response);
      toast.success("Donneur d'affaires supprimé.");
    } catch (error) {
      console.log("erreur delete donneurAffaire", error);
      toast.error("Erreur à la suppression du donneur d'affaires.");
    }
    handleShowDonneurAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowDonneurAffaireModal}
      >
        {edit ? "Editer" : "Nouveau donneur d'ordre"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowDonneurAffaireModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit
              ? `Modification du donneur d'ordre : ${donneurAffaire.name}`
              : "Nouveau donneur d'ordre"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du donneur d'ordre"
                value={newDonneurAffaire.name}
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
                  onClick={() => handleDelete(donneurAffaire.id)}
                  disabled={donneurAffaire.affaires.length > 0}
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

export default DonneurAffaireModal;
