import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import USERS_API from "../services/usersAPI";

const Loginuserlist = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await USERS_API.getAllActive();
      console.log("success fetch", data);
      setUsers(data);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="d-flex flex-wrap justify-content-evenly user-container">
      {users
        .sort((a, b) => {
          return a.firstname.localeCompare(b.firstname);
        })
        .map((user) => (
          <Link
            key={user.id}
            className="user"
            to={{
              pathname: "/loginkeypad",
              state: user.id,
            }}
          >
            <div>
              {user.firstname} {user.lastname}
              <br />({user.role.name})
            </div>
          </Link>
        ))}
    </main>
  );
};

export default Loginuserlist;
