import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const PointageAffaireModal = ({
  semaine,
  setSemaine,
  index,
  name,
  handleSetErrors,
  errors,
  motifsAbsence,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const value = semaine.pointages[index].valeur;

  // ################################## HANDLE FUNCTIONS
  const handleShowModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setHours(Math.trunc(value));
      // console.log(Math.trunc(value));
      setMinutes(value - Math.trunc(value));
      // console.log(value - Math.trunc(value));
    }
  };

  console.log(setSemaine);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = hours + minutes;
    // console.log(typeof newValue);
    // console.log(hours);
    // console.log(minutes);
    // console.log(newValue);
    let copyPointages = [...semaine.pointages];
    let copyPointage = { ...copyPointages[index] };
    copyPointage[name] = newValue;

    // let motifBloquant;
    // if (copyPointage.motifAbsenceId > 0) {
    //   motifBloquant = motifsAbsence.find(
    //     (m) => m.id == copyPointage.motifAbsenceId
    //   ).bloquant;
    // } else motifBloquant = false;
    // const valeur = newValue;
    // const affaireId = copyPointage.affaireId;
    // if (motifBloquant && (valeur > 0 || affaireId > 0))
    //   handleSetErrors(index, true);
    // else handleSetErrors(index, false);
    handleSetErrors(index, { valeur: newValue });

    copyPointages[index] = copyPointage;
    setSemaine({ ...semaine, pointages: copyPointages });
    handleShowModal();
  };

  // ################################################ TEMPLATE
  return (
    <>
      <td
        onClick={handleShowModal}
        className={`
          text-center ${errors && errors[index] ? "error-cell-pointage" : null}
        `}
      >
        {value > 0 && value}
      </td>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nombre d'heure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Heures</Form.Label>
              <Form.Select
                onChange={(e) => setHours(Number(e.target.value))}
                value={hours}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Select>
              {/* {entites.map((e) => (
                  <Form.Check
                    onChange={(e) => setEntiteChoice(e.target.value)}
                    type="radio"
                    name="entiteId"
                    key={e.id}
                    label={e.name}
                    value={e.name}
                  />
                ))} */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Minutes</Form.Label>
              <Form.Select
                onChange={(e) => setMinutes(Number(e.target.value))}
                value={minutes}
              >
                <option value="0.0">0</option>
                <option value="0.25">.25 (15 minutes)</option>
                <option value="0.5">.50 (30 minutes)</option>
                <option value="0.75">.75 (45 minutes)</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Valider
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setHours(0);
                  setMinutes(0);
                }}
                type="submit"
              >
                Remise à zéro
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PointageAffaireModal;
