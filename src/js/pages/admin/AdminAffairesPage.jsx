import React from "react";
import AdminTypesAffaireComponent from "../../components/admin/AdminTypesAffaireComponent";
import AdminSecteursAffaireComponent from "../../components/admin/AdminSecteursAffaireComponent";
import AdminClientsAffaireComponent from "../../components/admin/AdminClientsAffaireComponent";
import AdminDonneursAffaireComponent from "../../components/admin/AdminDonneursAffaireComponent";
import AdminAffaireComponent from "../../components/admin/AdminAffaireComponent";

const AdminAffairesPage = () => {
  return (
    <main className="color-text admin">
      <AdminAffaireComponent />
      <div className="d-flex flex-wrap justify-content-evenly">
        <AdminSecteursAffaireComponent />
        <AdminTypesAffaireComponent />
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <AdminClientsAffaireComponent />
        <AdminDonneursAffaireComponent />
      </div>
    </main>
  );
};

export default AdminAffairesPage;
