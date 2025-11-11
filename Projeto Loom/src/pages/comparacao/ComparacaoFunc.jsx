import React, { useState } from "react";
import "./ComparacaoFunc.css"; // CSS extra para estilizar os elementos nativos
import { MenuLateral } from "../../components/Sidebar/Sidebar";

export default function ComparadorDeFuncionarios() {
  const funcionarios = [
    { id: 1, nome: "Yasmin", departamento: "DEV", desempenho: 87, projetos: 12, faltas: 2 },
    { id: 2, nome: "Lucas", departamento: "DEV", desempenho: 92, projetos: 15, faltas: 0 },
    { id: 3, nome: "Laura", departamento: "Redes", desempenho: 75, projetos: 8, faltas: 4 },
    { id: 4, nome: "Brenda", departamento: "Redes", desempenho: 80, projetos: 10, faltas: 1 },
    { id: 5, nome: "Caio", departamento: "Multimídia", desempenho: 85, projetos: 9, faltas: 3 },
    { id: 6, nome: "Danielle", departamento: "Multimídia", desempenho: 90, projetos: 11, faltas: 0 },
  ];
 const [modoSidebar, setModoSidebar] = useState("close");
  const [departamento, setDepartamento] = useState("");
  const [filtroNome, setFiltroNome] = useState("");

  const departamentosUnicos = [...new Set(funcionarios.map(f => f.departamento))];

  const filtrados = funcionarios.filter(f =>
    (departamento ? f.departamento === departamento : true) &&
    (filtroNome ? f.nome.toLowerCase().includes(filtroNome.toLowerCase()) : true)
  );

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
      {/* O Card agora é um div com classe CSS */}
      <div className="comparador-card"> 
        <h2 className="titulo">📊 Comparador de Funcionários</h2>

        {/* Filtros */}
        <div className="filtros">
          {/* O Select agora é um <select> nativo */}
          <select
            value={departamento}
            onChange={e => setDepartamento(e.target.value)}
            className="select-filtro"
          >
            <option value="">Todos os departamentos</option>
            {departamentosUnicos.map(dep => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          {/* O Input agora é um <input> nativo */}
          <input
            type="text"
            placeholder="Buscar funcionário..."
            value={filtroNome}
            onChange={e => setFiltroNome(e.target.value)}
            className="input-filtro"
          />
        </div>

        {/* Tabela de comparação */}
        <div className="tabela-container">
          {filtrados.length > 0 ? (
            <table className="tabela-funcionarios">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Departamento</th>
                  <th>Desempenho</th>
                  <th>Projetos</th>
                  <th>Faltas</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(f => (
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
