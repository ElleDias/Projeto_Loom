import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Dominios.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";

export default function Dominios() {
  const [filtro, setFiltro] = useState("Todos");
  const [modoSidebar, setModoSidebar] = useState("close");
  const [dadosAgrupados, setDadosAgrupados] = useState([]);
  const [loading, setLoading] = useState(true);

  //  useCallback evita recriar a função a cada renderização
  const buscarMonitoramento = useCallback(async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token JWT não encontrado no localStorage!");
        setLoading(false);
        return;
      }

      //  Endpoint atualizado conforme seu backend
      const response = await axios.get("http://localhost:3000/dominio", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(" Dados da API:", response.data);

      // 🔹 Agrupando por categoria
      const agrupado = {};

      response.data.forEach((item) => {
        const categoria = item.categoria || "Em Análise";
        const dominio = item.dominio || "Desconhecido";

        if (!agrupado[categoria]) {
          agrupado[categoria] = new Set();
        }

        agrupado[categoria].add(dominio);
      });

      // 🔹 Converte para array de objetos
      const resultado = Object.entries(agrupado).map(([categoria, dominios]) => ({
        categoria,
        dominios: Array.from(dominios),
        quantidade: dominios.size,
      }));

      setDadosAgrupados(resultado);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          console.error(" Erro 401: Token inválido ou expirado.");
        } else if (status === 404) {
          console.error(" Erro 404: Endpoint não encontrado.");
        } else {
          console.error(` Erro ${status}:`, data);
        }
      } else {
        console.error(" Erro ao conectar à API:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect bem estruturado
  useEffect(() => {
    buscarMonitoramento();

    // ⏱ Opcional: atualizar a cada 60s
    const interval = setInterval(buscarMonitoramento, 60000);
    return () => clearInterval(interval);
  }, [buscarMonitoramento]);

  // 🔹 Aplicar filtro
  const dominiosFiltrados =
    filtro === "Todos"
      ? dadosAgrupados
      : dadosAgrupados.filter((item) => item.categoria === filtro);


  return (
    <div className={`dominios-page sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={{ ativo: true, path: "/Perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/TelaDoGestor", nome: "Geral" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        acessos={{ ativo: true, path: "/Acesso", nome: "Acessos" }}
        dominios={{ ativo: false, path: "/Dominio", nome: "Domínios" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="dominios-container">
        <h1 className="titulo-dominio">Domínios</h1>
        <p className="subtitulo-dominio">Equipe de desenvolvimento</p>

        {/* 🔹 Filtros */}
        <div className="filtro-dominio">
          {["Todos", "Produtivo", "Não Produtivo", "Em Análise"].map((tipo) => (
            <button
              key={tipo}
              className={filtro === tipo ? "ativo" : ""}
              onClick={() => setFiltro(tipo)}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* 🔹 Tabela */}
        <div className="tabela-dominio">
          <div className="tabela-header-dominio">
            <span>Categoria</span>
            <span>Domínios/Sistemas</span>
            <span>Quantidade</span>
          </div>

          {loading ? (
            <p>Carregando dados...</p>
          ) : dominiosFiltrados.length > 0 ? (
            dominiosFiltrados.map((item, index) => (
              <div className="linha-dominio" key={index}>
                <span
                  className={`categoria-dominio ${item.categoria === "Produtivo"
                    ? "produtivo-dominio"
                    : item.categoria === "Não Produtivo"
                      ? "nao-produtivo-dominio"
                      : "analise-dominio"
                    }`}
                >
                  {item.categoria}
                </span>
                <span>{item.dominios.join(", ")}</span>
                <span>{item.quantidade}</span>
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