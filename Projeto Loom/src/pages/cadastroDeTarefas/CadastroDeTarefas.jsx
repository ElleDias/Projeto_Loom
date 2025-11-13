import { useState, useEffect } from "react";
import "./CadastroDeTarefas.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { getTarefas, criarTarefa } from "../../Services/tarefasService";

export default function App() {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [employee, setEmployee] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 Buscar tarefas no carregamento
  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const dados = await getTarefas();
      setTasks(dados);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // 🔹 Cadastrar tarefa (API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) return alert("Informe o nome da tarefa!");

    const novaTarefa = {
      nomeTarefa: taskName,
      descricao: description,
      funcionarioId: employee || null, // se seu backend espera um id numérico
    };

    try {
      await criarTarefa(novaTarefa);
      alert("Tarefa cadastrada com sucesso!");
      setTaskName("");
      setDescription("");
      setEmployee("");
      carregarTarefas(); // Atualiza lista
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      alert("Erro ao cadastrar tarefa.");
    }
  };

  return (
    <div className={`app-container sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={true}
        geral={{ ativo: true, path: "/gerente", nome: "Acessos" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: false, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="form-card">
        <h2>Cadastro de Tarefas</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label>Nome da Tarefa</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Digite o nome da tarefa"
          />

          <label>Descrição (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição"
          ></textarea>

          <label>Funcionário Responsável</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option value="">Nenhum</option>
            <option value="1">Brenda</option>
            <option value="2">Caio</option>
            <option value="3">Yasmim</option>
            <option value="4">Danielle</option>
            <option value="5">Laura</option>
            <option value="6">Lucas</option>
          </select>

          <button type="submit" className="save-btn">
            Salvar Tarefa
          </button>
        </form>
      </div>

      <div className="task-list">
        <h3>Tarefas Cadastradas</h3>
        {tasks.length === 0 ? (
          <p className="empty-text">Nenhuma tarefa cadastrada ainda.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.nomeTarefa}</strong> — {task.funcionarioId || "Sem responsável"}
                {task.descricao && (
                  <p className="task-desc">{task.descricao}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
