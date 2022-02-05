import React, { useEffect, useState } from "react";
import DONNEURSAFFAIRE_API from "../../services/donneursAffaireAPI";
import { Table } from "react-bootstrap";
import DonneurAffaireModal from "../modals/DonneurAffaireModal";
import { toast } from "react-toastify";

const AdminDonneursAffaireComponent = () => {
  const [donneursAffaire, setDonneursAffaire] = useState([]);

  // FETCH
  const fetchDonneursAffaire = async () => {
    try {
      const donneursAffaire = await DONNEURSAFFAIRE_API.findAll();
      console.log("success fetch donneursAffaire", donneursAffaire);
      setDonneursAffaire(donneursAffaire);
    } catch (error) {
      console.log("erreur fetch donneursAffaire", error);
      toast.error("Erreur au chargement des donneurs d'affaires.");
    }
  };

  useEffect(() => {
    fetchDonneursAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="color-text col-xl-5 col-12">
      <h1 className="text-center">Donneurs d'ordre</h1>
      {donneursAffaire.length === 0 ? (
        <p>Aucun donneur d'ordre n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du donneur d'ordre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donneursAffaire.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <DonneurAffaireModal
                    fetchDonneursAffaire={fetchDonneursAffaire}
                    donneurAffaire={e}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <DonneurAffaireModal fetchDonneursAffaire={fetchDonneursAffaire} />
    </div>
  );
};

export default AdminDonneursAffaireComponent;
