import React, { useEffect, useState } from "react";
import CLIENTSAFFAIRE_API from "../../services/clientsAffaireAPI";
import { Table } from "react-bootstrap";
import ClientAffaireModal from "../modals/ClientAffaireModal";
import { toast } from "react-toastify";

const AdminClientsAffaireComponent = () => {
  const [clientsAffaire, setClientsAffaire] = useState([]);

  // FETCH
  const fetchClientsAffaire = async () => {
    try {
      const clientsAffaire = await CLIENTSAFFAIRE_API.findAll();
      console.log("success fetch clientsAffaire", clientsAffaire);
      setClientsAffaire(clientsAffaire);
    } catch (error) {
      console.log("erreur fetch clientsAffaire", error);
      toast.error("Erreur au chargement des types de clients des affaires.");
    }
  };

  useEffect(() => {
    fetchClientsAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="color-text col-xl-5 col-12">
      <h1 className="text-center">Clients</h1>
      {clientsAffaire.length === 0 ? (
        <p>Aucun type de client n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Type de client</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientsAffaire.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <ClientAffaireModal
                    fetchClientsAffaire={fetchClientsAffaire}
                    clientAffaire={e}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ClientAffaireModal fetchClientsAffaire={fetchClientsAffaire} />
    </div>
  );
};

export default AdminClientsAffaireComponent;
