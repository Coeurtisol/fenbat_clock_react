import React, { useEffect, useState } from "react";
import TYPESAFFAIRE_API from "../../services/typesAffaireAPI";
import { Table } from "react-bootstrap";
import TypeAffaireModal from "../modals/TypeAffaireModal";
import { toast } from "react-toastify";

const AdminTypesAffaireComponent = () => {
  const [typesAffaire, setTypesAffaire] = useState([]);

  // FETCH
  const fetchTypesAffaire = async () => {
    try {
      const typesAffaire = await TYPESAFFAIRE_API.findAll();
      console.log("success fetch typesAffaire", typesAffaire);
      setTypesAffaire(typesAffaire);
    } catch (error) {
      console.log("erreur fetch typesAffaire", error);
      toast.error("Erreur au chargement des corps d'états.")
    }
  };

  useEffect(() => {
    fetchTypesAffaire();
  }, []);

  // TEMPLATE
  return (
    <div className="color-text col-xl-5 col-12">
      <h1 className="text-center">Corps d'état</h1>
      {typesAffaire.length === 0 ? (
        <p>Aucune corps d'état n'est enregistré pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom du corps d'état</th>
              <th></th>
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
      <TypeAffaireModal fetchTypesAffaire={fetchTypesAffaire} />
    </div>
  );
};

export default AdminTypesAffaireComponent;
