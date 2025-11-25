import React, { useEffect, useState } from "react";
import "./ComparacaoFunc.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import api from "../../Services/services";

export default function ComparadorDeFuncionarios() {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [funcionarios, setFuncionarios] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);

        // ✅ Busca funcionários
        const resFuncionarios = await api.get("/Funcionario/minha-equipe");
        setFuncionarios(resFuncionarios.data);

        // ✅ Busca tarefas concluídas
        const resTarefas = await api.get("/Atividade/concluidas/por-funcionario");
        setTarefasConcluidas(resTarefas.data);
      } catch (err) {
        console.error("❌ Erro ao carregar dados:", err);
        setErro("Não foi possível carregar os dados. Verifique se a API está rodando em http://localhost:7283");
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className={`comparador-container sidebar-${modoSidebar}`}>
      <MenuLateral
         perfil={{ ativo: true, path: "/Perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/TelaDoGestor", nome: "Geral" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        acessos={{ ativo: true, path: "/Acesso", nome: "Acessos" }}
        dominios={{ ativo: true, path: "/Dominio", nome: "Domínios" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
         compara={{ path: "/comparacao", ativo: true }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className="comparador-card">
        <h2 className="titulo">📊 Comparador de Funcionários</h2>

        {carregando ? (
          <p className="carregando">Carregando dados...</p>
        ) : erro ? (
          <p className="erro">{erro}</p>
        ) : (
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
                      <td>{f.departamento || "—"}</td>
                      <td>
                        <div className="barra-container">
                          <div
                            className="barra-desempenho"
                            style={{ width: `${f.desempenho || 0}%` }}
                          ></div>
                          <span className="porcentagem">
                            {f.desempenho ?? 0}%
                          </span>
                        </div>
                      </td>
                      <td>{f.projetos ?? 0}</td>
                      <td>{f.faltas ?? 0}</td>
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
        )}
      </div>
    </div>
  );
}
