import { useState, useEffect } from "react";
import "./Acessos.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import axios from "axios";

const Acesso = () => {
  const [modoSidebar, setModoSidebar] = useState("close");
  const [acessoGestor, setAcessoGestor] = useState([]);

  useEffect(() => {
    const buscarAcessos = async () => {
      try {
        const response = await axios.get("https://localhost:7283/api/Acesso");
        setAcessoGestor(response.data);
      } catch (error) {
        console.error("Erro ao carregar acessos:", error);
      }
    };

    buscarAcessos();
  }, []);

  return (
    <div className={` monitoramento-container sidebar-${modoSidebar}`}>
      <MenuLateral
        perfil={{ ativo: true, path: "/Perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/TelaDoGestor", nome: "Geral" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        tarefas={{ path: "/CadastroDeTarefas", ativo: true }}
        dominios={{ ativo: true, path: "/Dominio", nome: "Domínios" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
          compara={{ path: "/comparacao", ativo: true }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <h1 className="titulo">Acessos</h1>
      <p className="subtitulo">Equipe de desenvolvimento</p>

      <div className="tabela">
        <div className="cabecalho">
          <span>Funcionário</span>
          <span>Acesso Atual</span>
          <span>Tempo Ativo</span>
        </div>

        {acessoGestor.map((f, index) => (
          <div className="linha" key={index}>
            <span className="coluna">{f.funcionario}</span>
            <span className="coluna">{f.acessoAtual}</span>
            <span className="coluna">{f.tempoAtivo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acesso;
