import React, { useEffect, useState } from "react";
import CATEGORIES_API from "../services/categoriesAPI";
import ARTICLES_API from "../services/articlesAPI";
import CategorieModal from "../components/modals/categorieModal";
import ArticleModal from "../components/modals/articleModal";
import { ListGroup } from "react-bootstrap";

const CommandePage = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentCategorie, setCurrentCategorie] = useState(null);

  // FETCH
  const fetchCategories = async () => {
    try {
      const data = await CATEGORIES_API.findAll();
      console.log("success fetch", data);
      setCategories(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const data = await ARTICLES_API.findAll();
      console.log("success fetch", data);
      setArticles(data);
    } catch (error) {
      console.log("erreur fetch", error);
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

  // TEMPLATE
  return (
    <main className="container">
      <h1>Commandes</h1>
      <div className="commande-container">
        <div className="row">
          <div className="col-9 offset-3">
            <ListGroup horizontal>
              <ListGroup.Item>Magasin</ListGroup.Item>
              <ListGroup.Item>Panier</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row bg-light">
          <div className="col-3 p-0 border-end border-5">
            <h2>Catégorie</h2>
            <div className="text-center">
              <CategorieModal fetchCategories={fetchCategories} />
            </div>
            <ListGroup>
              <ListGroup.Item onClick={() => setCurrentCategorie(null)}>
                Toutes les articles
              </ListGroup.Item>
            </ListGroup>
            {categories.map((c) => (
              <ListGroup.Item
                key={c.id}
                onClick={() => setCurrentCategorie(c.id)}
              >
                {c.name}
              </ListGroup.Item>
            ))}
          </div>
          <div className="col">
            <div className="d-flex justify-content-evenly p-2 border-bottom border-5">
              <input
                type="search"
                placeholder="Rechercher un article"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <ArticleModal
                fetchArticles={fetchArticles}
                currentCategorie={currentCategorie}
              >
                Ajouter un article
              </ArticleModal>
            </div>
            {filteredArticlesBySearch.map((a) => (
              <div key={a.id}>{a.name}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommandePage;
