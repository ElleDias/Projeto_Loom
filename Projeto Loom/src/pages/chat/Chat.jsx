import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { jwtDecode } from "jwt-decode";

function Chat({ contatoId }) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = "https://localhost:7283/api/Mensagem";

    let decodedToken;
    let userAId = null;

    if (token) {
        try {
            decodedToken = jwtDecode(token);
            userAId = decodedToken?.id;
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
        }
    }

    const userBId = contatoId;

    // 📩 Buscar mensagens da conversa
    useEffect(() => {
        const fetchMessages = async () => {
            if (!token || !userAId || !userBId) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${API_URL}/conversation/${userAId}/${userBId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Erro ao carregar mensagens:", error.response?.data || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [token, userAId, userBId]);

    // ✉️ Enviar mensagem
    const handleSend = async () => {
        if (!token || !userAId || !userBId || newMessage.trim() === "") return;

        const messagePayload = {
            remetenteId: userAId,
            destinatarioId: userBId,
            conteudo: newMessage,
        };

        try {
            const response = await axios.post(API_URL, messagePayload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessages((prev) => [...prev, response.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        }
    };

    // 🔄 Estado de carregamento
    if (isLoading) {
        return <p>Carregando chat...</p>;
    }

    return (
        <div className="chat-page">
            <div className="chat-container">
                <header className="chat-header">
                    <FaChevronLeft
                        size={20}
                        color="#000000ff"
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer" }}
                    />
                    <div className="user-info">
                        <p className="imessage-label">LOOM</p>
                        <h3 className="user-name">Fulano da Silva</h3>
                    </div>
                    <FaInfoCircle size={20} color="#000000ff" style={{ cursor: "pointer" }} />
                </header>

                <div className="chat-body">
                    {messages.length === 0 ? (
                        <p className="no-messages">Nenhuma mensagem ainda.</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`chat-message ${
                                    msg.remetenteId === userAId ? "sent" : "received"
                                }`}
                            >
                                <p className="message-text">{msg.conteudo}</p>
                                <span className="message-time">
                                    {new Date(msg.enviadaEm).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
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
                    />
                    <button onClick={handleSend} style={{ backgroundColor: "#000000ff" }}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
