import { useState } from "react";
import "./TelaGestor.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";

const TelaGestor = () => {
    const [modoSidebar, setModoSidebar] = useState("close");
    const funcionarios = [
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
        { nome: "Fulano", tempoInativo: "40 minutos", tempoAtivo: "6 horas e 40 minutos" },
    ];

    return (
        <div className={`monitoramento-container sidebar-${modoSidebar}`}>

            <MenuLateral
                perfil={{ ativo: true, path: "/perfil", nome: "Perfil" }}
                geral={{ ativo: true, path: "/Acesso", nome: "Acessos" }}
                acessos={{ ativo: false, path: "/Acesso", nome: "Acessos" }}
                dominios={{ ativo: true, path: "/Dominio", nome: "Domínios" }}
                mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
                modo={modoSidebar}
                setModo={setModoSidebar}
            />


            <p className="saudacao">Olá, Gestor!</p>
            <p className="texto_monitoramento">
                Este é o seu hub para o acompanhamento diário. Veja instantaneamente quem está focado e quanto tempo está sendo dedicado a tarefas. Tenha a clareza necessária para orientar a equipe de desenvolvimento e impulsionar resultados.
            </p>
            <h1 className="titulo">Monitoramento da:</h1>
            <p className="subtitulo">Equipe de Desenvolvimento</p>

            <div className="tabela">
                <div className="cabecalho">
                    <span>Funcionário</span>
                    <span>Tempo inativo</span>
                    <span>Tempo ativo</span>
                </div>

                {funcionarios.map((f, index) => (
                    <div className="linha" key={index}>
                        <span className="coluna">{f.nome}</span>
                        <span className="coluna">{f.tempoInativo}</span>
                        <span className="coluna">{f.tempoAtivo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TelaGestor;