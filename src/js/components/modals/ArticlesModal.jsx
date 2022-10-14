import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ARTICLES_API from "../../services/articlesAPI";
import CATEGORIES_API from "../../services/categoriesAPI";
import FOURNISSEURS_API from "../../services/fournisseursAPI";

const ArticlesModal = ({ fetchArticles, article }) => {
  const edit = article && true;
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const articleModel = {
    name: "",
    categorieId: "",
    fournisseursId: [],
  };
  const [newArticle, setNewArticle] = useState({ ...articleModel });

  // FETCH
  const fetchFournisseurs = async () => {
    try {
      const data = await FOURNISSEURS_API.findAll();
      console.log("success fetch fournisseur", data);
      setFournisseurs(data);
    } catch (error) {
      console.log("erreur fetch fournisseur", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await CATEGORIES_API.findAll();
      console.log("success fetch categorie", data);
      setCategories(data);
    } catch (error) {
      console.log("erreur fetch categorie", error);
    }
  };

  // MODAL GESTION
  const handleShowArticleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewArticle({
          name: article.name,
          categorieId: article.categorie?.id,
          fournisseursId: article.fournisseurs.map((f) => f.id),
        });
      }
      fetchCategories();
      fetchFournisseurs();
    } else {
      fetchArticles();
    }
  };

  // HANDLE CHANGE FUNCTIONS
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleChangeFournisseurs = ({ target }) => {
    const { selectedOptions } = target;
    const selectedFournisseursId = [...selectedOptions].map(
      (item) => item.value
    );
    setNewArticle({ ...newArticle, fournisseursId: selectedFournisseursId });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await ARTICLES_API.create(newArticle);
      console.log("success create article", response);
      toast.success("Article créé.");
      setNewArticle({ ...articleModel });
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
      setNewArticle({ ...articleModel });
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
      <Button
        className={`btn ${
          edit ? "btn-primary btn-sm my-0" : "btn-success my-2"
        }`}
        onClick={handleShowArticleModal}
      >
        {edit ? "Editer" : "Nouvel article"}
      </Button>
      <Modal
        size="md"
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
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="categorieId"
                onChange={handleChange}
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
            <Form.Group className="mb-3">
              <Form.Label>Fournisseurs</Form.Label>
              <Form.Select
                multiple
                name="fournisseurs"
                onChange={handleChangeFournisseurs}
                value={newArticle.fournisseursId}
                required
              >
                {fournisseurs.map((f) => (
                  <option
                    key={f.id}
                    value={f.id}
                    // selected={newArticle.fournisseurs?.includes(f)}
                  >
                    {f.name}
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
                  disabled={edit && article._count.commandes}
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

export default ArticlesModal;
