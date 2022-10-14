import React, { useEffect, useState } from "react";
import AUTH_API from "../services/authAPI";
import COMMANDES_API from "../services/commandesAPI";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingIcon from "../components/loadingIcon";

const ListeCommandes = () => {
  const [loading, setLoading] = useState(true);
  const [commandes, setCommandes] = useState([]);
  const [sortBy, setSortBy] = useState({ value: "etat", desc: false });
  const estResp = AUTH_API.estResp();

  // FETCH
  const fetchCommandes = async () => {
    try {
      let data;
      if (estResp) {
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

  // SORT COMMANDES
  const handleChangeSort = ({ target }) => {
    const value = target.dataset.sort;
    if (value === sortBy.value) {
      setSortBy({ ...sortBy, desc: !sortBy.desc });
      return;
    }
    setSortBy({ ...sortBy, value, desc: false });
  };
  const sortedCommandes = [...commandes];
  switch (sortBy.value) {
    case "article":
      sortedCommandes.sort((a, b) => {
        return sortBy.desc
          ? b.article.localeCompare(a.article)
          : a.article.localeCompare(b.article);
      });
      break;

    case "fournisseur":
      sortedCommandes.sort((a, b) => {
        return sortBy.desc
          ? b.fournisseur.localeCompare(a.fournisseur)
          : a.fournisseur.localeCompare(b.fournisseur);
      });
      break;

    case "chef d'équipe":
      sortedCommandes.sort((a, b) => {
        return sortBy.desc
          ? b.user.localeCompare(a.user)
          : a.user.localeCompare(b.user);
      });
      break;

    case "affaire":
      sortedCommandes.sort((a, b) => {
        return sortBy.desc
          ? b.affaire?.localeCompare(a.affaire)
          : a.affaire?.localeCompare(b.affaire);
      });
      break;

    case "etat":
      sortedCommandes.sort((a, b) => {
        const order = ["En attente", "Validée", "Refusée"];
        return sortBy.desc
          ? order.indexOf(b.etat) - order.indexOf(a.etat)
          : order.indexOf(a.etat) - order.indexOf(b.etat);
      });
      break;

    default:
      break;
  }

  return (
    <>
      {!loading && (
        <div className="row bg-light mb-3">
          {commandes.length ? (
            <Table
              className="mb-0"
              variant="light"
              striped
              // bordered
              // hover
              responsive
            >
              <thead>
                <tr className="align-middle">
                  <th
                    className={`text-center ${
                      sortBy.value === "article" ? "sorted" : null
                    } ${
                      sortBy.value === "article" && sortBy.desc
                        ? "sorted-desc"
                        : null
                    }`}
                    data-sort="article"
                    onClick={handleChangeSort}
                  >
                    Article
                  </th>
                  <th
                    className={`text-center ${
                      sortBy.value === "fournisseur" ? "sorted" : null
                    } ${
                      sortBy.value === "fournisseur" && sortBy.desc
                        ? "sorted-desc"
                        : null
                    }`}
                    data-sort="fournisseur"
                    onClick={handleChangeSort}
                  >
                    Fournisseur
                  </th>
                  <th className="text-center">Quantité</th>
                  {estResp && (
                    <th
                      className={`text-center ${
                        sortBy.value === "chef d'équipe" ? "sorted" : null
                      } ${
                        sortBy.value === "chef d'équipe" && sortBy.desc
                          ? "sorted-desc"
                          : null
                      }`}
                      data-sort="chef d'équipe"
                      onClick={handleChangeSort}
                    >
                      Chef d'équipe
                    </th>
                  )}
                  <th
                    className={`text-center ${
                      sortBy.value === "affaire" ? "sorted" : null
                    } ${
                      sortBy.value === "affaire" && sortBy.desc
                        ? "sorted-desc"
                        : null
                    }`}
                    data-sort="affaire"
                    onClick={handleChangeSort}
                  >
                    Affaire
                  </th>
                  <th
                    className={`text-center ${
                      sortBy.value === "etat" ? "sorted" : null
                    } ${
                      sortBy.value === "etat" && sortBy.desc
                        ? "sorted-desc"
                        : null
                    }`}
                    colSpan={2}
                    data-sort="etat"
                    onClick={handleChangeSort}
                  >
                    État
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCommandes.map((c) => (
                  <tr key={c.id}>
                    <td className="text-center">{c.article}</td>
                    <td className="text-center">{c.fournisseur}</td>
                    <td className="text-center">{c.quantite}</td>
                    {estResp && <td className="text-center">{c.user}</td>}
                    <td className="text-center">{c.affaire}</td>
                    <td className="text-center">{c.etat}</td>

                    <td>
                      {estResp && c.etat === "En attente" ? (
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
                        c.etat !== "En attente" && (
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
