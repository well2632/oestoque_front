import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="header">
      <span className="logo-text">oestoque.com.br</span>
      <button onClick={logout} className="logout">
        Sair
      </button>
    </header>
  );
}
