import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ARTICLES_API from "../../services/articlesAPI";

const ArticleModal = ({
  fetchArticles,
  currentCategorie,
  categories,
  article,
}) => {
  const edit = article && true;
  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    name: "",
    categorieId: currentCategorie,
  });

  const handleShowArticleModal = () => {
    setShowModal(!showModal);
    if (edit) {
      setNewArticle({ name: article.name, categorieId: article.categorie?.id });
    } else {
      setNewArticle({ ...newArticle, categorieId: currentCategorie });
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await ARTICLES_API.create(newArticle);
      console.log("success create article", response);
      toast.success("Article créé.");
      setNewArticle({
        name: "",
        categorieId: currentCategorie,
      });
    } catch (error) {
      console.log("erreur create article", error);
      toast.error("Erreur à la création de l'article.");
    }
    fetchArticles();
    handleShowArticleModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update article", newArticle);
    try {
      const response = await ARTICLES_API.update(article.id, newArticle);
      console.log("success update article", response);
      toast.success("Article mit à jour.");
      setNewArticle({
        name: "",
        categorieId: "",
      });
    } catch (error) {
      console.log("erreur update article", error);
      toast.error("Erreur à la mise à jour de l'article.");
    }
    fetchArticles();
    handleShowArticleModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ARTICLES_API.deleteOne(id);
      console.log("success delete article", response);
      toast.success("Article supprimé.");
    } catch (error) {
      console.log("erreur delete article", error);
      toast.error("Erreur à la suppression de l'article.");
    }
    fetchArticles();
    handleShowArticleModal();
  };

  // TEMPLATE
  return (
    <>
      <div className="text-center">
        <Button
          className={`btn btn-primary ${edit ? "btn-sm" : ""}`}
          onClick={handleShowArticleModal}
        >
          {edit ? "Modifier l'article" : "Ajouter un article"}
        </Button>
      </div>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowArticleModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? "Modifier l'article" : "Ajouter un article"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
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
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="categorieId"
                onChange={handlechange}
                value={newArticle.categorieId || ""}
              >
                <option value="">Selectionner une catégorie</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(article.id)}
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

export default ArticleModal;
