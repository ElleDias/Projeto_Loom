import  { useState } from "react";
import "./TarefasPendentes.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";

function TarefasPendentes() {
  const [filtro, setFiltro] = useState("");
  const [modoSidebar, setModoSidebar] = useState("close"); 

  const tarefas = [
    { nome: "Tarefa 1", funcionario: "Brenda", status: "Em andamento", data: "10/07/2026" },
    { nome: "Tarefa 2", funcionario: "Caio", status: "Pendente", data: "10/07/2026" },
    { nome: "Tarefa 3", funcionario: "Yasmim", status: "Concluída", data: "10/07/2026" },
    { nome: "Tarefa 4", funcionario: "Danielle", status: "Concluída", data: "10/07/2026" },
    { nome: "Tarefa 5", funcionario: "Laura", status: "Em andamento", data: "10/07/2026" },
    { nome: "Tarefa 6", funcionario: "Lucas", status: "Pendente", data: "10/07/2026" },
    { nome: "Tarefa 7", funcionario: "Funcionário 7", status: "Pendente", data: "14/07/2026" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Concluída":
        return "status concluida";
      case "Em andamento":
        return "status andamento";
      case "Pendente":
        return "status pendente";
      default:
        return "status";
    }
  };

  const tarefasFiltradas = tarefas.filter((t) =>
    t.funcionario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={` tela-pendentes sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={true}
        geral={{ ativo: true, path: "/gerente", nome: "Geral" }}
        gestores={{ ativo: true, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      {/* ⬇ aplica classe de sidebar dinamicamente */}
      <div className={`modal-overlay sidebar-${modoSidebar}`}>
        <div className="modal">
          <h1 className="title">TAREFAS DA EQUIPE</h1>

          <form className="form">
            <label htmlFor="funcionario">Informe o nome do funcionário:</label>
            <input
              id="funcionario"
              type="text"
              placeholder="Ex: Funcionário 3"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </form>

          <div className="table">
            <div className="table-header">
              <div>Nome da Tarefa</div>
              <div>Funcionário</div>
              <div>Status</div>
              <div>Data</div>
            </div>

            {tarefasFiltradas.length > 0 ? (
              tarefasFiltradas.map((t, i) => (
                <div key={i} className="table-row">
                  <div className="task-name">{t.nome}</div>
                  <div className="employee">
                    <div className="avatar">👤</div>
                    <span>{t.funcionario}</span>
                  </div>
                  <div className={getStatusClass(t.status)}>{t.status}</div>
                  <div className="date">{t.data}</div>
                </div>
              ))
            ) : (
              <p className="no-results">Nenhum funcionário encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarefasPendentes;
