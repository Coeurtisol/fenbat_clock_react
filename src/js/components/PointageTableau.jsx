import React from "react";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AUTH_API from "../services/authAPI.js";
import SEMAINES_API from "../services/semainesAPI.js";
import PointageAffaireModal from "./modals/PointageAffaireModal";
import PointageHourModal from "./modals/PointageHourModal";
import PointageMotifAbsenceModal from "./modals/PointageMotifAbsenceModal";

const PointageTableau = ({
  cadreEdit,
  history,
  listView,
  semaine,
  setSemaine,
  fetchRefresh,
  entites,
  affaires,
  motifsAbsence,
  search,
  week,
}) => {
  const roleId = AUTH_API.getRoleId();
  // ######################################## HANDLE FUNCTIONS
  const handleSubmitSave = async ({ target }) => {
    const updatedSemaine = { ...semaine };
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
      console.log("success semaine update", response);
      toast.success("Enregistrement réussie.");
    } catch (error) {
      console.log("erreur semaine update", error);
      toast.error("Enregistrement échoué.");
    }
    fetchRefresh();
  };

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
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const formatedDateColumn = FormatDateColumn(semaine.pointages[i].date);
    nameDayLine.push(
      <th colSpan="2" key={i} className="text-center">
        {formatedDateColumn}
      </th>
    );
  }
  // ligne AM / PM
  let momentDayLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    momentDayLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          {semaine.pointages && semaine.pointages[i].moment ? "P.M" : "A.M"}
        </td>
      </React.Fragment>
    );
  }
  // ligne des valeurs (heures)
  let valueLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    valueLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          {semaine.pointages[i].valeur > 0 && semaine.pointages[i].valeur}
        </td>
      </React.Fragment>
    );
  }
  // ligne des bouttons valeurs
  let btnValeurLine = [];
  if (!listView) {
    for (let i = 0; i < semaine.pointages.length; i++) {
      btnValeurLine.push(
        <React.Fragment key={i}>
          <td className="text-center">
            <PointageHourModal
              semaine={semaine}
              setSemaine={setSemaine}
              index={i}
              name="valeur"
            />
          </td>
        </React.Fragment>
      );
    }
  }
  // ligne des affaires
  let affaireLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    affaireLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          {semaine.pointages[i].affaireId > 0
            ? affaires.length != 0 &&
              affaires.find((a) => a.id == semaine.pointages[i].affaireId).name
            : null}
        </td>
      </React.Fragment>
    );
  }
  // ligne des bouttons affaires
  let btnAffaireLine = [];
  if (!listView) {
    for (let i = 0; i < semaine.pointages.length; i++) {
      btnAffaireLine.push(
        <React.Fragment key={i}>
          <td className="text-center">
            <PointageAffaireModal
              affaires={affaires}
              semaine={semaine}
              setSemaine={setSemaine}
              entite={search.entite || ""}
              entites={entites}
              index={i}
              name="affaireId"
            />
          </td>
        </React.Fragment>
      );
    }
  }
  // ligne des montants totaux
  let totalWeekValue = 0;
  let valueTotalLine = [];
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const valueAm = semaine.pointages[i].valeur;
    const valuePm = semaine.pointages[i + 1].valeur;
    const valueDay = valueAm + valuePm;
    totalWeekValue += valueDay;
    valueTotalLine.push(
      <td colSpan="2" key={i} className="text-center">
        {valueDay > 0 && valueDay}
      </td>
    );
  }
  // ligne des paniers
  let totalWeekPanier = 0;
  let panierLine = [];
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const panierAm = semaine.pointages[i].valeur;
    const panierPm = semaine.pointages[i + 1].valeur;
    let panierDay = 0;
    if (panierAm >= 5 || (panierAm && panierPm)) {
      panierDay = 1;
    }
    totalWeekPanier += panierDay;
    panierLine.push(
      <td colSpan="2" key={i} className="text-center">
        {panierDay == 1 && 1}
      </td>
    );
  }
  // ligne des motifs
  let motifLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    motifLine.push(
      <React.Fragment key={i}>
        <td className="text-center">
          {semaine.pointages[i].motifAbsenceId > 0
            ? motifsAbsence.length != 0 &&
              motifsAbsence.find(
                (m) => m.id == semaine.pointages[i].motifAbsenceId
              ).name
            : null}
        </td>
      </React.Fragment>
    );
  }
  // ligne des bouttons motifs
  let btnMotifLine = [];
  if (!listView) {
    for (let i = 0; i < semaine.pointages.length; i++) {
      btnMotifLine.push(
        <React.Fragment key={i}>
          <td className="text-center">
            <PointageMotifAbsenceModal
              motifsAbsence={motifsAbsence}
              semaine={semaine}
              setSemaine={setSemaine}
              index={i}
              name="motifAbsenceId"
            />
          </td>
        </React.Fragment>
      );
    }
  }

  // ############################################ TEMPLATE
  return (
    <>
      <div className="container-fluid color-text">
        <h4 className="text-center mb-2">
          {(listView || cadreEdit) &&
            semaine.user &&
            `${semaine.user.firstname} ${semaine.user.lastname} `}
          {`(S ${week}) : ${semaine.etatSemaine && semaine.etatSemaine.name}`}
        </h4>
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
              <th className="text-center">Totaux</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-middle">
              <th></th>
              {momentDayLine}
              <td></td>
            </tr>
            <tr className="align-middle">
              <th>Heures</th>
              {valueLine}
              <td></td>
            </tr>
            {!listView && (
              <tr className="align-middle">
                <th></th>
                {btnValeurLine}
                <td></td>
              </tr>
            )}
            <tr className="align-middle">
              <th>Affaire</th>
              {affaireLine}
              <td></td>
            </tr>
            {!listView && (
              <tr className="align-middle">
                <th></th>
                {btnAffaireLine}
                <td></td>
              </tr>
            )}
            <tr className="align-middle">
              <th>Total Heures</th>
              {valueTotalLine}
              <td className="text-center">
                {totalWeekValue > 0 && totalWeekValue}
              </td>
            </tr>
            <tr className="align-middle">
              <th>Panier</th>
              {panierLine}
              <td className="text-center">
                {totalWeekPanier > 0 && totalWeekPanier}
              </td>
            </tr>
            <tr className="align-middle">
              <th>Autre</th>
              {motifLine}
              <td></td>
            </tr>
            {!listView && (
              <tr className="align-middle">
                <th></th>
                {btnMotifLine}
                <td></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div
        className={`container-fluid d-flex justify-content-${
          listView || cadreEdit ? "between" : "end"
        } mt-3`}
      >
        {cadreEdit && (
          <Link
            className="btn btn-primary mx-3"
            to={`/gestion/pointage/${semaine.annee}/${semaine.numero}`}
          >
            Retour à gestion des pointages
          </Link>
        )}
        {listView && (
          <Button
            className="mx-3"
            variant="primary"
            onClick={() =>
              history.push(
                `/gestion/pointage/${semaine.annee}/${semaine.numero}/${semaine.user.id}`
              )
            }
            type="button"
          >
            Editer
          </Button>
        )}

        <div>
          {roleId <= 2 && semaine.etatSemaine.id != 5 && (
            <Button
              className="mx-3"
              variant="danger"
              name="5"
              onClick={handleSubmitSave}
              type="button"
            >
              Refuser
            </Button>
          )}
          {!listView && (
            <Button
              className="mx-3"
              variant="primary"
              onClick={handleSubmitSave}
              type="button"
            >
              Sauvegarder
            </Button>
          )}

          <Button
            className="mx-3"
            variant="success"
            name={roleId <= 2 ? 4 : roleId == 3 ? 3 : 2}
            onClick={handleSubmitSave}
            type="button"
          >
            {roleId <= 2
              ? "Valider (resp site)"
              : roleId == 3
              ? "Valider (resp prod)"
              : "Envoyer pour validation"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PointageTableau;