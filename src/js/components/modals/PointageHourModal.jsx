import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const PointageAffaireModal = ({
  semaine,
  setSemaine,
  index,
  handleSetErrors,
  errors,
  motifsAbsence,
  listView,
}) => {
  const [showModal, setShowModal] = useState(false);
  const value = semaine.pointages[index].valeur;
  const [newValue, setNewValue] = useState({
    hours: 0,
    minutes: 0,
  });

  // ################################## HANDLE FUNCTIONS
  const handleShowModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setNewValue({
        hours: Math.trunc(value),
        minutes: value - Math.trunc(value),
      });
    }
  };

  // console.log("newvalue", newValue);
  const handleChangeNewValue = ({ target }) => {
    const { name, value } = target;
    // console.log("handleChange", name, value);
    setNewValue({ ...newValue, [name]: Number(value) });
  };

  const handleValider = (e) => {
    e.preventDefault();
    const formattedValue = newValue.hours + newValue.minutes;

    let copyPointages = [...semaine.pointages];
    let copyPointage = { ...copyPointages[index] };
    copyPointage.valeur = formattedValue;
    handleSetErrors(index, { valeur: newValue });

    copyPointages[index] = copyPointage;
    setSemaine({ ...semaine, pointages: copyPointages });
    handleShowModal();
  };

  // ################################################ TEMPLATE
  return (
    <>
      <td
        onClick={!listView ? handleShowModal : null}
        className={`
          text-center btn-cell ${
            errors?.[index] ? "error-cell-pointage" : null
          } 
          `}
      >
        {value > 0 && value}
      </td>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nombre d'heure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleValider}>
            <Form.Group className="mb-3">
              <Form.Label><h4 className="color-text">heures</h4></Form.Label>
              <div className="pointage-hour-modal-keynumber">
                {["1", "2", "3", "4", "5", "6", "0"].map((n) => (
                  <Form.Check
                    key={n}
                    onChange={handleChangeNewValue}
                    type="radio"
                    name="hours"
                    value={n}
                    label={n}
                    checked={newValue.hours == n}
                    id={`cb-hours-${n}`}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <h4 className="color-text">Minutes</h4>
              </Form.Label>
              <div className="pointage-hour-modal-keynumber">
                <Form.Check
                  onChange={handleChangeNewValue}
                  type="radio"
                  name="minutes"
                  label=".25 (15 minutes)"
                  value="0.25"
                  checked={newValue.minutes == "0.25"}
                  id={`cb-minutes-0.25`}
                />
                <Form.Check
                  onChange={handleChangeNewValue}
                  type="radio"
                  name="minutes"
                  label=".50 (30 minutes)"
                  value="0.5"
                  checked={newValue.minutes == "0.5"}
                  id={`cb-minutes-0.5`}
                />
                <Form.Check
                  onChange={handleChangeNewValue}
                  type="radio"
                  name="minutes"
                  label=".75 (45 minutes)"
                  value="0.75"
                  checked={newValue.minutes == "0.75"}
                  id={`cb-minutes-0.75`}
                />
              </div>
              <div className="pointage-hour-modal-keynumber">
                <Form.Check
                  onChange={handleChangeNewValue}
                  type="radio"
                  name="minutes"
                  label="0"
                  value="0"
                  checked={newValue.minutes == "0"}
                  id={`cb-minutes-0`}
                />
              </div>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Valider
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setNewValue({
                    hours: 0,
                    minutes: 0,
                  });
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
