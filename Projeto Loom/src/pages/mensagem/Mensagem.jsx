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

  const [chats, setChats] = useState([]);

  const [tokenLoaded, setTokenLoaded] = useState(false);

  const [userId, setUserId] = useState(null);

  const [token, setToken] = useState(null);



  // Carrega token e userId do secureLocalStorage

  useEffect(() => {

    const storedToken = secureLocalStorage.getItem("token");

    if (storedToken) {

      try {

        const decoded = jwtDecode(storedToken);

        const id = decoded?.id || decoded?.IdUsuarioInteiro || decoded?.nameid;

        setUserId(id);

        setToken(storedToken);

        setTokenLoaded(true);

      } catch (err) {

        console.error("Erro ao decodificar token:", err);

      }

    } else {

      console.warn("Nenhum token encontrado no secureLocalStorage!");

    }

  }, []);



  // Função para buscar nome de usuário se a API de mensagens não retornar

  const fetchNomeUsuario = async (id) => {

    try {

      const res = await axios.get(`https://localhost:7283/api/Usuario/${id}`, {

        headers: { Authorization: `Bearer ${token}` },

      });

      return res.data.nome || "Usuário";

    } catch (err) {

      console.error("Erro ao buscar nome do usuário:", err);

      return "Usuário";

    }

  };



  // Busca mensagens após token e userId estarem carregados

  useEffect(() => {

    if (!tokenLoaded || !userId) return;



    const fetchMensagens = async () => {

      try {

        const response = await axios.get(

          `https://localhost:7283/api/Mensagem/list/${userId}`,

          { headers: { Authorization: `Bearer ${token}` } }

        );



        const mensagens = response.data;



        // Agrupar por chatId e pegar a última mensagem de cada chat

        const chatsMap = {};

        mensagens.forEach((msg) => {

          const chatId = msg.chatId;

          if (

            !chatsMap[chatId] ||

            new Date(msg.enviadaEm) > new Date(chatsMap[chatId].enviadaEm)

          ) {

            chatsMap[chatId] = msg;

          }

        });



        // Transformar em array para renderização

        const chatsArray = await Promise.all(

          Object.values(chatsMap).map(async (msg) => {

            const outroUsuarioId =

              msg.remetenteId === userId ? msg.destinatarioId : msg.remetenteId;



            // Busca nome do outro usuário

            const outroUsuarioNome =

              msg.remetenteId === userId

                ? msg.destinatarioNome || (await fetchNomeUsuario(outroUsuarioId))

                : msg.remetenteNome || (await fetchNomeUsuario(outroUsuarioId));



            return {

              ChatId: msg.chatId,

              OutroUsuarioId: outroUsuarioId,

              OutroUsuarioNome: outroUsuarioNome,

              UltimaMensagem: msg,

            };

          })

        );



        setChats(chatsArray);

      } catch (error) {

        console.error("Erro ao buscar mensagens:", error.response?.data || error.message);

      }

    };



    fetchMensagens();

  }, [tokenLoaded, userId, token]);



  const openChat = (chat) => {

    navigate(`/chat/${chat.OutroUsuarioId}`, { state: { contatoNome: chat.OutroUsuarioNome } });

  };



  return (

    <div className={`pagina-mensagens sidebar-${modoSidebar}`}>

      <MenuLateral

        perfil={{ ativo: true, path: "/perfil", nome: "Perfil" }}

        geral={{ ativo: true, nome: "Geral" }}

        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}

        modo={modoSidebar}

        setModo={setModoSidebar}

      />



      <div className="mensagens-container">

        <h1 className="titulo-lista">Mensagens</h1>

        <div className="lista-mensagens">

          {chats.length > 0 ? (

            chats.map((chat, index) => (

              <div

                key={chat.ChatId ?? `${chat.OutroUsuarioId}-${index}`}

                className="item-mensagem"

                onClick={() => openChat(chat)}

              >

                <div className="avatar-e-info">

                  <FaUserCircle size={40} color="#001608" />

                  <div className="info-mensagem">

                    <p className="nome-contato">{chat.OutroUsuarioNome}</p>

                    <p className="ultima-mensagem">

                      {chat.UltimaMensagem?.conteudo || "Nenhuma mensagem ainda."}

                    </p>

                  </div>

                </div>

                <div className="status-mensagem">

                  <span className="hora-mensagem">

                    {chat.UltimaMensagem?.enviadaEm

                      ? new Date(chat.UltimaMensagem.enviadaEm).toLocaleTimeString([], {

                          hour: "2-digit",

                          minute: "2-digit",

                        })

                      : ""}

                  </span>

                  <div className="bola-nao-lida">

                    <BsChatText size={18} color="#001608" />

                  </div>

                </div>

              </div>

            ))

          ) : (

            <p className="nenhuma-mensagem">Nenhuma conversa encontrada.</p>

          )}

        </div>

      </div>

    </div>

  );

}



export default Mensagens; 