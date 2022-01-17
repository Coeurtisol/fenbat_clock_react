import React, { useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import CLIENTSAFFAIRE_API from "../../services/clientsAffaireAPI";
import DONNEURSAFFAIRE_API from "../../services/donneursAffaireAPI";
import AFFAIRES_API from "../../services/affairesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UserModal = ({ fetchAffaires, affaire }) => {
  const [showModal, setShowModal] = useState(false);
  const [entites, setEntites] = useState([]);
  const [typesAffaire, setTypesAffaire] = useState([]);
  const [secteursAffaire, setSecteursAffaire] = useState([]);
  const [clientsAffaire, setClientsAffaire] = useState([]);
  const [donneursAffaire, setDonneursAffaire] = useState([]);
  const etatsAffaire = ["En cours", "SAV", "Assurance", "Cloturé"];
  const [newAffaire, setNewAffaire] = useState({
    name: "",
    secteurAffaireId: "",
    typeAffaireId: "",
    clientAffaireId: "",
    donneurAffaireId: "",
    etat: "En cours",
    entiteId: "",
  });
  let edit = false;
  if (affaire) edit = true;

  // FETCH FUNCTIONS
  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch entites", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch entites", error);
      toast.error("Erreur au chargement des entités.");
    }
  };

  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch typesAffaire", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch typesAffaire", error);
      toast.error("Erreur au chargement des corps d'état.");
    }
  };

  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch secteursAffaire", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch secteursAffaire", error);
      toast.error("Erreur au chargement des secteurs.");
    }
  };

  const fetchClientsAffaire = async () => {
    try {
      const clientsAffaire = await CLIENTSAFFAIRE_API.findAll();
      console.log("success fetch clientsAffaire", clientsAffaire);
      setClientsAffaire(clientsAffaire);
    } catch (error) {
      console.log("erreur fetch clientsAffaire", error);
      toast.error("Erreur au chargement des types de clients.");
    }
  };

  const fetchDonneursAffaire = async () => {
    try {
      const donneursAffaire = await DONNEURSAFFAIRE_API.findAll();
      console.log("success fetch donneursAffaire", donneursAffaire);
      setDonneursAffaire(donneursAffaire);
    } catch (error) {
      console.log("erreur fetch donneursAffaire", error);
      toast.error("Erreur au chargement des types de donneurs.");
    }
  };

  // HANDLE FUNCTIONS
  const handleShowUserModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewAffaire({
          ...newAffaire,
          name: affaire.name,
          secteurAffaireId: affaire.secteurAffaire.id,
          typeAffaireId: affaire.typeAffaire.id,
          clientAffaireId: affaire.clientAffaire.id,
          donneurAffaireId: affaire.donneurAffaire.id,
          etat: affaire.etat,
          entiteId: affaire.entite.id,
        });
      }
      fetchEntites();
      fetchTypesAffaire();
      fetchSecteursAffaire();
      fetchClientsAffaire();
      fetchDonneursAffaire();
    } else {
      fetchAffaires();
    }
  };

  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewAffaire({ ...newAffaire, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create affaire", newAffaire);
    try {
      const response = await AFFAIRES_API.create(newAffaire);
      console.log("success create", response);
      setNewAffaire({
        name: "",
        secteurAffaireId: "",
        typeAffaireId: "",
        clientAffaireId: "",
        donneurAffaireId: "",
        etat: "En cours",
        entiteId: "",
      });
    } catch (error) {
      console.log("erreur create", error);
    }
    handleShowUserModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update affaire", newAffaire);
    try {
      const response = await AFFAIRES_API.update(affaire.id, newAffaire);
      console.log("success update", response);
      setNewAffaire({
        name: "",
        secteurAffaireId: "",
        typeAffaireId: "",
        clientAffaireId: "",
        donneurAffaireId: "",
        etat: "En cours",
        entiteId: "",
      });
    } catch (error) {
      console.log("erreur update", error);
    }
    handleShowUserModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await AFFAIRES_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    handleShowUserModal();
  };

  // FUNCTIONS
  let affaireUtilisee = false;
  if (edit) {
    if (affaire.pointages.length > 0 || affaire.commandes.length > 0) {
      affaireUtilisee = true;
    }
  }

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowUserModal}
      >
        {edit ? "Editer" : "Nouvelle affaire"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowUserModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? `Modification` : "Nouvelle affaire"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'affaire"
                value={newAffaire.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Entité</Form.Label>
              <Form.Select
                name="entiteId"
                onChange={handlechange}
                value={newAffaire.entiteId}
                required
              >
                {!newAffaire.entiteId && (
                  <option value="">Selectionnez l'entité</option>
                )}
                {entites.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Donneur d'ordre</Form.Label>
              <Form.Select
                name="donneurAffaireId"
                onChange={handlechange}
                value={newAffaire.donneurAffaireId}
                required
              >
                {!newAffaire.donneurAffaireId && (
                  <option value="">
                    Selectionnez le donneur d'ordre de l'affaire
                  </option>
                )}
                {donneursAffaire.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type de client</Form.Label>
              <Form.Select
                name="clientAffaireId"
                onChange={handlechange}
                value={newAffaire.clientAffaireId}
                required
              >
                {!newAffaire.clientAffaireId && (
                  <option value="">
                    Selectionnez le type de client de l'affaire
                  </option>
                )}
                {clientsAffaire.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Corps d'état</Form.Label>
              <Form.Select
                name="typeAffaireId"
                onChange={handlechange}
                value={newAffaire.typeAffaireId}
                required
              >
                {!newAffaire.typeAffaireId && (
                  <option value="">
                    Selectionnez le corps d'état de l'affaire
                  </option>
                )}
                {typesAffaire.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Secteur</Form.Label>
              <Form.Select
                name="secteurAffaireId"
                onChange={handlechange}
                value={newAffaire.secteurAffaireId}
                required
              >
                {!newAffaire.secteurAffaireId && (
                  <option value="">Selectionnez le secteur de l'affaire</option>
                )}
                {secteursAffaire.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {edit && (
              <Form.Group className="mb-3">
                <Form.Label>Etat</Form.Label>
                <Form.Select
                  name="etat"
                  onChange={handlechange}
                  value={newAffaire.etat}
                  required
                >
                  {etatsAffaire.map((e, k) => (
                    <option key={k} value={e}>
                      {e}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(affaire.id)}
                  disabled={affaireUtilisee}
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

export default UserModal;
