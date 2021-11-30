import React, { useState } from "react";
import MOTIFSABSENCE_API from "../../services/motifsAbsenceAPI";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const MotifAbsenceModal = ({ fetchMotifsAbsence, motifAbsence }) => {
  const [showModal, setShowModal] = useState(false);
  const [newMotifAbsence, setNewMotifAbsence] = useState({
    name: "",
  });

  const handleShowMotifAbsenceModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      if (motifAbsence) {
        setNewMotifAbsence({ ...setNewMotifAbsence, name: motifAbsence.name });
      }
    } else {
      fetchMotifsAbsence();
    }
  };

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    setNewMotifAbsence({ ...newMotifAbsence, [name]: value });
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create motifAbsence", newMotifAbsence);
    try {
      const response = await MOTIFSABSENCE_API.create(newMotifAbsence);
      console.log("success create motifAbsence", response);
      toast.success("Motif d'absence créé.")
      setNewMotifAbsence({
        name: "",
      });
    } catch (error) {
      console.log("erreur create motifAbsence", error);
      toast.error("Erreur à la création du motif d'absence.")
    }
    handleShowMotifAbsenceModal();
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    delete newMotifAbsence.accessCode;
    console.log("update motifAbsence", newMotifAbsence);
    try {
      const response = await MOTIFSABSENCE_API.update(
        motifAbsence.id,
        newMotifAbsence
      );
      console.log("success update motifAbsence", response);
      toast.success("Motif d'absence mit à jour.")
      setNewMotifAbsence({
        name: "",
      });
    } catch (error) {
      console.log("erreur update motifAbsence", error);
      toast.error("Erreur à la mise à jour du motif d'absence.")
    }
    handleShowMotifAbsenceModal();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await MOTIFSABSENCE_API.deleteOne(id);
      console.log("success delete motifAbsence", response);
      toast.success("Motif d'absence supprimé.")
    } catch (error) {
      console.log("erreur delete motifAbsence", error);
      toast.error("Erreur à la suppression du motif d'absence.")
    }
    handleShowMotifAbsenceModal();
  };

  // TEMPLATE
  return (
    <>
      <Button
        className="text-nowrap"
        variant={motifAbsence ? "primary" : "success"}
        type="button"
        onClick={handleShowMotifAbsenceModal}
      >
        {motifAbsence ? "Editer" : "Nouveau motif d'absence"}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowMotifAbsenceModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {motifAbsence
              ? `Modification du motif d'absence : ${motifAbsence.name}`
              : "Nouveau motif d'absence"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={motifAbsence ? handleUpdate : handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du motif d'absence"
                value={newMotifAbsence.name}
                onChange={handlechange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
              {motifAbsence && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(motifAbsence.id)}
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

export default MotifAbsenceModal;
