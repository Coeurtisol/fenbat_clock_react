import React, { useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import adresseAPI from "../../services/adresseAPI";

const EntiteModal = ({ fetchEntites, entite }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEntite, setNewEntite] = useState({
    name: "",
    adresse: "",
  });
  const [adresses, setAdresses] = useState([]);
  const edit = entite ? true : false;

  const handleShowEntiteModal = async () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (edit) {
        setNewEntite({
          ...setNewEntite,
          name: entite.name,
          adresse: entite.adresse,
        });
        await searchForAdresseAutocomplete(entite.adresse);
      }
    } else {
      fetchEntites();
    }
  };

  // FUNCTIONS
  const handlechange = async ({ target }) => {
    const { name, value } = target;
    setNewEntite({ ...newEntite, [name]: value.trimStart() });
    if (name == "adresse" && value != "") {
      await searchForAdresseAutocomplete(value);
    }
  };

  const searchForAdresseAutocomplete = async (adresse) => {
    try {
      const listeAdresse = await adresseAPI.searchForAutocomplete(adresse);
      setAdresses(listeAdresse);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create entite", newEntite);
    try {
      const response = await ENTITES_API.create(newEntite);
      console.log("success create entite", response);
      toast.success("Entité créée.");
      setNewEntite({
        name: "",
        adresse: "",
      });
    } catch (error) {
      console.log("erreur create entite", error);
      toast.error("Erreur à la création de l'entité.");
    }
    handleShowEntiteModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newEntite.accessCode;
    console.log("update entite", newEntite);
    try {
      const response = await ENTITES_API.update(entite.id, newEntite);
      console.log("success update entite", response);
      toast.success("Entité mise à jour.");
    } catch (error) {
      console.log("erreur update entite", error);
      toast.error("Erreur à la mise à jour de l'entité.");
    }
    handleShowEntiteModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ENTITES_API.deleteOne(id);
      console.log("success delete entite", response);
      toast.success("Entité supprimée.");
    } catch (error) {
      console.log("erreur delete entite", error);
      toast.error("Erreur à la suppression de l'entité.");
    }
    handleShowEntiteModal();
  };

  // FUNCTIONS
  let entiteUtilisee = false;
  if (edit) {
    if (
      entite.Users.length > 0 ||
      entite.affaires.length > 0 ||
      entite.pointages.length > 0
    ) {
      entiteUtilisee = true;
    }
  }

  console.log(adresses);
  const matchingAdresse =
    adresses.find((a) => a.label == newEntite.adresse)?.coordonnees || [];
  const [longitude, latitude] = matchingAdresse;
  console.log(matchingAdresse, latitude, longitude);

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={edit ? "primary" : "success"}
        type="button"
        onClick={handleShowEntiteModal}
      >
        {edit ? "Editer" : "Nouvelle entité"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowEntiteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit
              ? `Modification de l'entité : ${entite.name}`
              : "Nouvelle entité"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'entité"
                value={newEntite.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Adresse
                {matchingAdresse.length ? (
                  <>
                    {` (Coordonnées: `}
                    <span className="text-success">
                      {latitude},{longitude}
                    </span>
                    {`)`}
                  </>
                ) : (
                  <>
                    {` (Coordonnées: `}
                    <span className="text-danger">non trouvées</span>
                    {`)`}
                  </>
                )}
              </Form.Label>
              <Form.Control
                type="text"
                name="adresse"
                placeholder="Rechercher une adresse"
                value={newEntite.adresse}
                onChange={handlechange}
                required
                list="adresses"
              />
              <datalist id="adresses">
                {adresses.map((a, k) => (
                  <option key={k} value={a.label}></option>
                ))}
              </datalist>
            </Form.Group>
            {/* <p>{latitude + "," + longitude}</p> */}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {edit && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(entite.id)}
                  disabled={entiteUtilisee}
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

export default EntiteModal;
