import { useState, useEffect } from "react";
import "./TelaGestor.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import api from "../../Services/services";
import secureLocalStorage from "react-secure-storage";

const TelaGestor = () => {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [funcionarios, setFuncionarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos"); // todos, ativo, inativo, em-atividade

  // Converte minutos em formato legível
  const formatarTempo = (minutos) => {
    if (!minutos && minutos !== 0) return "N/A";
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas === 0) return `${mins} minutos`;
    if (mins === 0) return `${horas} horas`;
    return `${horas} horas e ${mins} minutos`;
  };

  const buscarMonitoramentos = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      if (!token) {
        console.error("⚠️ Token não encontrado!");
        return;
      }

      const resposta = await api.get("https://localhost:7283/api/Monitoramento", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dados = resposta.data;

      const listaTratada = dados.map((item) => {
        const tempoInativo = item.dataFim
          ? Math.floor((new Date() - new Date(item.dataFim)) / 60000)
          : 0;

        let status = "em-atividade";
        if (item.dataFim) {
          status = tempoInativo === 0 ? "ativo" : "inativo";
        }

        return {
          nome: item.funcionario?.nome || "Desconhecido",
          tempoAtivo: formatarTempo(item.tempoEmUsoMinutos),
          tempoInativo: item.dataFim ? formatarTempo(tempoInativo) : "Em atividade",
          status,
        };
      });

      setFuncionarios(listaTratada);
    } catch (erro) {
      console.error("❌ Erro ao buscar monitoramentos:", erro.response?.data || erro.message);
    }
  };

  useEffect(() => {
    buscarMonitoramentos();
  }, []);

  // Filtra os funcionários por nome e status
  const funcionariosFiltrados = funcionarios.filter((f) => {
    const nomeValido = f.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const statusValido = filtroStatus === "todos" || f.status === filtroStatus;
    return nomeValido && statusValido;
  });

  return (
    <div className={`monitoramento-container sidebar-${modoSidebar}`}>
      <MenuLateral
        modo={modoSidebar}
        setModo={setModoSidebar}
        perfil={{ path: "/perfil", ativo: false }}
        geral={{ path: "/Acesso", nome: "Acessos", ativo: true }}
        gestores={{ path: "/gestores", ativo: false }}
        tarefas={{ path: "/CadastroDeTarefas", ativo: true }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        dominios={{ path: "/Dominio", ativo: true }}
        compara={{ path: "/comparacao", ativo: true }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
      />

      <p className="saudacao">Olá, Gestor!</p>
      <p className="texto_monitoramento">
        Este é o seu hub para o acompanhamento diário. Veja instantaneamente quem está focado e quanto tempo está sendo dedicado a tarefas.
      </p>

      <h1 className="titulo">Monitoramento da:</h1>
      <p className="subtitulo">Equipe de Desenvolvimento</p>

      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="inativo">Inativo</option>
          <option value="em-atividade">Em atividade</option>
        </select>
      </div>

      <div className="tabela">
        <div className="cabecalho">
          <span>Funcionário</span>
          <span>Tempo inativo</span>
          <span>Tempo ativo</span>         
        </div>

        {funcionariosFiltrados.length === 0 ? (
          <div className="linha">
            <span className="coluna">Nenhum funcionário encontrado</span>
          </div>
        ) : (
          funcionariosFiltrados.map((f, index) => (
            <div className="linha" key={index}>
              <span className="coluna">{f.nome}</span>
              <span className="coluna">{f.tempoInativo}</span>
              <span className="coluna">{f.tempoAtivo}</span>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TelaGestor;
