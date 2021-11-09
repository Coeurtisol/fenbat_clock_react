import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import AUTH_API from "../services/authAPI";

const Loginkeypad = ({ location, history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const id = location.state;
  if (!id) {
    history.replace("/loginuserlist");
  }

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5));
  }, []);

  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState({
    value: "",
    mask: "",
  });

  // BOUTTONS CHIFFRE
  const handleClickAdd = (x) => {
    if (password.value.length < 3) {
      setPassword({
        value: password.value + x,
        mask: password.mask + "X",
      });
      return;
    }
    console.log("connexion mdp=", password.value + x);
    setPassword({
      value: password.value + x,
      mask: password.mask + "X",
    });
    setLocked(true);
    const credentials = { id, password: password.value + x };
    login(credentials);
  };

  // BOUTTON SUPPRIMER / (ANNULER)
  const handleReset = () => {
    setPassword({
      value: "",
      mask: "",
    });
    setLocked(false);
  };

  // CONNEXION
  const login = async (credentials) => {
    try {
      const data = await AUTH_API.login(credentials);
      // await AUTH_API.login(credentials);
      setIsAuthenticated(true);
      console.log("success login", data);
      history.replace("/");
    } catch (error) {
      console.log("erreur login", error);
    }
    handleReset();
  };

  // TEMPLATE
  return (
    <main className="keypad">
      <div className="keypad_container">
        <div className="keypad_input">{password.mask}</div>
        <button className="keypad_num" onClick={handleReset}>
          DEL
        </button>
        {numbers.map((number) => (
          <button
            className="keypad_num"
            key={number}
            onClick={() => handleClickAdd(number)}
            disabled={locked}
          >
            {number}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Loginkeypad;
