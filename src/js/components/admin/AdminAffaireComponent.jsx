import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import AFFAIRES_API from "../../services/affairesAPI";
import AffaireModal from "../modals/AffaireModal";

const AdminAffaireComponent = () => {
  const [affaires, setAffaires] = useState([]);

  // FETCH
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
    fetchAffaires();
  }, []);

  // TEMPLATE
  return (
    <div>
      <h1 className="text-center">Affaires</h1>
      {affaires.length === 0 ? (
        <p>Aucune affaire n'est enregistrée pour le moment</p>
      ) : (
        <>
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
                <th className="text-center">Affaire</th>
                <th className="text-center">Donneur d'ordre</th>
                <th className="text-center">Client</th>
                <th className="text-center">Localisation</th>
                <th className="text-center">Corps d'état</th>
                <th className="text-center">Entité</th>
                <th className="text-center">Etat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {affaires.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.donneurAffaire.name}</td>
                  <td>{a.clientAffaire.name}</td>
                  <td>
                    {`Secteur : ${a.secteurAffaire.name}`}
                    <br />
                    {`Adresse : ${a.adresse}`}
                    <br />
                    {`Indemnité trajet : ${a.zone?.label || "non calculée"}`}
                  </td>
                  <td>{a.typeAffaire.name}</td>
                  <td>{a.entite.name}</td>
                  <td>{a.etat}</td>
                  <td style={{ width: "1px" }} className="text-center">
                    <AffaireModal fetchAffaires={fetchAffaires} affaire={a} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <AffaireModal fetchAffaires={fetchAffaires} />
    </div>
  );
};

export default AdminAffaireComponent;
