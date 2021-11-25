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
// import { fakePointages2 } from "../fakeSemaine.js";
import SEMAINES_API from "../services/semainesAPI";

const PointagePage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(DATE_API.getWeekNumber(new Date()));
  const [semaine, setSemaine] = useState();
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [defaultMotif, setDefaultMotif] = useState("");
  const [defaultAffaire, setDefaultAffaire] = useState("");
  const [entites, setEntites] = useState([]);
  const [search, setSearch] = useState({
    entite: AUTH_API.getEntite() || "",
  });
  const [pointages, setPointages] = useState([]);

  // ######################################### FETCH FUNCTIONS
  const fetchSemaine = async () => {
    try {
      console.log(year, week, AUTH_API.getId());
      const response = await SEMAINES_API.findOne(year, week, AUTH_API.getId());
      const data = response.data;
      console.log("success fetch semaine", data);
      setSemaine(data);
      setPointages(data.pointages);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

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
    fetchSemaine();
    fetchEntites();
    fetchAffaires();
    fetchMotifsAbsence();
    // setSearch({
    //   ...search,
    //   semaine: DATE_API.getWeekNumber(new Date()),
    // });
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
    let copyPointages = [...pointages];
    for (const pointage of copyPointages) {
      pointage[name] = value;
    }
    setPointages(copyPointages);
  };

  const handleSubmitSave = async ({ target }) => {
    const updatedSemaine = { ...semaine };
    updatedSemaine.pointages = pointages;
    updatedSemaine.etatSemaineId = target.name
      ? +target.name
      : semaine.etatSemaine.id;
    delete updatedSemaine.etatSemaine;
    console.log("updated semaine", updatedSemaine);
    try {
      const response = await SEMAINES_API.update(
        updatedSemaine.id,
        updatedSemaine
      );
      console.log("success update", response);
    } catch (error) {
      console.log("erreur update", error);
    }
    fetchSemaine();
  };

  // ######################################### FILTRAGE AFFAIRES
  const filteredAffaires = affaires.filter(
    (a) => a.etat == "En cours" && a.entite.name == search.entite
  );

  // ######################################### GESTION SEMAINES
  const formatDateSelect = (date) => {
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    return `${day}-${month}`;
  };

  let semaineOptions = [];
  const weeksNumber = DATE_API.getWeekNumber();
  for (let i = 1; i <= weeksNumber; i++) {
    const weekDays = DATE_API.getWeekDays(i);
    const firstDay = formatDateSelect(weekDays[0]);
    const lastDay = formatDateSelect(weekDays[weekDays.length - 1]);
    semaineOptions.push(
      <option
        key={i}
        value={i}
        className={i == week ? "selected-option" : null}
      >{`(S: ${i}) : ${firstDay} -> ${lastDay}`}</option>
    );
  }

  // ######################################### GENERATION TABLEAU
  // Ligne nom du jour
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  };
  const FormatDateColumn = (dateObject) => {
    const date = new Date(dateObject).toLocaleDateString("fr-FR", dateOptions);
    return date;
  };

  let nameDayLine = [];
  for (let i = 0; i < pointages.length; i += 2) {
    const formatedDateColumn = FormatDateColumn(pointages[i].date);
    nameDayLine.push(
      <th colSpan="2" key={i} className="text-center">
        {formatedDateColumn}
      </th>
    );
  }
  // ligne AM / PM
  let momentDayLine = [];
  for (let i = 0; i < pointages.length; i++) {
    momentDayLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          {pointages && pointages[i].moment ? "P.M" : "A.M"}
        </td>
      </React.Fragment>
    );
  }
  // ligne des valeurs (heures)
  let valueLine = [];
  for (let i = 0; i < pointages.length; i++) {
    valueLine.push(
      <React.Fragment key={i}>
        <td className="text-center">{pointages[i].valeur}</td>
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
            name="valeur"
            value={pointages[i].valeur}
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
        <td className="text-center">
          {pointages[i].affaireId > 0
            ? affaires.length != 0 &&
              affaires.find((a) => a.id == pointages[i].affaireId).name
            : null}
        </td>
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
            affaire={pointages[i].affaireId}
            entite={search.entite}
            entites={entites}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="affaireId"
          />
        </td>
      </React.Fragment>
    );
  }
  // ligne des montants totaux
  let valueTotalLine = [];
  for (let i = 0; i < pointages.length; i += 2) {
    valueTotalLine.push(
      <td colSpan="2" key={i} className="text-center">
        {pointages[i].valeur + pointages[i + 1].valeur}
      </td>
    );
  }
  // ligne des paniers
  let panierLine = [];
  for (let i = 0; i < pointages.length; i += 2) {
    panierLine.push(
      <td colSpan="2" key={i} className="text-center">
        {pointages[i].valeur > 4 ||
        (pointages[i].valeur && pointages[i + 1].valeur)
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
        <td className="text-center">
          {pointages[i].motifAbsenceId > 0
            ? motifsAbsence.length != 0 &&
              motifsAbsence.find((m) => m.id == pointages[i].motifAbsenceId)
                .name
            : null}
        </td>
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
            motif={pointages[i].motifAbsenceId}
            pointages={pointages}
            setPointages={setPointages}
            index={i}
            name="motifAbsenceId"
          />
        </td>
      </React.Fragment>
    );
  }

  // ######################################### TEMPLATE
  return (
    <>
      <div className="container-fluid color-text">
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
                    onChange={(e) => setWeek(e.target.value)}
                    value={week}
                  >
                    {!week && <option>Selectionnez la semaine</option>}
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
                    name="affaireId"
                  >
                    {!defaultAffaire && (
                      <option>Selectionnez l'affaire par défaut</option>
                    )}
                    <option value="0">Retirer l'affaire par défaut</option>
                    {filteredAffaires.map((a) => (
                      <option key={a.id} value={a.id}>
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
                    name="motifAbsenceId"
                  >
                    {!defaultMotif && (
                      <option>
                        Selectionnez le motif d'absence par défaut
                      </option>
                    )}
                    <option value="0">Retirer le motif d'absence</option>
                    {motifsAbsence.map((m) => (
                      <option key={m.id} value={m.id}>
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
              <th>Heures</th>
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
      <div className="container-fluid d-flex justify-content-end mt-3">
        <Button
          className="mx-3"
          variant="primary"
          onClick={handleSubmitSave}
          type="button"
        >
          Sauvegarder
        </Button>
        <Button
          className="mx-3"
          variant="success"
          name="2"
          onClick={handleSubmitSave}
          type="button"
        >
          Envoyer pour validation
        </Button>
      </div>
    </>
  );
};

export default PointagePage;
