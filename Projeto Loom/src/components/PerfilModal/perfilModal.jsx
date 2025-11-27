import { useState, useEffect } from "react";
import "./perfilModal.css";

const Modal = ({ open, onClose, userData, onSave }) => {
  const [form, setForm] = useState({
    telefone: "",
    cpf: "",
    endereco: "",
  });

  useEffect(() => {
    if (open && userData) {
      setForm({
        telefone: userData.telefone ?? "",
        cpf: userData.cpf ?? "",
        endereco: userData.endereco ?? "",
      });
    }
  }, [open, userData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const salvar = () => {
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box animate-slideUp">

        <h2>Editar Perfil</h2>

        {/* ----------------------------- */}
        {/* INFORMAÇÕES NÃO EDITÁVEIS */}
        {/* ----------------------------- */}
        <div className="info-box">
          <div className="modal-grid">
            
            {/* Coluna 1: Nome e Cargo */}
            <div>
              <label>Nome:</label>
              <input 
                type="text"
                value={userData.nome || "Não informado"}
                disabled
              />

              <label className="mt-8">Cargo:</label>
              <input 
                type="text"
                value={userData.cargo || "Não informado"}
                disabled
              />
            </div>

            {/* Coluna 2: Email */}
            <div>
              <label>Email:</label>
              <input 
                type="email"
                value={userData.email || "Não informado"}
                disabled
              />
            </div>

          </div>
        </div>

        {/* Divisor */}
        <hr className="modal-divider" />

        {/* ----------------------------- */}
        {/* INFORMAÇÕES EDITÁVEIS */}
        {/* ----------------------------- */}
        <div className="modal-grid">

          {/* Telefone / Endereço */}
          <div>
            <label>Telefone:</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
            />

            <label className="mt-8">Endereço:</label>
            <input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              placeholder="Digite seu endereço"
            />
          </div>

          {/* CPF */}
          <div>
            <label>CPF:</label>
            <input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
            />
          </div>

        </div>

        {/* BOTÕES */}
        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={salvar}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
