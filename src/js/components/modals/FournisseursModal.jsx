import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import FOURNISSEURS_API from "../../services/fournisseursAPI";

const FournisseursModal = ({ fetchFournisseurs, fournisseur }) => {
  const edit = fournisseur && true;
  const [showModal, setShowModal] = useState(false);
  const [newFournisseur, setNewFournisseur] = useState({ name: "" });

  const handleShowFournisseurModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewFournisseur({ ...newFournisseur, name: fournisseur.name });
      }
    } else {
      fetchFournisseurs();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewFournisseur({ [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await FOURNISSEURS_API.create(newFournisseur);
      console.log("success create fournisseur", response);
      toast.success("Fournisseur créé.");
      setNewFournisseur({
        name: "",
      });
    } catch (error) {
      console.log("erreur create fournisseur", error);
      toast.error("Erreur à la création du fournisseur.");
    }
    fetchFournisseurs();
    handleShowFournisseurModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update fournisseur", newFournisseur);
    try {
      const response = await FOURNISSEURS_API.update(
        fournisseur.id,
        newFournisseur
      );
      console.log("success update fournisseur", response);
      toast.success("Fournisseur mit à jour.");
      setNewFournisseur({
        name: "",
      });
    } catch (error) {
      console.log("erreur update fournisseur", error);
      toast.error("Erreur à la mise à jour du fournisseur.");
    }
    fetchFournisseurs();
    handleShowFournisseurModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await FOURNISSEURS_API.deleteOne(id);
      console.log("success delete fournisseur", response);
      toast.success("Fournisseur supprimé.");
    } catch (error) {
      console.log("erreur delete fournisseur", error);
      toast.error("Erreur à la suppression du fournisseur.");
    }
    fetchFournisseurs();
    handleShowFournisseurModal();
  };

  // FUNCTIONS
  let fournisseurUtilise = false;
  if (edit) {
    if (fournisseur._count.commandes) {
      fournisseurUtilise = true;
    }
  }

  // TEMPLATE
  return (
    <>
      <Button
        className={`btn ${
          edit ? "btn-primary btn-sm my-0" : "btn-success my-2"
        }`}
        onClick={handleShowFournisseurModal}
      >
        {edit ? "Editer" : "Nouveau fournisseur"}
      </Button>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowFournisseurModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du fournisseur"
                value={newFournisseur.name}
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
                  onClick={() => handleDelete(fournisseur.id)}
                  disabled={fournisseurUtilise}
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

export default FournisseursModal;
