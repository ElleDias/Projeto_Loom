import React, { useState } from "react";
import "./funcionario.css";

export default function AtividadeFuncionario() {
  const [atividades, setAtividades] = useState([
    { id: 1, nome: "Organizar o estoque", feito: false },
    { id: 2, nome: "Responder e-mails", feito: false },
    { id: 3, nome: "Atender clientes", feito: false },
    { id: 4, nome: "Limpar a estação de trabalho", feito: false },
  ]);

  function marcarFeito(id) {
    setAtividades((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, feito: !item.feito } : item
      )
    );
  }

  return (
    <div className="container">
      <h1 className="titulo">✔️ Atividades do Dia</h1>

      <div className="lista">
        {atividades.map((item) => (
          <div
            key={item.id}
            className={`atividade ${item.feito ? "feito" : ""}`}
            onClick={() => marcarFeito(item.id)}
          >
            <input type="checkbox" checked={item.feito} readOnly />
            <span>{item.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

