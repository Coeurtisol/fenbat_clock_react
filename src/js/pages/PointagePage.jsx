import React, { useEffect } from "react";
import { useState } from "react";
import USERS_API from "../services/usersAPI";
import POINTAGES_API from "../services/pointagesAPI";

const PointagePage = () => {
  const [usersWorkSessions, setUsersWorkSessions] = useState([]);

  const fetchData = async () => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const data = await USERS_API.findAllByDay(date);
      console.log("success fetch", data);
      setUsersWorkSessions(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  const handleStartSession = async (userId) => {
    try {
      const data = await POINTAGES_API.create({
        userId,
        pointageDebut: new Date(),
      });
      console.log("success startSession", data);
    } catch (error) {
      console.log("erreur startSession", error);
    }
    fetchData();
  };

  const handleEndSession = async (user) => {
    const workSessionId = user.workSessions.filter(
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
    <main className="user-container">
      {usersWorkSessions
        .sort((a, b) => {
          return a.firstname.localeCompare(b.firstname);
        })
        .map((user) => (
          <div
            key={user.id}
            className={
              "user " +
              (user.workSessions.filter(
                (workSession) => workSession.sessionEnd == null
              ).length === 0
                ? "absent"
                : "present")
            }
            onClick={
              user.workSessions.filter(
                (workSession) => workSession.sessionEnd == null
              ).length === 0
                ? () => handleStartSession(user.id)
                : () => handleEndSession(user)
            }
          >
            <p className="m-0">
              {user.firstname} {user.lastname}
            </p>
          </div>
        ))}
    </main>
  );
};

export default PointagePage;
