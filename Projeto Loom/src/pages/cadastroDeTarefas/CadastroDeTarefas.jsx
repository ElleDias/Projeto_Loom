import { useState, useEffect } from "react";
import "./CadastroDeTarefas.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { getTarefas, criarTarefa } from "../../Services/tarefasService";
import { getFuncionarios } from "../../Services/tarefasService";

export default function App() {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [tasks, setTasks] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // 🔹 Carregar tarefas e funcionários
  useEffect(() => {
    carregarTarefas();
    carregarFuncionarios();
  }, []);

  const carregarTarefas = async () => {
    try {
      const dados = await getTarefas();
      setTasks(dados);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const carregarFuncionarios = async () => {
    try {
      const dados = await getFuncionarios();
      setFuncionarios(dados);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  // 🔹 Cadastrar nova atividade
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) return alert("Informe o nome da atividade!");

    const novaTarefa = {
      descricao: taskName,
      dataInicio: new Date().toISOString(),
      dataFim: null,
      funcionarioId: employee || null,
      status,
    };

    try {
      await criarTarefa(novaTarefa);
      alert("Atividade cadastrada!");

      setTaskName("");
      setDescription("");
      setEmployee("");
      setStatus("Pendente");

      carregarTarefas();
    } catch (error) {
      console.error("Erro ao cadastrar atividade:", error);
    }
  };

  // Função para mostrar o nome do funcionário na listagem
  const getNomeFuncionario = (id) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    return funcionario ? funcionario.nome : "Sem responsável";
  };

  return (
    <div className={`app-container sidebar-${modoSidebar}`}>
      <MenuLateral
        modo={modoSidebar}
        setModo={setModoSidebar}
        perfil={{ path: "/perfil", ativo: true }}
        geral={{ path: "/Acesso", nome: "Acessos", ativo: true }}
        gestores={{ path: "/gestores", ativo: false }}
        tarefas={{ path: "/CadastroDeTarefas", ativo: false }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        dominios={{ path: "/Dominio", ativo: true }}
        compara={{ path: "/comparacao", ativo: true }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
      />
      <div className="form-card">
        <h2>Cadastro de Atividades</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <label>Nome da Atividade</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Digite o nome da atividade"
          />

          <label>Descrição (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>

          <label>Funcionário Responsável</label>
          <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
            <option value="">Nenhum</option>

            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome} — {f.cargo}
              </option>
            ))}

          </select>

          <button type="submit" className="save-btn">
            Salvar Atividade
          </button>
        </form>
      </div>

      <div className="task-list">
        <h3>Atividades Cadastradas</h3>

        {tasks.length === 0 ? (
          <p className="empty-text">Nenhuma atividade cadastrada ainda.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.descricao}</strong> <br />
                 Funcionário: {getNomeFuncionario(task.funcionarioId)} <br />
                 Status: <b>{task.status}</b>
                {task.dataInicio && (
                  <p className="task-desc">
                    Início: {new Date(task.dataInicio).toLocaleDateString("pt-BR")}
                  </p>
                )}
                {task.descricao && <p>{task.descricao}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
