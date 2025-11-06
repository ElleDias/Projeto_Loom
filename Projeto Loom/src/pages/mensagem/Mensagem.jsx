import React, { useState } from "react";
import './Mensagem.css';
import { FaUserCircle } from 'react-icons/fa';
import { BsChatText } from 'react-icons/bs';
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

function Mensagens() {
  const navigate = useNavigate();

  // Lista de mensagens simulada
  const listaMensagens = [
    { id: 1, nome: 'Fulano da Silva', ultimaMsg: 'Oi, tudo bem? Já estou online.', time: '14:30', unread: true },
    { id: 2, nome: 'Gestor Carlos', ultimaMsg: 'A reunião foi cancelada.', time: 'Ontem', unread: false },
    { id: 3, nome: 'Equipe de TI', ultimaMsg: 'Reinicie seu computador.', time: '15/10', unread: true },
    { id: 4, nome: 'Gerente RH', ultimaMsg: 'Confirmado para amanhã.', time: '09:00', unread: false },
  ];

  const [modoSidebar, setModoSidebar] = useState("close");

  const handleOpenChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className={`pagina-mensagens sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={true}
        geral={{ ativo: true, nome: "Geral" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="mensagens-container">
        <h1 className="titulo-lista">Mensagens</h1>

        <div className="lista-mensagens">
          {listaMensagens.map((mensagem) => (
            <div
              key={mensagem.id}
              className="item-mensagem"
              onClick={() => handleOpenChat(mensagem.id)}
            >
              <div className="avatar-e-info">
                <FaUserCircle size={40} color="#001608" />
                <div className="info-mensagem">
                  <p className="nome-contato">{mensagem.nome}</p>
                  <p className="ultima-mensagem">{mensagem.ultimaMsg}</p>
                </div>
              </div>

              <div className="status-mensagem">
                <span className="hora-mensagem">{mensagem.time}</span>
                {mensagem.unread && (
                  <div className="bola-nao-lida">
                    <BsChatText size={18} color="#001608" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mensagens;