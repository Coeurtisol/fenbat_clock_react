import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "../components/loadingIcon";
import AUTH_API from "../services/authAPI";

const Loginuserlist = ({ isSecure }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await AUTH_API.getActiveUsers();
      console.log("success fetch", data);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log("erreur fetch", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isSecure && (
        <Link to={`/loginpage`} className="btn btn-primary m-3">
          Connexion classique
        </Link>
      )}
      {!loading && (
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
      )}
      {loading && <LoadingIcon />}
    </>
  );
};

export default Loginuserlist;
