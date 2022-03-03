import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import AUTH_API from "../services/authAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Loginkeypad = ({ location, history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const id = location.state;
  if (!id) {
    history.replace("/loginuserlist");
  }
  const [locked, setLocked] = useState(false);
  const [accessCode, setAccessCode] = useState({
    value: "",
    mask: "",
  });

  //  PAVE FIXE
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    setNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5));
  }, []);

  // PAVE DYNAMIQUE
  // const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
  //   () => Math.random() - 0.5
  // );

  // CONNEXION CLAVIER
  document.onkeyup = (e) => handleKeyboard(e);
  const handleKeyboard = ({ key }) => {
    if (window.location.hash.split("/"[1] == "loginkeypad") && !isNaN(key)) {
      handleClickAdd(key);
    }
  };

  // BOUTTONS CHIFFRE
  const handleClickAdd = (x) => {
    if (accessCode.value.length < 3) {
      setAccessCode({
        value: accessCode.value + x,
        mask: accessCode.mask + "X",
      });
      return;
    }
    console.log("connexion mdp = ", accessCode.value + x);
    setAccessCode({
      value: accessCode.value + x,
      mask: accessCode.mask + "X",
    });
    setLocked(true);
    const credentials = { id, accessCode: accessCode.value + x };
    login(credentials);
  };

  // BOUTTON SUPPRIMER / (ANNULER)
  const handleReset = () => {
    setAccessCode({
      value: "",
      mask: "",
    });
    setLocked(false);
  };

  // CONNEXION
  const login = async (credentials) => {
    try {
      const res = await AUTH_API.login(credentials);
      if (res.data.error) {
        toast.error(res.data.error);
        handleReset();
        return;
      }
      setIsAuthenticated(true);
      toast.success("Connexion réussi");
      console.log("success login", res);
      history.replace("/");
      document.onkeyup = null;
    } catch (error) {
      console.log("erreur login", error);
      handleReset();
    }
  };

  // TEMPLATE
  return (
    <main className="mt-3 mx-3">
      <Link to={`/loginuserlist`} className="btn btn-primary mb-3">
        Retour
      </Link>
      <input
        className="col-md-6 col-12 mx-auto keypad_input"
        value={accessCode.mask}
        disabled
      />
      <div className="keypad_del_container">
        <button className="keypad_num keypad_del" onClick={handleReset}>
          DEL
        </button>
      </div>
      <div className="mt-3 d-flex flex-wrap justify-content-evenly keypad_container">
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
