import React, { useEffect, useState } from "react";
import "./ComparacaoFunc.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import api from "../../Services/services";

export default function ComparadorDeFuncionarios() {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [funcionarios, setFuncionarios] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);

  useEffect(() => {
    // ✅ Carrega funcionários da equipe do gestor
    api
      .get("/Funcionario/minha-equipe")
      .then((res) => {
        setFuncionarios(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro ao carregar funcionários:", err);
      });

    // ✅ Carrega tarefas concluídas
    api
      .get("/Atividade/concluidas/por-funcionario")
      .then((res) => {
        setTarefasConcluidas(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro ao carregar tarefas:", err);
      });
  }, []);

  return (
    <div className={`comparador-container sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={{ ativo: true, path: "/perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/gerente", nome: "Acessos" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: false, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="comparador-card">
        <h2 className="titulo">📊 Comparador de Funcionários</h2>

        <div className="tabela-container">
          {funcionarios.length > 0 ? (
            <table className="tabela-funcionarios">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Departamento</th>
                  <th>Desempenho</th>
                  <th>Projetos</th>
                  <th>Faltas</th>
                  <th>Tarefas Concluídas</th>
                </tr>
              </thead>

              <tbody>
                {funcionarios.map((f) => (
                  <tr key={f.id}>
                    <td>{f.nome}</td>
                    <td>{f.departamento}</td>
                    <td>
                      <div className="barra-container">
                        <div
                          className="barra-desempenho"
                          style={{ width: `${f.desempenho}%` }}
                        ></div>
                        <span className="porcentagem">{f.desempenho}%</span>
                      </div>
                    </td>

                    <td>{f.projetos}</td>
                    <td>{f.faltas}</td>

                    <td>
                      {
                        tarefasConcluidas.find(t => t.funcionarioId === f.id)
                          ?.tarefasConcluidas ?? 0
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="nenhum-resultado">Nenhum funcionário encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
