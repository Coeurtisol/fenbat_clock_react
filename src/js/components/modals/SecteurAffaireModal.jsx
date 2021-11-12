import React, { useState } from "react";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import { Form, Button, Modal } from "react-bootstrap";

const SecteurAffaireModal = ({ fetchSecteursAffaire, secteurAffaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [newSecteurAffaire, setNewSecteurAffaire] = useState({
    name: "",
  });

  const handleShowSecteurAffaireModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (secteurAffaire) {
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
      console.log("success create", response);
      setNewSecteurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur create", error);
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
      console.log("success update", response);
      setNewSecteurAffaire({
        name: "",
      });
    } catch (error) {
      console.log("erreur update", error);
    }
    handleShowSecteurAffaireModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await SECTEURSAFFAIRE_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    handleShowSecteurAffaireModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={secteurAffaire ? "primary" : "success"}
        type="button"
        onClick={handleShowSecteurAffaireModal}
      >
        {secteurAffaire ? "Editer" : "Nouveau secteur"}
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
            {secteurAffaire
              ? `Modification du secteur : ${secteurAffaire.name}`
              : "Nouveau secteur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={secteurAffaire ? handleUpdate : handleCreate}>
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
              {secteurAffaire && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(secteurAffaire.id)}
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
