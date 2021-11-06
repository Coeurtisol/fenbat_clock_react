import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import CATEGORIES_API from "../../services/categoriesAPI";

const CategorieModal = ({ fetchCategories }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCategorie, setNewCategorie] = useState({ name: "" });

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewCategorie({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CATEGORIES_API.create(newCategorie);
      console.log("success submit", response);
      setNewCategorie({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchCategories();
    setShowModal(!showModal);
  };

  // TEMPLATE
  return (
    <>
      <button
        style={{ padding: "6px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Ajouter une catégorie
      </button>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la catégorie"
                value={newCategorie.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategorieModal;
