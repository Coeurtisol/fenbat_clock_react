import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import ENTITES_API from "../services/entitesAPI";
import AUTH_API from "../services/authAPI";
import DATE_API from "../services/datesAPI";
import AFFAIRES_API from "../services/affairesAPI";
import MOTIFSABSENCE_API from "../services/motifsAbsenceAPI";
import SEMAINES_API from "../services/semainesAPI";
import PointageTableau from "../components/PointageTableau";
import { toast } from "react-toastify";
import LoadingIcon from "../components/loadingIcon";

const PointagePage = ({ history, match, location }) => {
  const { year, week, userId } = match.params;
  const [loading, setLoading] = useState(true);
  const [semaine, setSemaine] = useState({ pointages: [] });
  const [affaires, setAffaires] = useState([]);
  const [motifsAbsence, setMotifsAbsence] = useState([]);
  const [defaultMotif, setDefaultMotif] = useState("");
  const [defaultAffaire, setDefaultAffaire] = useState("");
  const [entites, setEntites] = useState([]);
  const [errors, setErrors] = useState(new Array(14).fill(false));
  const [currentEntite, setCurrentEntite] = useState(
    AUTH_API.getEntite() || ""
  );

  // ######################################### FETCH FUNCTIONS
  const fetchSemaine = async () => {
    try {
      console.log("année", year);
      console.log("semaine", week);
      console.log("userId", userId || AUTH_API.getId());
      const response = await SEMAINES_API.findOne(
        year,
        week,
        userId || AUTH_API.getId()
      );
      const data = response.data;
      console.log("success fetch semaine", data);
      setSemaine(data);
      setLoading(false);
    } catch (error) {
      console.log("erreur fetch semaine", error);
      toast.error("Erreur au chargement de la semaine.");
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
    fetchSemaine();
    fetchEntites();
    fetchAffaires();
    fetchMotifsAbsence();
  }, [year, week]);

  // ######################################### HANDLE FUNCTIONS

  const handleChangeDefault = ({ name, value }) => {
    let copyPointages = [...semaine.pointages];
    copyPointages.forEach((p, i) => {
      if (
        // NE PAS MODIFIER SAMEDI ET DIMANCHE
        new Date(p.date).getDay() > 0 &&
        new Date(p.date).getDay() < 6
      ) {
        p[name] = value;
        handleSetErrors(i, { [name]: value }, true);
      }
    });
    setSemaine({ ...semaine, pointages: copyPointages });
  };

  // ######################################## VERIF POINTAGES
  const handleSetErrors = (
    index,
    { motifAbsenceId, affaireId, valeur },
    multi
  ) => {
    motifAbsenceId ??= semaine.pointages[index].motifAbsenceId;
    affaireId ??= semaine.pointages[index].affaireId;
    valeur ??= semaine.pointages[index].valeur;

    let motifBloquant;
    if (motifAbsenceId > 0) {
      motifBloquant = motifsAbsence.find(
        (m) => m.id == motifAbsenceId
      ).bloquant;
    } else motifBloquant = false;

    let bool;
    if (motifBloquant && (valeur > 0 || affaireId > 0)) bool = true;
    else bool = false;

    // WTF ???
    if (multi) {
      setErrors([...errors, (errors[index] = bool)]);
    } else {
      const copyErrors = [...errors];
      copyErrors[index] = bool;
      setErrors(copyErrors);
    }
  };

  // ######################################### FILTRAGE AFFAIRES
  const filteredAffaires = affaires.filter(
    (a) => a.etat == "En cours" && a.entite.id == currentEntite
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
      {location.state?.comefrom && (
        <Button onClick={() => history.goBack()} variant="info" className="m-2">
          Retour à {location.state?.comefrom}
        </Button>
      )}
      <div className="container-fluid color-text">
        <h2 className="text-center mt-2 mb-4">
          {userId
            ? `Pointages de ${semaine.user?.firstname} ${semaine.user?.lastname}`
            : "Mes pointages"}
        </h2>
        <div>
          {/* <div className="container d-flex flex-wrap justify-content-evenly"> */}
          <div className="my-2">
            <Form className="col-11 col-md-8 col-lg-6 mx-auto">
              {!userId && (
                <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                  <Form.Label
                    column
                    className="text-start text-sm-end pe-2 col-12 col-sm-5"
                  >
                    Semaine :
                  </Form.Label>
                  <Col className="col-12 col-sm-7">
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
              )}
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 col-12 col-sm-5"
                >
                  Entité :
                </Form.Label>
                <Col className="col-12 col-sm-7">
                  <Form.Select
                    name="entite"
                    onChange={(e) => {
                      setCurrentEntite(e.target.value);
                      setDefaultAffaire("");
                    }}
                    value={currentEntite}
                  >
                    {!currentEntite && <option>Selectionnez l'entité</option>}
                    {entites.map((e) => (
                      <option
                        key={e.id}
                        value={e.name}
                        className={
                          e.id == currentEntite ? "selected-option" : null
                        }
                      >
                        {e.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 col-12 col-sm-5"
                >
                  Affaire par défaut :
                </Form.Label>
                <Col className="col-12 col-sm-7">
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
              <Form.Group className="d-flex flex-column flex-sm-row mb-3">
                <Form.Label
                  column
                  className="text-start text-sm-end pe-2 col-12 col-sm-5"
                >
                  Autre par défaut :
                </Form.Label>
                <Col className="col-12 col-sm-7">
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
      {!loading && (
        <PointageTableau
          cadreEdit={userId}
          semaine={semaine}
          setSemaine={setSemaine}
          fetchRefresh={fetchSemaine}
          entites={entites}
          affaires={affaires}
          motifsAbsence={motifsAbsence}
          currentEntite={currentEntite}
          errors={errors}
          setErrors={setErrors}
          handleSetErrors={handleSetErrors}
        />
      )}
      {loading && <LoadingIcon />}
    </>
  );
};

export default PointagePage;
