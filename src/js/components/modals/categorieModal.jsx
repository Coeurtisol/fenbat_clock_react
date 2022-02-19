import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CATEGORIES_API from "../../services/categoriesAPI";

const CategorieModal = ({ fetchCategories, categorie }) => {
  const edit = categorie && true;
  const [showModal, setShowModal] = useState(false);
  const [newCategorie, setNewCategorie] = useState({ name: "" });

  const handleShowCategorieModal = () => {
    setShowModal(!showModal);
    if (edit) {
      setNewCategorie({ ...newCategorie, name: categorie.name });
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewCategorie({ [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await CATEGORIES_API.create(newCategorie);
      console.log("success create categorie", response);
      toast.success("Catégorie créée.");
      setNewCategorie({
        name: "",
      });
    } catch (error) {
      console.log("erreur create categorie", error);
      toast.error("Erreur à la création de la catégorie.");
    }
    fetchCategories();
    handleShowCategorieModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update categorie", newCategorie);
    try {
      const response = await CATEGORIES_API.update(categorie.id, newCategorie);
      console.log("success update categorie", response);
      toast.success("Catégorie mise à jour.");
      setNewCategorie({
        name: "",
      });
    } catch (error) {
      console.log("erreur update categorie", error);
      toast.error("Erreur à la mise à jour de la catégorie.");
    }
    fetchCategories();
    handleShowCategorieModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await CATEGORIES_API.deleteOne(id);
      console.log("success delete categorie", response);
      toast.success("Catégorie supprimée.");
    } catch (error) {
      console.log("erreur delete categorie", error);
      toast.error("Erreur à la suppression de la catégorie.");
    }
    fetchCategories();
    handleShowCategorieModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className={`btn btn-primary ${edit ? "btn-sm my-0" : "my-2"}`}
        onClick={handleShowCategorieModal}
      >
        {edit ? "Modifier la catégorie" : "Ajouter une catégorie"}
      </Button>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowCategorieModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? "Modifier la catégorie" : "Ajouter une catégorie"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
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
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(categorie.id)}
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

export default CategorieModal;
