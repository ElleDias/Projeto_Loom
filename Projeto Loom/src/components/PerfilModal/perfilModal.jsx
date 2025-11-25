import { useState, useEffect } from "react";
import "./perfilModal.css";

const Modal = ({ open, onClose, userData, onSave }) => {

  const [form, setForm] = useState({
    telefone: "",
    cpf: "",
    endereco: "",
  });

  // Atualiza o formulário SEMPRE que o modal abrir
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
      <div className="modal-box">

        <h2>Editar Informações</h2>

        <label>Telefone:</label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <label>CPF:</label>
        <input
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
        />

        <label>Endereço:</label>
        <input
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-salvar" onClick={salvar}>Salvar</button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
