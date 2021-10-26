import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import WORKERS_API from "../services/workersAPI";

const LoginPage = ({ location, history }) => {
  const id = location.state;
  if (!id) {
    history.replace("/");
  }
  console.log(id);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
    () => Math.random() - 0.5
  );

  return (
    <main>
      {numbers.map((number) => (
        <button key={number}>{number}</button>
      ))}
    </main>
  );
};

export default LoginPage;
