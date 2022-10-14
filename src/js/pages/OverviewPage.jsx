import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import datesApi from "../services/datesAPI";
import POINTAGES_API from "../services/pointagesAPI";
import LoadingIcon from "../components/loadingIcon";

const OverviewPage = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const today = new Date();

  const formatDate_yyyymmdd = (date) => {
    return date.toISOString().split("T")[0];
  };

  const defaultSelectedDate = () => {
    const manipulatedDate = new Date(today);
    manipulatedDate.setDate(manipulatedDate.getDate() - 7);
    return formatDate_yyyymmdd(new Date(manipulatedDate));
  };

  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate());
  const [usersPointages, setUsersPointages] = useState([]);

  const handleChangeSelectedDate = ({ target }) => {
    const { value } = target;
    setSelectedDate(formatDate_yyyymmdd(new Date(value)));
  };

  const redirectToGestionPointage = (userId, semaine) => {
    const { numero, annee } = semaine;
    history.push({
      pathname: `/gestion/pointage/${annee}/${numero}/${userId}`,
      state: { comefrom: "Overview" },
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchPointages = async () => {
      const date = { date: new Date(selectedDate) };
      try {
        const data = await POINTAGES_API.overview(date);
        console.log("usersPointages", data);
        setUsersPointages(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Erreur au chargement des données");
      }
    };
    fetchPointages();
  }, [selectedDate]);

  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  };
  const FormatDateColumn = (dateObject) => {
    const date = new Date(dateObject).toLocaleDateString("fr-FR", dateOptions);
    return date;
  };
  const listOfDate = datesApi.getDaysSinceDate(selectedDate);
  const listOfFormattedDate = listOfDate.map(FormatDateColumn);
  const formattedPointages = [];

  for (let i = 0; i < usersPointages.length; i++) {
    const temp = [];
    const currPointages = usersPointages[i].pointages;
    for (let j = 0; j < listOfFormattedDate.length; j++) {
      const index = currPointages.findIndex(
        (p) => FormatDateColumn(p.date) === listOfFormattedDate[j]
      );
      if (index === -1) {
        temp.push(<td key={j} className=""></td>);
      } else {
        let valid = false;
        if (currPointages.length) {
          if (
            currPointages[index]?.valeur + currPointages[index + 1]?.valeur >
            0
          )
            valid = true;
          if (
            currPointages[index]?.motifAbsenceId ||
            currPointages[index + 1]?.motifAbsenceId
          )
            valid = true;
        }
        temp.push(
          <td
            key={j}
            onClick={() =>
              redirectToGestionPointage(
                usersPointages[i].id,
                currPointages[index].semaine
              )
            }
            style={{ cursor: "pointer" }}
            className={`${valid ? "valid" : "invalid"}-cell`}
          >
            {/* {currPointages[index]?.valeur + currPointages[index + 1]?.valeur} */}
          </td>
        );
      }
    }
    formattedPointages.push(temp);
  }

  const dateMax = new Date(today).setDate(today.getDate() - 7);

  return (
    <>
      <main className="container color-text mt-2">
        <h2 className="text-center">Overview</h2>
        <Form>
          <Form.Group className="row mb-3">
            <Form.Label htmlFor="startTo">Date de départ</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChangeSelectedDate}
              id="startTo"
              value={selectedDate}
              min="2022-01-01"
              max={formatDate_yyyymmdd(new Date(dateMax))}
            />
          </Form.Group>
        </Form>
      </main>
      <div className="my-5 container-fluid">
        {!loading && (
          <Table variant="light" bordered responsive>
            <thead>
              <tr className="align-middle">
                <th className="text-center col-2">Prénom Nom</th>
                {listOfFormattedDate.map((d, i) => (
                  <th key={i} className="text-center">
                    {d}
                  </th>
                ))}
                <th className="text-center col-2">Prénom Nom</th>
              </tr>
            </thead>
            <tbody>
              {usersPointages.map((u, i) => (
                <tr key={u.id}>
                  <td>
                    {u.firstname} {u.lastname}
                  </td>
                  {formattedPointages[i]}
                  <td>
                    {u.firstname} {u.lastname}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {loading && <LoadingIcon />}
      </div>
    </>
  );
};

export default OverviewPage;
