import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="color-text color text-center mt-5">
      <h1>Page introuvable</h1>
      <Link className="btn btn-primary btn-sm" to="/">Retour à l'accueil</Link>
    </main>
  );
};

export default NotFoundPage;
