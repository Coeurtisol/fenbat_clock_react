import React, { useEffect } from "react";
import { useState } from "react";
import USERS_API from "../services/usersAPI";
import POINTAGES_API from "../services/pointagesAPI";

const PointagePage = () => {
  const [workersWorkSessions, setWorkersWorkSessions] = useState([]);

  const fetchData = async () => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const data = await USERS_API.findAllByDay(date);
      console.log("success fetch", data);
      setWorkersWorkSessions(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const handleStartSession = async (workerId) => {
    try {
      const data = await POINTAGES_API.create({
        workerId,
        pointageDebut: new Date(),
      });
      console.log("success startSession", data);
    } catch (error) {
      console.log("erreur startSession", error);
    }
    fetchData();
  };

  const handleEndSession = async (worker) => {
    const workSessionId = worker.workSessions.filter(
      (ws) => ws.sessionEnd == null
    );
    try {
      const data = await POINTAGES_API.update({
        id: workSessionId[0].id,
        pointageFin: new Date(),
      });
      console.log("success endSession", data);
    } catch (error) {
      console.log("erreur endSession", error);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="worker-container">
      {workersWorkSessions
        .sort((a, b) => {
          return a.firstname.localeCompare(b.firstname);
        })
        .map((worker) => (
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
            onClick={
              worker.workSessions.filter(
                (workSession) => workSession.sessionEnd == null
              ).length === 0
                ? () => handleStartSession(worker.id)
                : () => handleEndSession(worker)
            }
          >
            <p className="m-0">
              {worker.firstname} {worker.lastname}
            </p>
          </div>
        ))}
    </main>
  );
};

export default PointagePage;
