import React, { useEffect, useState } from "react";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import { Table } from "react-bootstrap";
import TypeAffaireModal from "../modals/TypeAffaireModal";

const AdminTypesAffaireComponent = () => {
  const [typesAffaire, setTypesAffaire] = useState([]);

  // FETCH
  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchTypesAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="admin-form col-xl-5 col-12">
      <h1 className="text-center">Types</h1>
      {typesAffaire.length === 0 ? (
        <p>Aucune type n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du type</th>
              <th className="text-center w-auto">
                <TypeAffaireModal fetchTypesAffaire={fetchTypesAffaire} />
              </th>
            </tr>
          </thead>
          <tbody>
            {typesAffaire.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <TypeAffaireModal
                    fetchTypesAffaire={fetchTypesAffaire}
                    typeAffaire={e}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminTypesAffaireComponent;
