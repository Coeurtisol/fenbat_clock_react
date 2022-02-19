import React, { useEffect, useState } from "react";
import CATEGORIES_API from "../../services/categoriesAPI";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import CategoriesModal from "../../components/modals/CategoriesModal";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  // FETCH
  const fetchCategories = async () => {
    try {
      const data = await CATEGORIES_API.findAll();
      console.log("success fetch categorie", data);
      setCategories(data);
    } catch (error) {
      console.log("erreur fetch categorie", error);
      toast.error("Erreur au chargement des catégories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // TEMPLATE
  return (
    <main className="color-text admin">
      <h1 className="text-center">Catégories</h1>
      {categories.length === 0 ? (
        <p>Aucune Catégorie n'est enregistrée pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover responsive>
          <thead>
            <tr className="align-middle">
              <th className="text-center">Nom de la catégorie</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td style={{ width: "1px" }} className="text-center">
                  <CategoriesModal fetchCategories={fetchCategories} categorie={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <CategoriesModal fetchCategories={fetchCategories} />
    </main>
  );
};

export default AdminCategoriesPage;
