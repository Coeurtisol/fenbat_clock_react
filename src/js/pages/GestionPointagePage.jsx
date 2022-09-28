import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import ENTITES_API from "../services/entitesAPI";
import AUTH_API from "../services/authAPI";
import DATE_API from "../services/datesAPI";
import AFFAIRES_API from "../services/affairesAPI";
import MOTIFSABSENCE_API from "../services/motifsAbsenceAPI";
import SEMAINES_API from "../services/semainesAPI";
import ETATSSEMAINE_API from "../services/etatsSemaineAPI";
import PointageTableau from "../components/PointageTableau";
import { toast } from "react-toastify";
import LoadingIcon from "../components/loadingIcon";

const GestionPointagePage = ({ history, match }) => {
  const { year, week } = match.params;
  const [loading, setLoading] = useState(true);
  const [semaines, setSemaines] = useState([]);
  const [etatsSemaine, setEtatsSemaine] = useState([]);
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [entites, setEntites] = useState([]);
  const [filter, setFilter] = useState({
    entite: AUTH_API.getEntite() || "",
    userId: "all",
    etatValidation: {},
  });

  // ######################################### FETCH FUNCTIONS
  const fetchSemaines = async () => {
    try {
      console.log(year, week);
      const response = await SEMAINES_API.getAllByWeek(year, week);
      const data = response.data;
      console.log("success fetch semaines", data);
      setSemaines(data);
      setLoading(false);
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

      const etatValidationFilter = {};
      data.forEach((ev) => {
        etatValidationFilter[ev.name] = false;
      });
      etatValidationFilter["En attente de validation"] =
        AUTH_API.estRespProd() && true;
      etatValidationFilter["Validé par responsable de production"] =
        AUTH_API.estRespSite() && true;
      setFilter({ ...filter, etatValidation: etatValidationFilter });

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
    setLoading(true);
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

  const handleChangeEtatValidationFilter = ({ target }) => {
    const { value, checked } = target;
    const copyEtatValidation = filter.etatValidation;
    copyEtatValidation[value] = checked;
    setFilter({ ...filter, etatValidation: copyEtatValidation });
  };

  // ######################################### FILTRAGE SEMAINES
  const semainesFiltreesParUtilisateur =
    filter.userId == "all"
      ? semaines
      : semaines.filter((s) => s.user.id == filter.userId);

  let semainesFiltreesParEtatValidation = semainesFiltreesParUtilisateur;
  const valuesFilterEtatValidation = Object.values(filter.etatValidation);
  const filtreParEtatValidationNonActif = valuesFilterEtatValidation.every(
    (ev) => !ev
  );
  if (!filtreParEtatValidationNonActif) {
    semainesFiltreesParEtatValidation = semainesFiltreesParUtilisateur.filter(
      (s) => filter.etatValidation[s.etatSemaine.name]
    );
  }

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
        <h2 className="text-center mt-2 mb-4">Gestion pointages</h2>
        <div>
          <div id="FILTER" className="my-2">
            <Form className="col-11 col-md-8 col-lg-6 mx-auto">
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 col-12 col-sm-4"
                >
                  Semaine :
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
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 col-12 col-sm-4"
                >
                  Employé :
                </Form.Label>
                <Col className="col-12 col-sm-8">
                  <Form.Select name="userId" onChange={handleChangeFilter}>
                    <option value="all">Tous les employés</option>
                    {semaines.map((s) => (
                      <option key={s.user.id} value={s.user.id}>
                        {s.user.firstname} {s.user.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 pt-0 col-12 col-sm-4"
                >
                  Etat validation :
                </Form.Label>
                <Col className="col-12 col-sm-8">
                  {etatsSemaine.map((e) => (
                    <div key={e.id}>
                      <Form.Check
                        key={e.id}
                        onChange={handleChangeEtatValidationFilter}
                        type="checkbox"
                        name="etatSemaine"
                        id={`cb-${e.name}`}
                        label={e.name}
                        value={e.name}
                        checked={filter.etatValidation[e.name]}
                      />
                    </div>
                  ))}
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {!loading && (
        <>
          {semainesFiltreesParEtatValidation.length == 0 ? (
            <h4 className="text-center">
              Aucune semaine de pointage ne correspond à ce filtrage.
            </h4>
          ) : (
            <>
              {semainesFiltreesParEtatValidation.map((s, k) => (
                <PointageTableau
                  listView={true}
                  key={k}
                  semaine={s}
                  fetchRefresh={fetchSemaines}
                  entites={entites}
                  affaires={affaires}
                  motifsAbsence={motifsAbsence}
                  filter={filter}
                />
              ))}
            </>
          )}
        </>
      )}
      {loading && <LoadingIcon />}
    </>
  );
};

export default GestionPointagePage;
