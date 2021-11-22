import React, { useEffect, useState } from "react";
import MOTIFSABSENCE_API from "../../services/motifsAbsenceAPI";
import { Table } from "react-bootstrap";
import MotifAbsenceModal from "../../components/modals/MotifAbsenceModal";

const AdminMotifsAbsencePage = () => {
  const [motifsAbsence, setMotifsAbsence] = useState([]);

  // FETCH
  const fetchMotifsAbsence = async () => {
    try {
      const motifsAbsence = await MOTIFSABSENCE_API.findAll();
      console.log("success fetch", motifsAbsence);
      setMotifsAbsence(motifsAbsence);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchMotifsAbsence();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text">
      <h1 className="text-center">Motifs d'absence</h1>
      {motifsAbsence.length === 0 ? (
        <p>Aucun motif d'absence n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du motif d'absence</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {motifsAbsence.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <MotifAbsenceModal
                    fetchMotifsAbsence={fetchMotifsAbsence}
                    motifAbsence={m}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <MotifAbsenceModal fetchMotifsAbsence={fetchMotifsAbsence} />
    </main>
  );
};

export default AdminMotifsAbsencePage;
