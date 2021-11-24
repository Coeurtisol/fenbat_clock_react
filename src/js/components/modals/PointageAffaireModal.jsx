import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import AFFAIRES_API from "../../services/affairesAPI";

const PointageAffaireModal = ({
  affaire,
  entite,
  entites,
  pointages,
  setPointages,
  index,
  name,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [affaires, setAffaires] = useState([]);
  const [entiteChoice, setEntiteChoice] = useState(0);
  const [affaireChoice, setAffaireChoice] = useState(0);

  // FETCH
  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      fetchAffaires();
      setEntiteChoice(entite);
      setAffaireChoice(affaire);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(entite);
    // console.log(entiteChoice);
    // console.log(affaireChoice);
    let copyPointages = [...pointages];
    let copyPointage = { ...copyPointages[index] };
    copyPointage[name] = affaireChoice;
    copyPointages[index] = copyPointage;
    setPointages(copyPointages);
    handleShowModal();
  };

  const filteredAffaires = affaires.filter(
    (a) => a.etat == "En cours" && entiteChoice && a.entite.name == entiteChoice
  );

  // TEMPLATE
  return (
    <>
      <Button
        size="sm"
        variant="primary"
        type="button"
        onClick={handleShowModal}
      >
        Modifier
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Changer l'affaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap justify-content-between">
              <Form.Group className="mb-3 col-xl-5 col-12">
                <Form.Label>Entité</Form.Label>
                <Form.Select
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
              <div className="mb-3 col-xl-5 col-12">
                <Form.Group>
                  <Form.Label>Affaires (en cours)</Form.Label>
                  {filteredAffaires.length != 0 ? (
                    <Form.Select
                      name="typeAffaireId"
                      onChange={(e) => setAffaireChoice(e.target.value)}
                      value={affaireChoice}
                    >
                      {/* {!affaireChoice && (
                        <option>Selectionnez l'affaire</option>
                      )} */}
                      <option>Selectionnez l'affaire</option>
                      {filteredAffaires.map((a) => (
                        <option
                          key={a.id}
                          value={a.name}
                          className={
                            a.name == affaireChoice ? "selected-option" : null
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
                    {affaireChoice
                      ? `Affaire selectionnée : ${affaireChoice}`
                      : "Aucune affaire selectionnée"}
                  </p>
                  <Button
                    variant="primary"
                    type="submit"
                    // disabled={affaireChoice == 0}
                  >
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