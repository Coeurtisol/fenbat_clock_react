import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Button, Form } from "react-bootstrap";
import AUTH_API from "../services/authAPI";
import { toast } from "react-toastify";

const LoginForm = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AUTH_API.externalLogin(credentials);
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      setIsAuthenticated(true);
      toast.success("Connexion réussi");
      console.log("success login", res);
      history.replace("/");
    } catch (error) {
      console.log("erreur login", error);
      setCredentials({
        ...credentials,
        password: "",
      });
    }
  };

  return (
    <main className="color-text col-11 col-md-6 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          {/* <Form.Label>Adresse email</Form.Label> */}
          <Form.Control
            name="email"
            type="email"
            placeholder="Adresse email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          {/* <Form.Label>Mot de passe</Form.Label> */}
          <Form.Control
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Connexion
          </Button>
        </Form.Group>
      </Form>
    </main>
  );
};

export default LoginForm;
