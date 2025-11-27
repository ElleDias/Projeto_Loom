import "./Sidebar.css";
import iconeSair from "../../assets/img/Logout.svg";
import Logo from "../../assets/img/Logo.svg";
import User from "../../assets/img/User.svg";
import Gestor from "../../assets/img/Management.svg";
import Geral from "../../assets/img/Clipboard.svg";
import Func from "../../assets/img/Notepad.svg";
import Chat from "../../assets/img/SMS.svg";
import Voltar from "../../assets/img/Voltar.svg";
import { useNavigate } from "react-router-dom";
import VoltarTela from "../../assets/img/Undo.svg";
import Menu from "../../assets/img/Menu.svg";
import { useState, useEffect } from "react";
import comparaIcon from "../../assets/img/comparacao.svg"; // ⬅️ IMPORTADO

export const MenuLateral = ({
  perfil = false,
  geral = "",
  gestores = false,
  tarefas = false,
  mensagens = false,
  voltarATela = true,
  acessos = false,
  dominios = false,
  compara = false, // ⬅️ RECEBE O NOVO ITEM
  modo,
  setModo
}) => {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 750;
      setIsMobile(newIsMobile);

      if (newIsMobile && modo !== "open") {
        setModo("hidden");
      } else if (!newIsMobile && modo === "hidden") {
        setModo("mini");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [modo, setModo]);

  const isOpen = modo === "open";
  const isHidden = modo === "hidden";

  const fecharTotal = () => setModo("hidden");
  const toggleMini = () => {
    if (isMobile) {
      fecharTotal();
    } else {
      setModo((m) => (m === "open" ? "mini" : "open"));
    }
  };

  const abrirTotal = () => setModo("open");

  if (isHidden) {
    return (
      <button className="botao-abrir-total" onClick={abrirTotal} aria-label="Abrir menu">
        <img src={Voltar} alt="Abrir" className="icone-abrir" />
      </button>
    );
  }

  const handleClick = () => {
    navigate(-1);
    if (isMobile) fecharTotal();
  };

  return (
    <aside className={`menu-lateral ${isOpen ? "aberta" : "mini"}`}>
      <div className="topo-acoes">
        <button
          className="botao-mini"
          onClick={toggleMini}
          aria-label={isOpen ? (isMobile ? "Fechar" : "Recolher") : "Expandir"}
        >
          <img
            src={Voltar}
            alt="Toggle"
            className={`icone-voltar ${isOpen ? "" : "rotacionado"}`}
          />
        </button>
      </div>

      <nav>
        <ul>

          {perfil && (
            <li onClick={() => { navigate(perfil.path); if (isMobile) fecharTotal(); }} style={{ cursor: "pointer" }}>
              <img src={User} className="icone-menu" alt="Perfil" />
              {isOpen && <span>Perfil</span>}
            </li>
          )}

          {geral.ativo && (
            <li onClick={() => { navigate(geral.path); if (isMobile) fecharTotal(); }}>
              <img src={Geral} className="icone-menu" alt={geral.nome} />
              {isOpen && <span>{geral.nome}</span>}
            </li>
          )}

          {gestores.ativo && (
            <li onClick={() => { navigate(gestores.path); if (isMobile) fecharTotal(); }}>
              <img src={Gestor} className="icone-menu" alt="Gestores" />
              {isOpen && <span>Gestores</span>}
            </li>
          )}

          {tarefas.ativo && (
            <li onClick={() => { navigate(tarefas.path); if (isMobile) fecharTotal(); }}>
              <img src={Geral} className="icone-menu" alt="Tarefas" />
              {isOpen && <span>Tarefas</span>}
            </li>
          )}

          {acessos.ativo && (
            <li onClick={() => { navigate(acessos.path); if (isMobile) fecharTotal(); }}>
              <img src={Geral} className="icone-menu" alt="Acessos" />
              {isOpen && <span>Acessos</span>}
            </li>
          )}

          {dominios.ativo && (
            <li onClick={() => { navigate(dominios.path); if (isMobile) fecharTotal(); }}>
              <img src={Geral} className="icone-menu" alt="Domínios" />
              {isOpen && <span>Domínios</span>}
            </li>
          )}

          {mensagens && (
            <li
              className={`${mensagens.ativo ? "ativo" : ""}`}
              onClick={() => { navigate(mensagens.path); if (isMobile) fecharTotal(); }}
            >
              <img src={Chat} className="icone-mensagem" alt="Mensagens" />
              {isOpen && <span>Mensagens</span>}
            </li>
          )}

          {/* ⬅️ NOVO ITEM: COMPARAÇÃO */}
          {compara && compara.ativo && (
            <li onClick={() => { navigate(compara.path); if (isMobile) fecharTotal(); }}>
              <img src={comparaIcon} className="icone-menu" alt="Comparação" />
              {isOpen && <span>Comparação</span>}
            </li>
          )}

          <li onClick={handleClick}>
            <img src={VoltarTela} className="icone-menu" alt="Retornar" />
            {isOpen && <span>Retornar</span>}
          </li>
        </ul>
      </nav>

      <div className="rodape">
        <div className="sair" onClick={() => navigate("/")}>
          <img src={iconeSair} className="icone-menu" alt="Sair" />
          {isOpen && <span>Sign Out</span>}
        </div>

        <img className="logo-sidebar" src={Logo} alt="Logo" />
      </div>
    </aside>
  );
};
