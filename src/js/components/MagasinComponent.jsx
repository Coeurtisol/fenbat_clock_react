import React, { useEffect, useState } from "react";
import CATEGORIES_API from "../services/categoriesAPI";
import ARTICLES_API from "../services/articlesAPI";
import { ListGroup, Table } from "react-bootstrap";
import CommandeModal from "../components/modals/CommandeModal";

const Magasin = ({}) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentCategorie, setCurrentCategorie] = useState(null);

  // FETCH
  const fetchCategories = async () => {
    try {
      const data = await CATEGORIES_API.findAll();
      console.log("success fetch categorie", data);
      setCategories(data);
    } catch (error) {
      console.log("erreur fetch categorie", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const data = await ARTICLES_API.findAll();
      console.log("success fetch articles", data);
      setArticles(data);
    } catch (error) {
      console.log("erreur fetch articles", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // FILTRAGE ARTICLES
  const filteredArticlesByCategorie = articles.filter((a) =>
    currentCategorie == null
      ? a
      : a.categorie != null && a.categorie.id == currentCategorie
  );

  const filteredArticlesBySearch = filteredArticlesByCategorie.filter((a) =>
    a.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="row bg-light">
      <div className="col-3 p-0 border-end border-5">
        <div className="text-center"></div>
        <ListGroup>
          <ListGroup.Item
            onClick={() => setCurrentCategorie(null)}
            className={currentCategorie == null ? "command-active-item" : null}
          >
            Tous les articles
          </ListGroup.Item>
        </ListGroup>
        {categories.map((c) => (
          <ListGroup.Item
            className={currentCategorie == c.id ? "command-active-item" : null}
            key={c.id}
            onClick={() => setCurrentCategorie(c.id)}
          >
            {c.name}
          </ListGroup.Item>
        ))}
      </div>
      <div className="col p-0">
        <div className="d-flex justify-content-evenly p-2 border-bottom border-5">
          <input
            type="search"
            placeholder="Rechercher un article"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        {filteredArticlesBySearch.length ? (
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
                <th className="text-center">Nom de l'article</th>
                <th className="text-center">Fournisseurs</th>
                <th className="text-center">Catégorie</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredArticlesBySearch.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td className="text-center">
                    {a.fournisseurs.map((f) => (
                      <React.Fragment key={f.fournisseur.id}>
                        {f.fournisseur.name}
                        <br />
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="text-center">{a.categorie?.name}</td>
                  <td>
                    <CommandeModal article={a} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h5 className="text-center mt-2">
            Aucun article dans cette catégorie ou ne correspondant à la
            recherche
          </h5>
        )}
      </div>
    </div>
  );
};

export default Magasin;
