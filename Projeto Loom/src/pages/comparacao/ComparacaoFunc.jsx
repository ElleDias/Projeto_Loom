import React, { useState, useEffect } from "react";
import "./ComparacaoFunc.css";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export default function ComparacaoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = secureLocalStorage.getItem("token");

        if (!token) {
          setError("Token não encontrado. Faça login novamente.");
          setIsLoading(false);
          return;
        }

        const respFunc = await axios.get("https://localhost:7283/api/Funcionario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const funcionariosAPI = respFunc.data;

        // 🔥 gerar tarefas mock igual ao gráfico
        const funcionariosComDados = funcionariosAPI.map(f => {
          const concluidas = Math.floor(Math.random() * 6) + 2;
          const pendentes = Math.floor(Math.random() * 3);
          const andamento = Math.floor(Math.random() * 2);

          const total = concluidas + pendentes + andamento;
          const desempenho = Math.round((concluidas / total) * 100);

          return {
            ...f,
            concluidas,
            pendentes,
            andamento,
            desempenho
          };
        });

        // 🔥 ORDENAR DO QUE CONCLUIU MAIS PARA O QUE MENOS CONCLUIU
        const ordenado = funcionariosComDados.sort((a, b) => b.concluidas - a.concluidas);

        setFuncionarios(ordenado);

      } catch (err) {
        setError("Erro ao carregar dados: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="comparador-container">
      <div className="comparador-card">
        <h1 className="titulo">Ranking de Desempenho</h1>

        <p className="descricao-gestor">
          Funcionários ordenados automaticamente por número de tarefas concluídas.
        </p>

        {isLoading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLoading && !error && (
          <>
            <table className="tabela-funcionarios">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Funcionário</th>
                  <th>Concluídas</th>
                  <th>Desempenho</th>
                  <th>Barra</th>
                </tr>
              </thead>

              <tbody>
                {funcionarios.map((f, index) => (
                  <tr key={f.id}>
                    <td><strong>{index + 1}º</strong></td>
                    <td>{f.nome}</td>
                    <td>{f.concluidas}</td>
                    <td>{f.desempenho}%</td>

                    <td>
                      <div className="barra-container">
                        <div
                          className="barra-desempenho"
                          style={{ width: `${f.desempenho}%` }}
                        ></div>
                        <span className="porcentagem">{f.desempenho}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
