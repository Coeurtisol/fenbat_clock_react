import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ENTITES_API from "../services/entitesAPI";
import AUTH_API from "../services/authAPI";
import DATE_API from "../services/datesAPI";
import AFFAIRES_API from "../services/affairesAPI";
import MOTIFSABSENCE_API from "../services/motifsAbsenceAPI";
import SEMAINES_API from "../services/semainesAPI";
import ETATSSEMAINE_API from "../services/etatsSemaineAPI";
import PointageTableau from "../components/PointageTableau";
import { toast } from "react-toastify";

const GestionPointagePage = ({ history, match }) => {
  const { year, week } = match.params;
  const [semaines, setSemaines] = useState([]);
  const [etatsSemaine, setEtatsSemaine] = useState([]);
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [entites, setEntites] = useState([]);
  const [filter, setFilter] = useState({
    entite: AUTH_API.getEntite() || "",
    userId: "all",
    etatSemaine: "all",
  });
  const [etatFilter, setEtatFilter] = useState([]);

  // ######################################### FETCH FUNCTIONS
  const fetchSemaines = async () => {
    try {
      console.log(year, week);
      const response = await SEMAINES_API.getAllByWeek(year, week);
      const data = response.data;
      console.log("success fetch semaines", data);
      setSemaines(data);
    } catch (error) {
      console.log("erreur fetch semaines", error);
      toast.error("Erreur au chargement des semaines.");
    }
  };

  const fetchEtatsSemaine = async () => {
    try {
      console.log(year, week);
      const response = await ETATSSEMAINE_API.getAll();
      const data = response.data;
      console.log("success fetch etatsSemaine", data);
      setEtatsSemaine(data);
    } catch (error) {
      console.log("erreur fetch etatsSemaine", error);
      toast.error("Erreur au chargement des états de semaines.");
    }
  };

  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch entites", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch entites", error);
      toast.error("Erreur au chargement des entités.");
    }
  };

  const fetchMotifsAbsence = async () => {
    try {
      const motifsAbsence = await MOTIFSABSENCE_API.findAll();
      console.log("success fetch motifsAbsence", motifsAbsence);
      setMotifsAbsence(motifsAbsence);
    } catch (error) {
      console.log("erreur fetch motifsAbsence", error);
      toast.error("Erreur au chargement des motifs d'absences.");
    }
  };

  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch affaires", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch affaires", error);
      toast.error("Erreur au chargement des affaires.");
    }
  };

  useEffect(() => {
    fetchSemaines();
    fetchEtatsSemaine();
    fetchEntites();
    fetchAffaires();
    fetchMotifsAbsence();
  }, [year, week]);

  // ######################################### HANDLE FUNCTIONS
  const handleChangeFilter = ({ target }) => {
    const { name, value } = target;
    setFilter({ ...filter, [name]: value });
  };

  const handleChangeEtatFilter = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      const copyEtatFilter = [...etatFilter];
      copyEtatFilter.push(Number(value));
      setEtatFilter(copyEtatFilter);
    } else {
      const copyEtatFilter = [...etatFilter];
      const index = copyEtatFilter.indexOf(Number(value));
      copyEtatFilter.splice(index, 1);
      setEtatFilter(copyEtatFilter);
    }
  };

  // ######################################### FILTRAGE SEMAINES
  const filteredSemainesByUser =
    filter.userId == "all"
      ? semaines
      : semaines.filter((s) => s.user.id == filter.userId);

  const filteredSemainesByEtat =
    etatFilter.length == 0
      ? filteredSemainesByUser
      : filteredSemainesByUser.filter((s) =>
          etatFilter.includes(s.etatSemaine.id)
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
        <div>
          {/* <div className="container d-flex flex-wrap justify-content-evenly"> */}
          <div id="FILTER" className="my-2">
            <Form className="col-11 col-md-8 col-lg-6 mx-auto">
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label column className="col-12 col-sm-4">
                  Semaine
                </Form.Label>
                <Col className="col-12 col-sm-8">
                  <Form.Select
                    name="semaine"
                    onChange={(e) =>
                      history.replace(
                        `/gestion/pointage/${year}/${e.target.value}`
                      )
                    }
                    value={week}
                  >
                    {!week && <option>Selectionnez la semaine</option>}
                    {semaineOptions}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label column className="col-12 col-sm-4">
                  Employé
                </Form.Label>
                <Col className="col-12 col-sm-8">
                  <Form.Select name="userId" onChange={handleChangeFilter}>
                    <option value="all">Tout les employés</option>
                    {semaines.map((s) => (
                      <option key={s.user.id} value={s.user.id}>
                        {s.user.firstname} {s.user.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label column className="col-12 col-sm-4">
                  Etat semaine
                </Form.Label>
                <Col className="col-12 col-sm-8">
                  {etatsSemaine.map((e) => (
                    <div key={e.id}>
                      <Form.Check
                        style={{display:'inline-block'}}
                        className="mx-1"
                        key={e.id}
                        onChange={handleChangeEtatFilter}
                        type="checkbox"
                        name="etatSemaine"
                        id={`cb-${e.name}`}
                        value={e.id}
                      />
                      <Form.Label htmlFor={`cb-${e.name}`}>{e.name}</Form.Label>
                    </div>
                  ))}
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {filteredSemainesByEtat.length == 0 ? (
        <h4 className="text-center">
          Aucune semaine de pointage ne correspond à ce filtrage.
        </h4>
      ) : (
        <>
          {filteredSemainesByEtat.map((s, k) => (
            <PointageTableau
              history={history}
              listView={true}
              key={k}
              semaine={s}
              fetchRefresh={fetchSemaines}
              entites={entites}
              affaires={affaires}
              motifsAbsence={motifsAbsence}
              filter={filter}
              week={week}
            />
          ))}
        </>
      )}
    </>
  );
};

export default GestionPointagePage;
