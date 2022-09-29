import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Button, Form } from "react-bootstrap";
import AUTH_API from "../services/authAPI";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginForm = ({ isSecure }) => {
  const history = useHistory();
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
      setIsAuthenticated(true);
      toast.success("Connexion réussi.");
      console.log("success login", res);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.error);
      }
      console.log("erreur login", error);
      toast.error("Erreur lors de la tentative de connexion.");
      setCredentials({
        ...credentials,
        password: "",
      });
    }
  };

  return (
    <>
      {isSecure && (
        <Link to={`/loginuserlist`} className="btn btn-primary m-3">
          Connexion rapide
        </Link>
      )}
      <main className="col-11 col-md-6 mx-auto mt-5">
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
    </>
  );
};

export default LoginForm;
