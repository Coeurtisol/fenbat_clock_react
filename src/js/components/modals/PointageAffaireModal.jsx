import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const PointageAffaireModal = ({
  affaires,
  semaine,
  setSemaine,
  entite,
  entites,
  index,
  handleSetErrors,
  errors,
  motifsAbsence,
  listView,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [entiteChoice, setEntiteChoice] = useState(0);
  const [affaireChoice, setAffaireChoice] = useState(0);

  // ########################################### HANDLE FUNCTIONS
  const handleShowModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setEntiteChoice(entite);
      setAffaireChoice(semaine.pointages[index].affaireId);
    }
  };

  const handleValider = (e) => {
    e.preventDefault();
    let copyPointages = [...semaine.pointages];
    let copyPointage = { ...copyPointages[index] };
    copyPointage.affaireId = affaireChoice;

    // let motifBloquant;
    // if (copyPointage.motifAbsenceId > 0) {
    //   motifBloquant = motifsAbsence.find(
    //     (m) => m.id == copyPointage.motifAbsenceId
    //   ).bloquant;
    // } else motifBloquant = false;
    // const valeur = copyPointage.valeur;
    // const affaireId = affaireChoice;
    // if (motifBloquant && (valeur > 0 || affaireId > 0))
    //   handleSetErrors(index, true);
    // else handleSetErrors(index, false);
    handleSetErrors(index, { affaireId: affaireChoice });

    copyPointages[index] = copyPointage;
    setSemaine({ ...semaine, pointages: copyPointages });
    handleShowModal();
  };

  const filteredAffaires = affaires.filter(
    (a) => a.etat == "En cours" && entiteChoice && a.entite.id == entiteChoice
  );

  // ############################################ TEMPLATE
  return (
    <>
      <td
        onClick={!listView ? handleShowModal : null}
        className={`
            text-center ${errors?.[index] ? "error-cell-pointage" : null}
          `}
      >
        {semaine.pointages[index].affaireId > 0
          ? affaires.length != 0 &&
            affaires.find((a) => a.id == semaine.pointages[index].affaireId)
              .name
          : null}
      </td>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Affaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleValider}>
            <div className="d-flex flex-wrap justify-content-between">
              <Form.Group className="mb-3 col-xl-5 col-12">
                <Form.Label>Entités</Form.Label>
                {/* <Form.Select
                  name="entiteId"
                  onChange={(e) => setEntiteChoice(e.target.value)}
                  value={entiteChoice}
                >
                  {!entiteChoice && <option>Selectionnez l'entité</option>}
                  {entites.map((e) => (
                    <option
                      key={e.id}
                      value={e.name}
                      className={
                        e.name == entiteChoice ? "selected-option" : null
                      }
                    >
                      {e.name}
                    </option>
                  ))}
                </Form.Select> */}
                {entites.map((e) => (
                  <Form.Check
                    onChange={(e) => setEntiteChoice(e.target.value)}
                    type="radio"
                    id={`radio-${e.id}`}
                    name="entiteId"
                    key={e.id}
                    label={e.name}
                    value={e.id}
                    checked={e.id == entiteChoice}
                  />
                ))}
              </Form.Group>
              <div className="mb-3 col-xl-5 col-12">
                <Form.Group>
                  <Form.Label>Affaires (en cours)</Form.Label>
                  {filteredAffaires.length != 0 ? (
                    <Form.Select
                      name="typeAffaireId"
                      onChange={(e) => setAffaireChoice(e.target.value)}
                      value={affaireChoice || ""}
                    >
                      {!affaireChoice && (
                        <option>Selectionnez l'affaire</option>
                      )}
                      {affaireChoice && (
                        <option value="0">Ne pas selectionner d'affaire</option>
                      )}
                      {filteredAffaires.map((a) => (
                        <option
                          key={a.id}
                          value={a.id}
                          className={
                            a.id == affaireChoice ? "selected-option" : null
                          }
                        >
                          {a.name}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="fst-italic">
                      Aucune affaire en cours disponible
                    </p>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center pt-3">
                  <p className="m-0 mr-3 pe-3">
                    {affaireChoice > 0
                      ? `Affaire selectionnée : ${
                          affaires.find((a) => a.id == affaireChoice).name
                        }`
                      : "Aucune affaire selectionnée"}
                  </p>
                  <Button variant="primary" type="submit">
                    Valider
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PointageAffaireModal;
