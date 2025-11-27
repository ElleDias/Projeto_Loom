
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dominios.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../Context/authContext";

export default function Dominios() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [filtro, setFiltro] = useState("Todos");
  const [modoSidebar, setModoSidebar] = useState("close");
  const [aplicativosParaClassificar, setAplicativosParaClassificar] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarAplicativosParaClassificar = useCallback(
    async (tokenRecebido) => {
      setLoading(true);

      try {
        const response = await axios.get("https://localhost:7283/api/Dominio", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenRecebido}`,
          },
        });

        console.log("Domínios recebidos da API:", response.data);
        if (response.data?.length > 0) {
          console.log("Exemplo do primeiro item:", response.data[0]); 
        }

        setAplicativosParaClassificar(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar domínios:", error);

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (token) {
      buscarAplicativosParaClassificar(token);
      const interval = setInterval(() => buscarAplicativosParaClassificar(token), 60000);
      return () => clearInterval(interval);
    }
  }, [token, buscarAplicativosParaClassificar]);

  const dominiosFiltrados =
    filtro === "Todos"
      ? aplicativosParaClassificar
      : aplicativosParaClassificar.filter((item) => item.categoria === filtro);

  return (
    <div className={`dominios-page sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={{ ativo: true, path: "/Perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/TelaDoGestor", nome: "Geral" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
       tarefas={{ path: "/CadastroDeTarefas", ativo: true }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        acessos={{ ativo: true, path: "/Acesso", nome: "Acessos" }}
        dominios={{ ativo: false, path: "/Dominio", nome: "Domínios" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
         compara={{ path: "/comparacao", ativo: true }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="dominios-container">
        <h1 className="titulo-dominio">Domínios de Aplicativos</h1>
        <p className="subtitulo-dominio">
          Aplicativos detectados que precisam de classificação Produtivo / Não Produtivo
        </p>

        {/* <div className="filtro-dominio">
          {["Todos", "Produtivo", "Improdutivo", "Em Analise"].map((tipo) => (
            <button
              key={tipo}
              className={filtro === tipo ? "ativo" : ""}
              onClick={() => setFiltro(tipo)}
            >
              {tipo}
            </button>
          ))}
        </div> */}

        <div className="tabela-dominio">
          <div className="tabela-header-dominio">
            <span>Site Em análise</span>
            <span>Site Em Produtivos</span>
            <span>Site Em Improdutivos</span>
            
          </div>

          {loading ? (
            <p>Carregando dados...</p>
          ) : dominiosFiltrados.length > 0 ? (
            dominiosFiltrados.map((item) => (
              <div className="linha-dominio" key={item.id}>
                <span
                  className={`categoria-dominio ${
                    item.categoria === "Em Analise" ? "analise-dominio" : ""
                  }`}
                >
                  {item.categoria}
                </span>

                <span>{item.produtivos}</span>
                <span>{item.improdutivos}</span>
                <span>{item.analise}</span>
              </div>
            ))
          ) : (
            <p>Nenhum domínio encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
