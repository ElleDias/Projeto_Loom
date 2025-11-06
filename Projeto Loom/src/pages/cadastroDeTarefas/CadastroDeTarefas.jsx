import { useState } from "react";
import "./CadastroDeTarefas.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";

export default function App() {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [employee, setEmployee] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return alert("Informe o nome da tarefa!");

    const newTask = {
      id: Date.now(),
      name: taskName,
      description,
      employee: employee || "Sem responsável",
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setDescription("");
    setEmployee("");
  };

  return (
    <div className={` app-container sidebar-${modoSidebar}`}>
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
            <option value="Brenda">Brenda</option>
            <option value="Caio">Caio</option>
            <option value="Yasmim">Yasmin</option>
            <option value="Danielle">Danielle</option>
            <option value="Laura">Laura</option>
            <option value="Lucas">Lucas</option>
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
                <strong>{task.name}</strong> — {task.employee}
                {task.description && (
                  <p className="task-desc">{task.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
