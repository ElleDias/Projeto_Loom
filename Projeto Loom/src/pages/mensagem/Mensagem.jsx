import React, { useState, useEffect } from "react";
import "./Mensagem.css";
import { FaUserCircle } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

function Mensagens() {
  const navigate = useNavigate();
  const [modoSidebar, setModoSidebar] = useState("close");
  const [mensagens, setMensagens] = useState([]);

  // ✅ Recupera token e tenta decodificar ID do usuário logado
const token = secureLocalStorage.getItem("token");
  let userAId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("🔍 Token decodificado:", decodedToken);
      
      // ✅ 2. Corrigir a extração do ID para pegar o valor numérico (int)
      const rawId =
        decodedToken?.IdUsuarioInteiro ||
        decodedToken?.nameid ||
        decodedToken?.id;

      if (rawId) {
        // Garantir que é um número inteiro (resolvendo o erro 400 anterior)
        userAId = parseInt(rawId, 10);
      }
      
    } catch (error) {
      console.error("❌ Erro ao decodificar token:", error);
    }
  } else {
    console.warn("⚠️ Nenhum token encontrado no secureLocalStorage!");
  }

  const userBId = 2; 
  // API_URL AGORA USA userAId e userBId (que devem ser números)
  const API_URL = `https://localhost:7283/api/Mensagem/conversation/${userAId}/${userBId}`;

  useEffect(() => {
    const fetchMensagens = async () => {
      if (!userAId || !token) {
        console.warn("Usuário não autenticado ou token ausente!");
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Mensagens recebidas:", response.data);
        setMensagens(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar mensagens:",
          error.response?.data || error.message
        );
      }
    };

    fetchMensagens();
  }, [userAId, userBId]);

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
          {mensagens.length > 0 ? (
            mensagens.map((msg) => (
              <div
                key={msg.id}
                className="item-mensagem"
                onClick={() => handleOpenChat(msg.id)}
              >
                <div className="avatar-e-info">
                  <FaUserCircle size={40} color="#001608" />
                  <div className="info-mensagem">
                    <p className="nome-contato">
                      {msg.remetente?.nome || "Usuário"}
                    </p>
                    <p className="ultima-mensagem">{msg.conteudo}</p>
                  </div>
                </div>

                <div className="status-mensagem">
                  <span className="hora-mensagem">
                    {new Date(msg.dataEnvio).toLocaleString()}
                  </span>
                  <div className="bola-nao-lida">
                    <BsChatText size={18} color="#001608" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="nenhuma-mensagem">Nenhuma mensagem encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mensagens;
