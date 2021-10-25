import React, { useEffect } from "react";
import { useState } from "react";
import WORKERS_API from "../services/workersAPI";

const PointagePage = () => {
  const [workersWorkSessions, setWorkersWorkSessions] = useState([]);

  const fetchData = async () => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const data = await WORKERS_API.findAllByDay(date);
      console.log("success fetch", data);
      setWorkersWorkSessions(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // {"btn btn-" + (edit ? "danger" : "primary")}
  return (
    <main className="worker-container">
      {workersWorkSessions.map((worker) => (
        <div
          key={worker.id}
          className={
            "worker " +
            (worker.workSessions.filter(
              (workSession) => workSession.sessionEnd == null
            ).length === 0
              ? "absent"
              : "present")
          }
        >
          <p>
            {worker.firstname} {worker.lastname}
          </p>
        </div>
      ))}
    </main>
  );
};

export default PointagePage;
