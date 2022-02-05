import React, { useEffect, useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import { Table } from "react-bootstrap";
import EntiteModal from "../../components/modals/EntiteModal";
import { toast } from "react-toastify";

const AdminEntitesPage = () => {
  const [entites, setEntites] = useState([]);

  // FETCH
  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch entites", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch entites", error);
      toast.error("Erreur au chargement des entités.");
    }
  };

  useEffect(() => {
    fetchEntites();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text admin">
      <h1 className="text-center">Entités</h1>
      {entites.length === 0 ? (
        <p>Aucune entité n'est enregistrée pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom de l'entité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entites.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <EntiteModal fetchEntites={fetchEntites} entite={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <EntiteModal fetchEntites={fetchEntites} />
    </main>
  );
};

export default AdminEntitesPage;
