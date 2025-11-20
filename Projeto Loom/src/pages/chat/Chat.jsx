import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./Chat.css";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7283/api/Chat";

function Chat() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { contatoId } = useParams();
    const location = useLocation();
    const [userAId, setUserAId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatBodyRef = useRef(null);
    const [contatoNome] = useState(location.state?.contatoNome || "Contato");

    // 1️⃣ Decodifica token
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userIdGuid = decoded?.id || decoded?.nameid || decoded?.sub;
            if (userIdGuid) setUserAId(userIdGuid.toString());
        } catch (err) {
            console.error("Erro ao decodificar token:", err);
        }
    }, [token]);

    // 2️⃣ Função para buscar mensagens
    const fetchMessages = useCallback(async () => {
        if (!token || !userAId || !contatoId) return;

        try {
            const response = await axios.get(
                `${API_URL}/conversation/${userAId}/${contatoId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Aqui definimos o nome do remetente para mostrar no chat
            const msgs = response.data.map((msg) => ({
                ...msg,
                RemetenteNome:
                    msg.remetenteId.toLowerCase() === userAId.toLowerCase()
                        ? "Você"
                        : contatoNome, // <--- aqui usamos o nome do contato
            }));

            setMessages(msgs);
            scrollToBottom();
        } catch (error) {
            console.error("Erro ao carregar mensagens:", error.response?.data || error.message);
        }
    }, [token, userAId, contatoId, contatoNome]);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    // 3️⃣ Enviar mensagem
    const handleSend = async () => {
        if (!newMessage.trim() || !userAId || !contatoId) return;

        const payload = {
            RemetenteId: userAId,
            DestinatarioId: contatoId,
            Conteudo: newMessage,
        };

        try {
            const response = await axios.post(`${API_URL}/mensagem`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessages((prev) => [
                ...prev,
                { ...response.data, RemetenteNome: "Você" },
            ]);
            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        }
    };

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <header className="chat-header">
                    <FaChevronLeft
                        size={20}
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer" }}
                    />
                    <div className="user-info">
                        <p className="imessage-label">CHAT</p>
                        <h3 className="user-name">{contatoNome}</h3>
                    </div>
                    <FaInfoCircle size={20} />
                </header>

                <div className="chat-body" ref={chatBodyRef}>
                    {messages.length === 0 ? (
                        <p className="no-messages">Nenhuma mensagem ainda.</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`chat-message ${
                                    msg.remetenteId.toLowerCase() === userAId.toLowerCase()
                                        ? "sent"
                                        : "received"
                                }`}
                            >
                                <p className="message-text">
                                    <strong>{msg.RemetenteNome}</strong>: {msg.conteudo}
                                </p>
                                <span className="message-time">
                                    {msg.enviadaEm
                                        ? new Date(msg.enviadaEm).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : ""}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Digite uma mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        disabled={!userAId || !contatoId}
                    />
                    <button onClick={handleSend} disabled={!userAId || !contatoId}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
