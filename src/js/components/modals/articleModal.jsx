import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ARTICLES_API from "../../services/articlesAPI";

const ArticleModal = ({ fetchArticles, currentCategorie }) => {
  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    name: "",
  });

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    console.log(newArticle);
    e.preventDefault();
    const article = { name: newArticle.name, categorieId: currentCategorie };
    try {
      const response = await ARTICLES_API.create(article);
      console.log("success create article", response);
      toast.error("Article créé.")
      setNewArticle({
        name: "",
        categorieId: currentCategorie,
      });
    } catch (error) {
      console.log("erreur create article", error);
      toast.error("Erreur à la création de l'article.")
    }
    fetchArticles();
    setShowModal(!showModal);
  };

  // TEMPLATE
  return (
    <>
      <div className="text-center">
        <button
          style={{ padding: "6px" }}
          onClick={() => setShowModal(!showModal)}
        >
          Ajouter un article
        </button>
      </div>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'article"
                value={newArticle.name}
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

export default ArticleModal;
