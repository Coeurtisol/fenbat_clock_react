import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const PointageCommentaireModal = ({
  semaine,
  setSemaine,
  handleSubmitSave,
  edit,
}) => {
  const [showModal, setShowModal] = useState(false);

  // ########################################### HANDLE FUNCTIONS
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSemaine({ ...semaine, commentaire: value });
  };

  // ############################################ TEMPLATE
  return (
    <>
      {!edit && semaine.commentaire && (
        <Button
          variant="info"
          type="button"
          className="btn-sm"
          onClick={handleShowModal}
        >
          Voir le commentaire
        </Button>
      )}
      {edit && (
        <Button
          className="mx-3"
          variant="danger"
          name="5"
          onClick={handleShowModal}
          type="button"
        >
          Refuser
        </Button>
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 col-xl-5 col-12">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                onChange={handleChange}
                as="textarea"
                placeholder="Saississez votre commentaire"
                name="commentaire"
                value={semaine.commentaire || ""}
                disabled={!edit}
              />
            </Form.Group>
            {edit && (
              <Button
                className="mx-3"
                variant="danger"
                name="5"
                type="button"
                onClick={handleSubmitSave}
              >
                Confirmer
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PointageCommentaireModal;
