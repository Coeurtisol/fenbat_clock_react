import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const PointageMotifAbsenceModal = ({
  motifsAbsence,
  semaine,
  setSemaine,
  index,
  name,
  handleSetErrors,
  errors,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [motifChoice, setMotifChoice] = useState(0);

  // ################################## HANDLE FUNCTIONS
  const handleShowModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setMotifChoice(semaine.pointages[index].motifAbsenceId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let copyPointages = [...semaine.pointages];
    let copyPointage = { ...copyPointages[index] };
    copyPointage[name] = motifChoice;

    // let motifBloquant;
    // if (motifChoice > 0) {
    //   motifBloquant = motifsAbsence.find((m) => m.id == motifChoice).bloquant;
    // } else motifBloquant = false;
    // const valeur = copyPointage.valeur;
    // const affaireId = copyPointage.affaireId;
    // if (motifBloquant && (valeur > 0 || affaireId > 0))
    //   handleSetErrors(index, true);
    // else handleSetErrors(index, false);
    handleSetErrors(index, { motifAbsenceId: motifChoice });

    copyPointages[index] = copyPointage;
    setSemaine({ ...semaine, pointages: copyPointages });
    handleShowModal();
  };

  // ############################################ TEMPLATE
  return (
    <>
      <td
        onClick={handleShowModal}
        className={`
            text-center ${
              errors && errors[index] ? "error-cell-pointage" : null
            }
          `}
      >
        {semaine.pointages[index].motifAbsenceId > 0
          ? motifsAbsence.length != 0 &&
            motifsAbsence.find(
              (m) => m.id == semaine.pointages[index].motifAbsenceId
            ).name
          : null}
      </td>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Autre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Motifs d'absences</Form.Label>
              <Form.Select
                onChange={(e) => setMotifChoice(e.target.value)}
                value={motifChoice || ""}
              >
                {!motifChoice && (
                  <option>Selectionnez le motif d'absence</option>
                )}
                <option value="0">Pas d'absence</option>
                {motifsAbsence.map((m) => (
                  <option
                    key={m.id}
                    value={m.id}
                    className={m.id == motifChoice ? "selected-option" : null}
                  >
                    {m.name}
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

export default PointageMotifAbsenceModal;
