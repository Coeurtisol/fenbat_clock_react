import React, { useEffect, useState } from "react";
import AFFAIRES_API from "../../services/affairesAPI";
import AffaireModal from "../../components/modals/AffaireModal";
import AdminTypesAffaireComponent from "../../components/admin/AdminTypesAffaireComponent";
import AdminSecteursAffaireComponent from "../../components/admin/AdminSecteursAffaireComponent";
import AdminClientsAffaireComponent from "../../components/admin/AdminClientsAffaireComponent";
import AdminDonneursAffaireComponent from "../../components/admin/AdminDonneursAffaireComponent";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminAffairesPage = () => {
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
    <main className="color-text admin">
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
                    {a.secteurAffaire.name}
                    <br />
                    {a.adresse}
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
      <div className="d-flex flex-wrap justify-content-evenly">
        <AdminSecteursAffaireComponent />
        <AdminTypesAffaireComponent />
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <AdminClientsAffaireComponent />
        <AdminDonneursAffaireComponent />
      </div>
    </main>
  );
};

export default AdminAffairesPage;
