import { useState, useEffect } from "react";
import "./TelaGestor.css";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import api from "../../Services/services";

const TelaGestor = () => {
    const [modoSidebar, setModoSidebar] = useState("close");
    const [funcionarios, setFuncionarios] = useState([]);

    // ✅ Função para converter minutos em formato bonito
    const formatarTempo = (minutos) => {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;

        if (horas === 0) return `${mins} minutos`;
        return `${horas} horas e ${mins} minutos`;
    };

    // ✅ Buscar Monitoramentos da API
    const buscarMonitoramentos = async () => {
        try {
            const resposta = await api.get("https://localhost:7283/api/Monitoramentos");

            const dados = resposta.data;

            // ✅ Tratamento dos dados vindos da API
            const listaTratada = dados.map(item => {
                return {
                    nome: item.funcionario?.nome || "Desconhecido",
                    tempoAtivo: formatarTempo(item.tempoEmUsoMinutos),
                    tempoInativo:
                        item.dataFim
                            ? formatarTempo(Math.floor((new Date() - new Date(item.dataFim)) / 60000))
                            : "Em atividade"
                };
            });

            setFuncionarios(listaTratada);

        } catch (erro) {
            console.error("Erro ao buscar monitoramentos:", erro);
        }
    };

    // ✅ Carregar ao montar a tela
    useEffect(() => {
        buscarMonitoramentos();
    }, []);

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
                Este é o seu hub para o acompanhamento diário. Veja instantaneamente quem está focado e quanto tempo está sendo dedicado a tarefas.
            </p>

            <h1 className="titulo">Monitoramento da:</h1>
            <p className="subtitulo">Equipe de Desenvolvimento</p>

            <div className="tabela">
                <div className="cabecalho">
                    <span>Funcionário</span>
                    <span>Tempo inativo</span>
                    <span>Tempo ativo</span>
                </div>

                {funcionarios.length === 0 ? (
                    <div className="linha">
                        <span className="coluna">Carregando...</span>
                    </div>
                ) : (
                    funcionarios.map((f, index) => (
                        <div className="linha" key={index}>
                            <span className="coluna">{f.nome}</span>
                            <span className="coluna">{f.tempoInativo}</span>
                            <span className="coluna">{f.tempoAtivo}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TelaGestor;
