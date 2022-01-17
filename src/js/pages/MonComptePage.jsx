import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import AUTH_API from "../services/authAPI";
import USERS_API from "../services/usersAPI";
import ENTITES_API from "../services/entitesAPI";
import { toast } from "react-toastify";

const MonComptePage = () => {
  const id = AUTH_API.getId();
  const [lockedSubmit, setLockedSubmit] = useState(false);
  const [entites, setEntites] = useState([]);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    accessCode: "",
    entiteId: null,
  });

  // FETCH
  const fetchUser = async (userId) => {
    try {
      const data = await USERS_API.findOne(userId);
      console.log("success fetch user", data);
      setUser({
        ...user,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        accessCode: "",
        entiteId: data.entite && data.entite.id,
      });
    } catch (error) {
      console.log("erreur fetch user", error);
      toast.error("Erreur au chargement de l'utilisateur.");
    }
  };

  const fetchEntites = async () => {
    try {
      const entites = await ENTITES_API.findAll();
      console.log("success fetch entites", entites);
      setEntites(entites);
    } catch (error) {
      console.log("erreur fetch entites", error);
      toast.error("Erreur au chargement des entités.");
    }
  };

  useEffect(() => {
    fetchUser(id);
    fetchEntites();
  }, []);

  // FUNCTIONS
  const handlechange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    if (name === "accessCode") {
      if (value.length > 0 && value.length < 4) {
        setLockedSubmit(true);
      } else {
        setLockedSubmit(false);
      }
      if (value.length > 4) {
        return;
      }
    }
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !user.accessCode && delete user.accessCode;
    console.log("update user", user);
    try {
      const response = await USERS_API.update(id, user);
      console.log("success update user", response);
      toast.success("Informations misent à jour.");
    } catch (error) {
      console.log("erreur update user", error);
      toast.error("Erreur à la mise à jour des informations.");
    }
    fetchUser(id);
  };

  return (
    <main className="color-text">
      <h1>Mon compte</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Prénom de l'utilisateur"
            value={user.firstname}
            onChange={handlechange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Nom de l'utilisateur"
            value={user.lastname}
            onChange={handlechange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Adresse email de l'utilisateur"
            value={user.email || ""}
            onChange={handlechange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            placeholder="Numéro de téléphone de l'utilisateur"
            value={user.phoneNumber || ""}
            onChange={handlechange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Code d'accès (4 chiffres)</Form.Label>
          <Form.Control
            type="number"
            name="accessCode"
            placeholder="Laisser vide pour ne pas modifier le code d'accès"
            value={user.accessCode}
            onChange={handlechange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Entité</Form.Label>
          <Form.Select
            name="entiteId"
            onChange={handlechange}
            value={user.entiteId || ""}
            required
          >
            <option value="0">
              -- Ne pas assigner d'entité à l'utilisateur --
            </option>
            {entites.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="success" type="submit" disabled={lockedSubmit}>
          Envoyer
        </Button>
      </Form>
    </main>
  );
};

export default MonComptePage;
