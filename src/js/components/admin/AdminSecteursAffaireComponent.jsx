import React, { useEffect, useState } from "react";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import { Table } from "react-bootstrap";
import SecteurAffaireModal from "../modals/SecteurAffaireModal";

const AdminSecteursAffaireComponent = () => {
  const [secteursAffaire, setSecteursAffaire] = useState([]);

  // FETCH
  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchSecteursAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="admin-form col-xl-5 col-12">
      <h1 className="text-center">Secteurs</h1>
      {secteursAffaire.length === 0 ? (
        <p>Aucune secteur n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du secteur</th>
              <th className="text-center w-auto">
                <SecteurAffaireModal fetchSecteursAffaire={fetchSecteursAffaire} />
              </th>
            </tr>
          </thead>
          <tbody>
            {secteursAffaire.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <SecteurAffaireModal fetchSecteursAffaire={fetchSecteursAffaire} secteurAffaire={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminSecteursAffaireComponent;
