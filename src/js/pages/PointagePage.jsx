import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ENTITES_API from "../services/entitesAPI";
import AUTH_API from "../services/authAPI";
import DATE_API from "../services/datesAPI";
import AFFAIRES_API from "../services/affairesAPI";
import MOTIFSABSENCE_API from "../services/motifsAbsenceAPI";
import SEMAINES_API from "../services/semainesAPI";
import PointageTableau from "../components/PointageTableau";

const PointagePage = ({ history, match }) => {
  const { year, week } = match.params;
  const [semaine, setSemaine] = useState({ pointages: [] });
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [defaultMotif, setDefaultMotif] = useState("");
  const [defaultAffaire, setDefaultAffaire] = useState("");
  const [entites, setEntites] = useState([]);
  const [search, setSearch] = useState({
    entite: AUTH_API.getEntite() || "",
  });

  // ######################################### FETCH FUNCTIONS
  const fetchSemaine = async () => {
    try {
      console.log(year, week, AUTH_API.getId());
      const response = await SEMAINES_API.findOne(year, week, AUTH_API.getId());
      const data = response.data;
      console.log("success fetch semaine", data);
      setSemaine(data);
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
  }, [year, week]);

  // ######################################### HANDLE FUNCTIONS
  const handleChangeDate = ({ target }) => {
    const { name, value } = target;
    setSearch({ ...search, [name]: value });
  };

  const handleChangeSearch = ({ target }) => {
    const { name, value } = target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmitSearch = () => {
    console.log(search);
  };

  const handleChangeDefault = ({ name, value }) => {
    let copyPointages = [...semaine.pointages];
    for (const pointage of copyPointages) {
      if (
        // NE PAS MODIFIER SAMEDI ET DIMANCHE
        new Date(pointage.date).getDay() > 0 &&
        new Date(pointage.date).getDay() < 6
      ) {
        pointage[name] = value;
      }
    }
    setSemaine({ ...semaine, pointages: copyPointages });
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

  // ######################################### TEMPLATE
  return (
    <>
      <div className="container-fluid color-text">
        <h2 className="text-center my-2">{AUTH_API.getFullName()}</h2>
        <div>
          {/* <div className="container d-flex flex-wrap justify-content-evenly"> */}
          <div id="SEARCH" className="my-2">
            <Form onSubmit={handleSubmitSearch} className="col-6 offset-3">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column>Semaine</Form.Label>
                <Col>
                  <Form.Select
                    name="semaine"
                    onChange={(e) =>
                      history.replace(`/pointage/${year}/${e.target.value}`)
                    }
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
      <PointageTableau
        semaine={semaine}
        setSemaine={setSemaine}
        fetchSemaine={fetchSemaine}
        entites={entites}
        affaires={affaires}
        motifsAbsence={motifsAbsence}
        search={search}
        week={week}
      />
    </>
  );
};

export default PointagePage;
