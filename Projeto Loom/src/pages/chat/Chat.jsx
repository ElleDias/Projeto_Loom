import React, { useState, useEffect } from "react";
import axios from "axios";
import './Chat.css';
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { jwtDecode } from "jwt-decode";

function Chat({ contatoId }) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    if (!token) {
        console.error("Token não encontrado!");
    }

    const decodedToken = token ? jwtDecode(token) : null;
    const userAId = decodedToken?.id; // ID do usuário logado
    const userBId = contatoId; // ID do contato
    const API_URL = "https://localhost:7283/api/Mensagem";

    // BUSCAR MENSAGENS
    useEffect(() => {
        const fetchMessages = async () => {
            if (!token || !userAId || !userBId) return;

            try {
                const response = await axios.get(
                    `${API_URL}/conversation/${userAId}/${userBId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Erro ao carregar mensagens:", error.response?.data || error.message);
            }
        };

        fetchMessages();
    }, [token, userAId, userBId]);

    // ENVIAR MENSAGEM
    const handleSend = async () => {
        if (!token || !userAId || !userBId) return;
        if (newMessage.trim() === "") return;

        const messagePayload = {
            remetenteId: userAId,
            destinatarioId: userBId,
            conteudo: newMessage
        };

        try {
            const response = await axios.post(API_URL, messagePayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(prev => [...prev, response.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <header className="chat-header">
                    <FaChevronLeft size={20} color="#000000ff" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                    <div className="user-info">
                        <p className="imessage-label">LOOM</p>
                        <h3 className="user-name">Fulano da Silva</h3>
                    </div>
                    <FaInfoCircle size={20} color="#000000ff" style={{ cursor: 'pointer' }} />
                </header>

                <div className="chat-body">
                    {messages.map(msg => (
                        <div key={msg.id} className={`chat-message ${msg.remetenteId === userAId ? "sent" : "received"}`}>
                            <p className="message-text">{msg.conteudo}</p>
                            <span className="message-time">
                                {new Date(msg.enviadaEm).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Digite uma mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend} style={{ backgroundColor: '#000000ff' }}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
