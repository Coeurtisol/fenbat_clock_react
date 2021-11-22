import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";
import ENTITES_API from "../services/entitesAPI";
import AUTH_API from "../services/authAPI";
import DATE_API from "../services/datesAPI";
import AFFAIRES_API from "../services/affairesAPI";
import MOTIFSABSENCE_API from "../services/motifsAbsenceAPI";
import PointageAffaireModal from "../components/modals/PointageAffaireModal";
import PointageHourModal from "../components/modals/PointageHourModal";
import PointageMotifAbsenceModal from "../components/modals/PointageMotifAbsenceModal";
import { fakePointages1, fakePointages2 } from "../fakeSemaine.js";

const PointagePage = () => {
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [defaultMotif, setDefaultMotif] = useState("");
  const [defaultAffaire, setDefaultAffaire] = useState("");
  const [entites, setEntites] = useState([]);
  const [search, setSearch] = useState({
    semaine: "",
    entite: AUTH_API.getEntite() || "",
  });
  const [pointages, setPointages] = useState(fakePointages1);

  console.log(fakePointages2);

  // ######################################### FETCH FUNCTIONS
  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchMotifsAbsence = async () => {
    try {
      const motifsAbsence = await MOTIFSABSENCE_API.findAll();
      console.log("success fetch", motifsAbsence);
      setMotifsAbsence(motifsAbsence);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchEntites();
    fetchAffaires();
    fetchMotifsAbsence();
    setSearch({
      ...search,
      semaine: DATE_API.getWeekNumber(new Date()),
    });
  }, []);

  // ######################################### HANDLE FUNCTIONS
  const handleChangeSearch = ({ target }) => {
    const { name, value } = target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmitSearch = () => {
    console.log(search);
  };

  const handleChangeDefault = ({ name, value }) => {
    const amName = "am" + name;
    const pmName = "pm" + name;
    // console.log(amName);
    // console.log(pmName);
    // console.log(value);

    let copyPointages = [...pointages];
    for (const pointage of copyPointages) {
      pointage[amName] = value;
      pointage[pmName] = value;
    }
    setPointages(copyPointages);
  };

  // ######################################### FILTRAGE AFFAIRES
  const filteredAffaires = affaires.filter(
    (a) => a.etat == "En cours" && a.entite.name == search.entite
  );

  // ######################################### GESTION SEMAINES
  let semaineOptions = [];
  const weeksNumber = DATE_API.getWeekNumber();
  for (let i = 1; i <= weeksNumber; i++) {
    semaineOptions.push(
      <option
        key={i}
        value={i}
        className={i == search.semaine ? "selected-option" : null}
      >{`(Semaine: ${i})`}</option>
    );
  }

  // ######################################### GENERATION TABLEAU
  // Ligne nom du jour
  let nameDayLine = [];
  for (let i = 0; i < pointages.length; i++) {
    nameDayLine.push(
      <th colSpan="2" key={i} className="text-center">
        {pointages && pointages[i].day}
      </th>
    );
  }
  // ligne AM / PM
  let momentDayLine = [];
  for (let i = 0; i < pointages.length; i++) {
    momentDayLine.push(
      <React.Fragment key={i}>
        <td className="text-center">A.M</td>
        <td className="text-center">P.M</td>
      </React.Fragment>
    );
  }
  // ligne des valeurs (heures)
  let valueLine = [];
  for (let i = 0; i < pointages.length; i++) {
    valueLine.push(
      <React.Fragment key={i}>
        <td className="text-center">{pointages[i].amValue}</td>
        <td className="text-center">{pointages[i].pmValue}</td>
      </React.Fragment>
    );
  }
  // ligne des bouttons valeurs
  let btnValeurLine = [];
  for (let i = 0; i < pointages.length; i++) {
    btnValeurLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          <PointageHourModal
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="amValue"
            value={pointages[i].amValue}
          />
        </td>
        <td className="text-center">
          <PointageHourModal
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="pmValue"
            value={pointages[i].pmValue}
          />
        </td>
      </React.Fragment>
    );
  }
  // ligne des affaires
  let affaireLine = [];
  for (let i = 0; i < pointages.length; i++) {
    affaireLine.push(
      <React.Fragment key={i}>
        <td className="text-center">{pointages[i].amAffaire}</td>
        <td className="text-center">{pointages[i].pmAffaire}</td>
      </React.Fragment>
    );
  }
  // ligne des bouttons affaires
  let btnAffaireLine = [];
  for (let i = 0; i < pointages.length; i++) {
    btnAffaireLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          <PointageAffaireModal
            affaire={pointages[i].amAffaire}
            entite={search.entite}
            entites={entites}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="amAffaire"
          />
        </td>
        <td className="text-center">
          <PointageAffaireModal
            affaire={pointages[i].pmAffaire}
            entite={search.entite}
            entites={entites}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="pmAffaire"
          />
        </td>
      </React.Fragment>
    );
  }
  // ligne des montants totaux
  let valueTotalLine = [];
  for (let i = 0; i < pointages.length; i++) {
    valueTotalLine.push(
      <td colSpan="2" key={i} className="text-center">
        {pointages[i].amValue + pointages[i].pmValue}
      </td>
    );
  }
  // ligne des paniers
  let panierLine = [];
  for (let i = 0; i < pointages.length; i++) {
    panierLine.push(
      <td colSpan="2" key={i} className="text-center">
        {pointages[i].amValue > 4 ||
        (pointages[i].amValue && pointages[i].pmValue)
          ? 1
          : 0}
      </td>
    );
  }
  // ligne des motifs
  let motifLine = [];
  for (let i = 0; i < pointages.length; i++) {
    motifLine.push(
      <React.Fragment key={i}>
        <td className="text-center">{pointages[i].amMotif}</td>
        <td className="text-center">{pointages[i].pmMotif}</td>
      </React.Fragment>
    );
  }
  // ligne des bouttons motifs
  let btnMotifLine = [];
  for (let i = 0; i < pointages.length; i++) {
    btnMotifLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          <PointageMotifAbsenceModal
            motif={pointages[i].amMotif}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="amMotif"
          />
        </td>
        <td className="text-center">
          <PointageMotifAbsenceModal
            motif={pointages[i].pmMotif}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="pmMotif"
          />
        </td>
      </React.Fragment>
    );
  }

  // ######################################### TEMPLATE
  return (
    <>
      <div className="container color-text">
        <h1 className="text-center my-4">{AUTH_API.getFullName()}</h1>
        <div>
          {/* <div className="container d-flex flex-wrap justify-content-evenly"> */}
          <div id="SEARCH" className="mb-4">
            <Form onSubmit={handleSubmitSearch} className="col-6 offset-3">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column>Semaine</Form.Label>
                <Col>
                  <Form.Select
                    name="semaine"
                    onChange={handleChangeSearch}
                    value={search.semaine}
                  >
                    {!search.semaine && (
                      <option>Selectionnez la semaine</option>
                    )}
                    {semaineOptions}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column>Entité</Form.Label>
                <Col>
                  <Form.Select
                    name="entite"
                    onChange={(e) => {
                      handleChangeSearch(e);
                      setDefaultAffaire("");
                    }}
                    value={search.entite}
                  >
                    {!search.entite && <option>Selectionnez l'entité</option>}
                    {entites.map((e) => (
                      <option
                        key={e.id}
                        value={e.name}
                        className={
                          e.name == search.entite ? "selected-option" : null
                        }
                      >
                        {e.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column>Affaire par défaut</Form.Label>
                <Col>
                  <Form.Select
                    onChange={(e) => {
                      handleChangeDefault(e.target);
                      setDefaultAffaire(e.target.value);
                    }}
                    name="Affaire"
                  >
                    {!defaultAffaire && (
                      <option>Selectionnez l'affaire par défaut</option>
                    )}
                    {filteredAffaires.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column>Motif d'absence par défaut</Form.Label>
                <Col>
                  <Form.Select
                    onChange={(e) => {
                      handleChangeDefault(e.target);
                      setDefaultMotif(e.target.value);
                    }}
                    name="Motif"
                  >
                    {!defaultMotif && (
                      <option>
                        Selectionnez le motif d'absence par défaut
                      </option>
                    )}
                    <option value="">Ne pas saisir de motif d'absence</option>
                    {motifsAbsence.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Table
          className="bt-0"
          variant="light"
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr className="align-middle">
              <th></th>
              {nameDayLine}
            </tr>
          </thead>
          <tbody>
            <tr className="align-middle">
              <th></th>
              {momentDayLine}
            </tr>
            <tr className="align-middle">
              <th>Heures travaillées</th>
              {valueLine}
            </tr>
            <tr className="align-middle">
              <th></th>
              {btnValeurLine}
            </tr>
            <tr className="align-middle">
              <th>Affaire</th>
              {affaireLine}
            </tr>
            <tr className="align-middle">
              <th></th>
              {btnAffaireLine}
            </tr>
            <tr className="align-middle">
              <th>Total Heures</th>
              {valueTotalLine}
            </tr>
            <tr className="align-middle">
              <th>Panier</th>
              {panierLine}
            </tr>
            <tr className="align-middle">
              <th>Autre</th>
              {motifLine}
            </tr>
            <tr className="align-middle">
              <th></th>
              {btnMotifLine}
            </tr>
          </tbody>
        </Table>
        {/* <div id="FILTER"></div> */}
      </div>
    </>
  );
};

export default PointagePage;
