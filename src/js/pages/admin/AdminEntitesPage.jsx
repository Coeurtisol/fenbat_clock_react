import React, { useEffect, useState } from "react";
import ENTITES_API from "../../services/entitesAPI";
import { Table, Form, Button } from "react-bootstrap";

const AdminEntitesPage = () => {
  const [entites, setEntites] = useState([]);
  const [newEntite, setNewEntite] = useState({
    name: "",
  });

  // FETCH
  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchEntites();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    console.log(newEntite);
    const { name, value } = target;
    setNewEntite({ [name]: value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ENTITES_API.create(newEntite);
      console.log("success submit", response);
      setNewEntite({
        name: "",
      });
    } catch (error) {
      console.log("erreur submit", error);
    }
    fetchEntites();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await ENTITES_API.deleteOne(id);
      console.log("success delete", response);
    } catch (error) {
      console.log("erreur delete", error);
    }
    fetchEntites();
  };

  // TEMPLATE
  return (
    <main>
      <h1>Liste des entités :</h1>
      {entites.length === 0 ? (
        <p>Aucune entité n'est enregistrée pour le moment</p>
      ) : (
        <Table className="bt-0" variant="light" striped bordered hover>
          <thead>
            <tr>
              <th>Nom de l'entité</th>
            </tr>
          </thead>
          <tbody>
            {entites.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td style={{ width: "1px" }}>
                  <Button variant="primary" type="submit" disabled size="sm">
                    Modifier
                  </Button>
                </td>
                <td style={{ width: "1px" }}>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => handleDelete(m.id)}
                    size="sm"
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h1>Ajouter une entité :</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nom de l'entité"
            value={newEntite.name}
            onChange={handlechange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Envoyer
        </Button>
      </Form>
    </main>
  );
};

export default AdminEntitesPage;
