import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import WORKERS_API from "../services/workersAPI";

const AccueilPage = () => {
  const [workers, setWorkers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await WORKERS_API.findAll();
      console.log("success fetch", data);
      setWorkers(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="worker-container">
      {workers
        .sort((a, b) => {
          return a.firstname.localeCompare(b.firstname);
        })
        .map((worker) => (
          <Link
            key={worker.id}
            className="worker"
            to={{
              pathname: "/connexion",
              state: worker.id,
            }}
          >
            <p>
              {worker.firstname} {worker.lastname}
            </p>
          </Link>
        ))}
    </main>
  );
};

export default AccueilPage;
