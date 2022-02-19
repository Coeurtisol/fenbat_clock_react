import React, { useEffect, useState } from "react";
import FOURNISSEURS_API from "../../services/fournisseursAPI";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import FournisseursModal from "../../components/modals/FournisseursModal";

const AdminFournisseursPage = () => {
  const [fournisseurs, setFournisseurs] = useState([]);

  // FETCH
  const fetchFournisseurs = async () => {
    try {
      const data = await FOURNISSEURS_API.findAll();
      console.log("success fetch fournisseurs", data);
      setFournisseurs(data);
    } catch (error) {
      console.log("erreur fetch fournisseurs", error);
      toast.error("Erreur au chargement des fournisseurs.");
    }
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text admin">
      <h1 className="text-center">Fournisseurs</h1>
      {fournisseurs.length === 0 ? (
        <p>Aucun fournisseur n'est enregistré pour le moment</p>
      ) : (
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
              <th className="text-center">Nom du fournisseur</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fournisseurs.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <FournisseursModal
                    fetchFournisseurs={fetchFournisseurs}
                    fournisseur={f}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <FournisseursModal fetchFournisseurs={fetchFournisseurs} />
    </main>
  );
};

export default AdminFournisseursPage;
