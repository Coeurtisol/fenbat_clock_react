import React, { useEffect, useState } from "react";
import MOTIFSABSENCE_API from "../../services/motifsAbsenceAPI";
import { Table } from "react-bootstrap";
import MotifAbsenceModal from "../../components/modals/MotifAbsenceModal";
import { toast } from "react-toastify";

const AdminMotifsAbsencePage = () => {
  const [motifsAbsence, setMotifsAbsence] = useState([]);

  // FETCH
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

  useEffect(() => {
    fetchMotifsAbsence();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text admin">
      <h1 className="text-center">Motifs d'absence</h1>
      {motifsAbsence.length === 0 ? (
        <p>Aucun motif d'absence n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du motif d'absence</th>
              <th className="text-center">Bloquant</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {motifsAbsence.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.bloquant ? "Oui" : "Non"}</td>
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
