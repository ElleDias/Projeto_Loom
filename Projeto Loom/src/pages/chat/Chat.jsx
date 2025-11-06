import React, { useState, useEffect } from "react";
import axios from "axios";
import './Chat.css'; // Importa o CSS da tela de chat
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 

function Chat() { 
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // IDs (adaptar conforme a lógica real de login/contato)
    const userAId = 1; // ID do usuário logado (enviando - bolhas azuis)
    const userBId = 2; // ID do contato (recebendo - bolhas cinzas)
    const API_URL = "https://localhost:7283/api/mensagem";

    useEffect(() => {
        // Mock de mensagens, remova ao usar a API real
        setMessages([
            { id: 1, remetenteId: userBId, conteudo: "Olá, ficamos feliz com a sua entrada no time!", enviadaEm: new Date(Date.now() - 300000).toISOString() },
            { id: 2, remetenteId: userAId, conteudo: "Obrigado! Darei meu máximo aqui.", enviadaEm: new Date(Date.now() - 120000).toISOString() },
            { id: 3, remetenteId: userBId, conteudo: "Perfeito!", enviadaEm: new Date().toISOString() },
        ]);
    }, []);

    const handleSend = () => {
        if (newMessage.trim() === "") return;
        const newMsg = {
            id: Date.now(),
            remetenteId: userAId,
            conteudo: newMessage,
            enviadaEm: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                
                {/* CABEÇALHO IMESSAGE */}
                <header className="chat-header">
                    <FaChevronLeft 
                        size={20} 
                        color="#000000ff" 
                        onClick={() => navigate(-1)} 
                        style={{ cursor: 'pointer' }} 
                    />

                    <div className="user-info">
                        <p className="imessage-label">LOOM</p>
                        <h3 className="user-name">Fulano da Silva</h3>
                    </div>
                    
                    <FaInfoCircle size={20} color="#000000ff" style={{ cursor: 'pointer' }} />
                </header>
                
                {/* CORPO DO CHAT */}
                <div className="chat-body">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-message ${msg.remetenteId === userAId ? "sent" : "received"}`}
                        >
                            <p className="message-text">{msg.conteudo}</p>
                            <span className="message-time">
                                {new Date(msg.enviadaEm).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>
                    ))}
                </div>
                
                {/* ÁREA DE INPUT */}
                <div className="chat-input-area">
                    <input 
                        type="text" 
                        placeholder="LOOM" 
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