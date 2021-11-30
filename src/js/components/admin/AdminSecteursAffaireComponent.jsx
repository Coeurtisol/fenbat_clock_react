import React, { useEffect, useState } from "react";
import SECTEURSAFFAIRE_API from "../../services/secteursAffaireAPI";
import { Table } from "react-bootstrap";
import SecteurAffaireModal from "../modals/SecteurAffaireModal";
import { toast } from "react-toastify";

const AdminSecteursAffaireComponent = () => {
  const [secteursAffaire, setSecteursAffaire] = useState([]);

  // FETCH
  const fetchSecteursAffaire = async () => {
    try {
      const secteursAffaire = await SECTEURSAFFAIRE_API.findAll();
      console.log("success fetch secteursAffaire", secteursAffaire);
      setSecteursAffaire(secteursAffaire);
    } catch (error) {
      console.log("erreur fetch secteursAffaire", error);
      toast.error("Erreur au chargement des secteurs d'affaires.");
    }
  };

  useEffect(() => {
    fetchSecteursAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="color-text col-xl-5 col-12">
      <h1 className="text-center">Secteurs</h1>
      {secteursAffaire.length === 0 ? (
        <p>Aucun secteur n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du secteur</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {secteursAffaire.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <SecteurAffaireModal
                    fetchSecteursAffaire={fetchSecteursAffaire}
                    secteurAffaire={e}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <SecteurAffaireModal fetchSecteursAffaire={fetchSecteursAffaire} />
    </div>
  );
};

export default AdminSecteursAffaireComponent;
