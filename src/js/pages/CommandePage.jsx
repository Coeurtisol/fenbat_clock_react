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
  const [currentArticle, setCurrentArticle] = useState(null);

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

  // TEMPLATE
  return (
    <main className="container color-text mt-2">
      <h1 className="text-center">Commandes</h1>
      <div className="commande-container">
        <div className="row">
          <div className="col-9 mx-auto">
            <ListGroup horizontal>
              <ListGroup.Item>Magasin</ListGroup.Item>
              <ListGroup.Item>Panier</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row bg-light">
          <div className="col-3 p-0 border-end border-5">
            {/* <h2 className="text-center">Catégories</h2> */}
            <div className="text-center">
              <CategorieModal fetchCategories={fetchCategories} />
            </div>
            <ListGroup>
              <ListGroup.Item
                onClick={() => setCurrentCategorie(null)}
                className={
                  currentCategorie == null ? "command-active-item" : null
                }
              >
                Tous les articles
              </ListGroup.Item>
            </ListGroup>
            {categories.map((c) => (
              <ListGroup.Item
                className={
                  currentCategorie == c.id ? "command-active-item" : null
                }
                key={c.id}
                onClick={() => setCurrentCategorie(c.id)}
              >
                {c.name}
                {currentCategorie == c.id && (
                  <>
                    <br />
                    <CategorieModal
                      fetchCategories={fetchCategories}
                      categorie={c}
                    />
                  </>
                )}
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
              <ArticleModal
                fetchArticles={fetchArticles}
                currentCategorie={currentCategorie}
                categories={categories}
              >
                Ajouter un article
              </ArticleModal>
            </div>
            {filteredArticlesBySearch.length ? (
              filteredArticlesBySearch.map((a) => (
                <ListGroup.Item
                  className={`${
                    currentArticle == a.id ? "command-active-item" : null
                  }`}
                  key={a.id}
                  onClick={() => setCurrentArticle(a.id)}
                >
                  <div className="d-flex justify-content-between">
                    <div className="align-middle">{a.name}</div>
                    {currentArticle == a.id && (
                      <ArticleModal
                        fetchArticles={fetchArticles}
                        currentCategorie={currentCategorie}
                        categories={categories}
                        article={a}
                      >
                        Ajouter un article
                      </ArticleModal>
                    )}
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center">
                Aucun article dans cette catégorie
              </ListGroup.Item>
            )}
            {}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommandePage;
