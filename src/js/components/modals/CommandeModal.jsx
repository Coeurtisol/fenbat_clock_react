import React, { useState } from "react";
import COMMANDES_API from "../../services/commandesAPI";
import AFFAIRES_API from "../../services/affairesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import AUTH_API from "../../services/authAPI";

const CommandeModal = ({ article, commande }) => {
  const [affaires, setAffaires] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCommande, setNewCommande] = useState({
    articleId: "",
    fournisseurId: "",
    quantite: 1,
    affaireId: "",
  });
  let edit = false;
  if (commande) edit = true;

  // FETCH FUNCTIONS
  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch affaires", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch affaires", error);
      toast.error("Erreur au chargement des affaires.");
    }
  };

  // FUNCTIONS
  const handleShowCommandeModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      // if (edit) {
      setNewCommande({
        ...setNewCommande,
        articleId: article.id,
        fournisseurId: "",
        quantite: 1,
        affaireId: "",
      });
      fetchAffaires();
    }
    // } else {
    //   fetchCommandes();
    // }
  };

  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewCommande({ ...newCommande, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create commande", newCommande);
    newCommande.userId = AUTH_API.getId();
    try {
      const response = await COMMANDES_API.create(newCommande);
      console.log("success create commande", response);
      toast.success("Commande créée.");
      setNewCommande({
        articleId: "",
        fournisseurId: "",
        quantite: 1,
        affaireId: "",
      });
    } catch (error) {
      console.log("erreur create commande", error);
      toast.error("Erreur à la création de la commande.");
    }
    handleShowCommandeModal();
  };

  // TEMPLATE
  return (
    <>
      {article.fournisseurs.length > 0 && (
        <Button
          variant="primary"
          type="button"
          onClick={handleShowCommandeModal}
        >
          +
        </Button>
      )}
      {/* <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowCommandeModal}
      > */}
      {/* {edit ? "Editer" : "Nouveau commande"} */}
      {/* </Button> */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowCommandeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? `Détails de la commande` : "Commander"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleCreate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Article</Form.Label>
              <div className="fw-bold fs-4">
                {article.name} ({article.categorie?.name || "non catégorisé"})
              </div>
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <div className="fw-bold"></div>
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                name="quantite"
                value={newCommande.quantite}
                onChange={handlechange}
                min={1}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fournisseur</Form.Label>
              <Form.Select
                name="fournisseurId"
                onChange={handlechange}
                value={newCommande.fournisseurId}
                required
              >
                {!newCommande.fournisseurId && (
                  <option value="">Selectionnez un fournisseur</option>
                )}
                {article.fournisseurs.map((f) => (
                  <option key={f.fournisseur.id} value={f.fournisseur.id}>
                    {f.fournisseur.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Affaire (optionel)</Form.Label>
              <Form.Select
                name="affaireId"
                onChange={handlechange}
                value={newCommande.affaireId}
              >
                <option value="">
                  {newCommande.affaireId
                    ? "Ne pas selectionner d'affaire"
                    : "Selectionnez l'affaire"}
                </option>

                {affaires.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommandeModal;
