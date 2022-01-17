import React, { useState } from "react";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const SecteurAffaireModal = ({ fetchSecteursAffaire, secteurAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newSecteurAffaire, setNewSecteurAffaire] = useState({
    name: "",
  });
  let edit = false;
  if (secteurAffaire) edit = true;

  const handleShowSecteurAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewSecteurAffaire({
          ...setNewSecteurAffaire,
          name: secteurAffaire.name,
        });
      }
    } else {
      fetchSecteursAffaire();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewSecteurAffaire({ ...newSecteurAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create secteurAffaire", newSecteurAffaire);
    try {
      const response = await SECTEURSAFFAIRE_API.create(newSecteurAffaire);
      console.log("success create secteurAffaire", response);
      toast.success("Secteur d'affaires créé.");
      setNewSecteurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create secteurAffaire", error);
      toast.error("Erreur à la création du secteur d'affaires.");
    }
    handleShowSecteurAffaireModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newSecteurAffaire.accessCode;
    console.log("update secteurAffaire", newSecteurAffaire);
    try {
      const response = await SECTEURSAFFAIRE_API.update(
        secteurAffaire.id,
        newSecteurAffaire
      );
      console.log("success update secteurAffaire", response);
      toast.success("Secteur d'affaire mit à jour.");
      setNewSecteurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update secteurAffaire", error);
      toast.error("Erreur à la mise à jour du secteur d'affaires.");
    }
    handleShowSecteurAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await SECTEURSAFFAIRE_API.deleteOne(id);
      console.log("success delete secteurAffaire", response);
      toast.success("Secteur d'affaires supprimé.");
    } catch (error) {
      console.log("erreur delete secteurAffaire", error);
      toast.error("Erreur à la suppression du secteur d'affaires.");
    }
    handleShowSecteurAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowSecteurAffaireModal}
      >
        {edit ? "Editer" : "Nouveau secteur"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowSecteurAffaireModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit
              ? `Modification du secteur : ${secteurAffaire.name}`
              : "Nouveau secteur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du secteur"
                value={newSecteurAffaire.name}
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
                  onClick={() => handleDelete(secteurAffaire.id)}
                  disabled={secteurAffaire.affaires.length > 0}
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

export default SecteurAffaireModal;
