import { useState, useEffect } from "react";
import "./funcionario.css";
import secureLocalStorage from "react-secure-storage";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
export default function AtividadeFuncionario() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [modoSidebar, setModoSidebar] = useState("close");

  useEffect(() => {
    async function carregarTarefas() {
      const funcionarioId = secureLocalStorage.getItem("funcionarioId");

      if (!funcionarioId) {
        setErro("Usuário não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://localhost:7283/api/Tarefas/funcionario/${funcionarioId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setAtividades([]);
            setLoading(false);
            return;
          } else {
            throw new Error("Erro ao buscar tarefas");
          }
        }

        const data = await response.json();

        setAtividades(
          (Array.isArray(data) ? data : data ? [data] : []).map((t) => ({
            id: t.id,
            nome: t.nomeTarefa ?? t.descricao,
            feito: false,
          }))
        );
      } catch (error) {
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }

    carregarTarefas();
  }, []);

  function marcarFeito(id) {
    setAtividades((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, feito: !item.feito } : item
      )
    );
  }

  if (loading) return <h2>Carregando...</h2>;
  if (erro) return <h2>{erro}</h2>;

  return (
    <div className="pagina-funcionario">
       <MenuLateral
              modo={modoSidebar}
              setModo={setModoSidebar}
              perfil={{ path: "/perfil", ativo: false }}
              geral={{ path: "/Acesso", nome: "Acessos", ativo: false }}
              gestores={{ path: "/gestores", ativo: false }}
              tarefas={{ path: "/CadastroDeTarefas", ativo: false }}
              mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
              dominios={{ path: "/Dominio", ativo: false }}
              compara={{ path: "/comparacao", ativo: false }}
              voltarATela={{ ativo: true, nome: "Retornar" }}
            />
      <div className="container">
        <h1 className="titulo">✔️ Atividades do Dia</h1>

        {atividades.length === 0 ? (
          <p>Não há tarefas cadastradas para este funcionário.</p>
        ) : (
          <div className="lista">
            {atividades.map((item) => (
              <label
                key={item.id}
                className={`atividade ${item.feito ? "feito" : ""}`}
              >
                <span>{item.nome}</span>
                <input
                  type="checkbox"
                  checked={item.feito}
                  onChange={() => marcarFeito(item.id)}
                />
                <span className="toggle"></span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
