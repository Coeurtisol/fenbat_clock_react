import React, { useEffect, useState } from "react";
import AFFAIRES_API from "../../services/affairesAPI";
import AffaireModal from "../../components/modals/AffaireModal";
import AdminTypesAffaireComponent from "../../components/admin/AdminTypesAffaireComponent";
import AdminSecteursAffaireComponent from "../../components/admin/AdminSecteursAffaireComponent";
// import ETATSAFFAIRE_API from "../../services/etatsAffaireAPI";
import { Table } from "react-bootstrap";

const AdminAffairesPage = () => {
  const [affaires, setAffaires] = useState([]);

  // FETCH
  const fetchAffaires = async () => {
    try {
      const affaires = await AFFAIRES_API.findAll();
      console.log("success fetch", affaires);
      setAffaires(affaires);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchAffaires();
  }, []);

  // TEMPLATE
  return (
    <main className="admin-form">
      <h1 className="text-center">Affaires</h1>
      {affaires.length === 0 ? (
        <p>Aucune affaire n'est enregistrée pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr>
              <th>Affaire</th>
              <th>Entité</th>
              <th>Type</th>
              <th>Secteur</th>
              <th>Etat</th>
              <th className="text-center w-auto">
                <AffaireModal fetchAffaires={fetchAffaires} />
              </th>
            </tr>
          </thead>
          <tbody>
            {affaires.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.entite.name}</td>
                <td>{a.typeAffaire.name}</td>
                <td>{a.secteurAffaire.name}</td>
                <td>{a.etat}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <AffaireModal fetchAffaires={fetchAffaires} affaire={a} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="d-flex flex-wrap justify-content-evenly">
        <AdminSecteursAffaireComponent />
        <AdminTypesAffaireComponent />
      </div>
    </main>
  );
};

export default AdminAffairesPage;
