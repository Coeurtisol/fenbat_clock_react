import React, { useEffect, useState } from "react";
import AUTH_API from "../services/authAPI";
import COMMANDES_API from "../services/commandesAPI";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingIcon from "../components/loadingIcon";
import permissions from "../configs/permissions";

const ListeCommandes = ({}) => {
  const [loading, setLoading] = useState(true);
  const [commandes, setCommandes] = useState([]);
  const permissionId = AUTH_API.getPermissionId();
  let resp = true;
  if (permissionId == permissions.chefEquipe.id) resp = false;

  // FETCH
  const fetchCommandes = async () => {
    try {
      let data;
      if (resp) {
        data = await COMMANDES_API.findAll();
      } else {
        data = await COMMANDES_API.findAllByUser(AUTH_API.getId());
      }
      console.log("success fetch commandes", data);
      setCommandes(data);
      setLoading(false);
    } catch (error) {
      console.log("erreur fetch commandes", error);
      toast.error("Erreur au chargement de commandes.");
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // UPDATE
  const handleChangerEtat = async (commandeId, etat) => {
    try {
      const response = await COMMANDES_API.changerEtat(commandeId, etat);
      console.log("success update commande", response);
      toast.success(`Commande ${etat}.`);
    } catch (error) {
      console.log("erreur update commande", error);
      toast.error("Erreur à la validation de la commande.");
    }
    fetchCommandes();
  };

  // ORDER COMMANDS
  const order = ["En attente", "Validée", "Refusée"];
  commandes.sort((a, b) => {
    return order.indexOf(a.etat) - order.indexOf(b.etat);
  });

  return (
    <>
      {!loading && (
        <div className="row bg-light">
          {commandes.length ? (
            <Table
              className="mb-0"
              variant="light"
              // striped
              // bordered
              // hover
              responsive
            >
              <thead>
                <tr className="align-middle">
                  <th className="text-center">Article</th>
                  <th className="text-center">Fournisseur</th>
                  <th className="text-center">Quantité</th>
                  {resp && <th className="text-center">Chef d'équipe</th>}
                  <th className="text-center">Affaire</th>
                  <th className="text-center" colSpan={2}>
                    État
                  </th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((c) => (
                  <tr key={c.id}>
                    <td className="text-center">{c.article.name}</td>
                    <td className="text-center">{c.fournisseur.name}</td>
                    <td className="text-center">{c.quantite}</td>
                    {resp && (
                      <td className="text-center">
                        {c.user.firstname} {c.user.lastname}
                      </td>
                    )}
                    <td className="text-center">{c.affaire?.name}</td>
                    <td className="text-center">{c.etat}</td>

                    <td>
                      {resp && c.etat == "En attente" ? (
                        <>
                          <Button
                            className="m-1"
                            variant="success"
                            onClick={() => handleChangerEtat(c.id, "Validée")}
                          >
                            Valider
                          </Button>
                          <Button
                            className="m-1"
                            variant="danger"
                            onClick={() => handleChangerEtat(c.id, "Refusée")}
                          >
                            Refuser
                          </Button>
                        </>
                      ) : (
                        c.etat != "En attente" && (
                          <>
                            {`le ${
                              c.valideeLe &&
                              new Date(c.valideeLe).toLocaleString()
                            }`}
                            <br />
                            {`par ${c.valideePar}`}
                          </>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h5 className="text-center mt-2">"Aucune commande"</h5>
          )}
        </div>
      )}
      {loading && <LoadingIcon />}
    </>
  );
};

export default ListeCommandes;
