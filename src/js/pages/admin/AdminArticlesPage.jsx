import React, { useEffect, useState } from "react";
import ARTICLES_API from "../../services/articlesAPI";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ArticlesModal from "../../components/modals/ArticlesModal";

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  // FETCH
  const fetchArticles = async () => {
    try {
      const data = await ARTICLES_API.findAll();
      console.log("success fetch articles", data);
      setArticles(data);
    } catch (error) {
      console.log("erreur fetch articles", error);
      toast.error("Erreur au chargement des articles.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text admin">
      <h1 className="text-center">Articles</h1>
      {articles.length === 0 ? (
        <p>Aucun articles n'est enregistré pour le moment</p>
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
              <th className="text-center">Nom de l'article</th>
              <th className="text-center">Fournisseurs</th>
              <th className="text-center">Catégorie</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  {c.fournisseurs.map((f) => (
                    <React.Fragment key={f.fournisseur.id}>
                      {f.fournisseur.name}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td>{c.categorie?.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <ArticlesModal fetchArticles={fetchArticles} article={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ArticlesModal fetchArticles={fetchArticles} />
    </main>
  );
};

export default AdminArticlesPage;
