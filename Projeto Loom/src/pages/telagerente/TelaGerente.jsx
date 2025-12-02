import "./TelaGerente.css";
import { useState } from "react";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const TelaGerente = () => {
  const [modoSidebar, setModoSidebar] = useState("open");
  const navigate = useNavigate();

  // ================================
  //     DADOS ANO (JAN — DEZ)
  // ================================
  const dadosAno = [
    { nome: "Jan", total: 320 },
    { nome: "Fev", total: 280 },
    { nome: "Mar", total: 340 },
    { nome: "Abr", total: 300 },
    { nome: "Mai", total: 360 },
    { nome: "Jun", total: 390 },
    { nome: "Jul", total: 420 },
    { nome: "Ago", total: 380 },
    { nome: "Set", total: 350 },
    { nome: "Out", total: 400 },
    { nome: "Nov", total: 370 },
    { nome: "Dez", total: 140 }, // Dezembro reduzido (01/12)
  ];

  // ================================
  //   DADOS DIÁRIOS MOCKADOS
  // ================================
const dadosMensais = {
  Jan: [
    { dia: "01", pendentes: 4, concluidas: 8, total: 12 },
    { dia: "02", pendentes: 5, concluidas: 9, total: 14 },
    { dia: "03", pendentes: 3, concluidas: 7, total: 10 },
    { dia: "04", pendentes: 6, concluidas: 12, total: 18 },
  ],

  Fev: [
    { dia: "01", pendentes: 6, concluidas: 7, total: 13 },
    { dia: "02", pendentes: 4, concluidas: 10, total: 14 },
    { dia: "03", pendentes: 3, concluidas: 12, total: 15 },
  ],

  Mar: [
    { dia: "01", pendentes: 8, concluidas: 6, total: 14 },
    { dia: "02", pendentes: 7, concluidas: 11, total: 18 },
    { dia: "03", pendentes: 4, concluidas: 13, total: 17 },
  ],

  Abr: [
    { dia: "01", pendentes: 3, concluidas: 10, total: 13 },
    { dia: "02", pendentes: 5, concluidas: 12, total: 17 },
    { dia: "03", pendentes: 2, concluidas: 9, total: 11 },
  ],

  Mai: [
    { dia: "01", pendentes: 4, concluidas: 11, total: 15 },
    { dia: "02", pendentes: 3, concluidas: 14, total: 17 },
    { dia: "03", pendentes: 6, concluidas: 10, total: 16 },
  ],

  Jun: [
    { dia: "01", pendentes: 7, concluidas: 9, total: 16 },
    { dia: "02", pendentes: 5, concluidas: 11, total: 16 },
    { dia: "03", pendentes: 4, concluidas: 12, total: 16 },
  ],

  Jul: [
    { dia: "01", pendentes: 6, concluidas: 10, total: 16 },
    { dia: "02", pendentes: 4, concluidas: 13, total: 17 },
    { dia: "03", pendentes: 3, concluidas: 15, total: 18 },
  ],

  Ago: [
    { dia: "01", pendentes: 5, concluidas: 12, total: 17 },
    { dia: "02", pendentes: 3, concluidas: 14, total: 17 },
    { dia: "03", pendentes: 6, concluidas: 11, total: 17 },
  ],

  Set: [
    { dia: "01", pendentes: 8, concluidas: 10, total: 18 },
    { dia: "02", pendentes: 5, concluidas: 13, total: 18 },
    { dia: "03", pendentes: 7, concluidas: 12, total: 19 },
  ],

  Out: [
    { dia: "01", pendentes: 4, concluidas: 9, total: 13 },
    { dia: "02", pendentes: 6, concluidas: 14, total: 20 },
    { dia: "03", pendentes: 3, concluidas: 16, total: 19 },
  ],

  Nov: [
    { dia: "01", pendentes: 7, concluidas: 11, total: 18 },
    { dia: "02", pendentes: 5, concluidas: 13, total: 18 },
    { dia: "03", pendentes: 4, concluidas: 12, total: 16 },
  ],

  // 🔥 DEZEMBRO — POUCOS DADOS (HOJE É 01/12)
  Dez: [
    { dia: "01", pendentes: 2, concluidas: 3, total: 5 },
  ],
};


  // ================================
  // ESTADOS DO GRÁFICO
  // ================================
  const [visao, setVisao] = useState("ano");
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [dadosAtuais, setDadosAtuais] = useState(dadosAno);
  const [tituloGrafico, setTituloGrafico] = useState("Visão Anual de Tarefas");

  // CLICOU EM UM MÊS → ABRE DIAS
  const handleClickMes = (label) => {
    if (!dadosMensais[label]) return;

    setVisao("mes");
    setMesSelecionado(label);
    setDadosAtuais(dadosMensais[label]);
    setTituloGrafico(`Tarefas em ${label}`);
  };

  // VOLTAR PARA ANO
  const voltarAno = () => {
    setVisao("ano");
    setMesSelecionado(null);
    setDadosAtuais(dadosAno);
    setTituloGrafico("Visão Anual de Tarefas");
  };

  return (
    <div className="tela-gerente">
      
      {/* Sidebar */}
      <MenuLateral
        perfil={{ ativo: true, path: "/perfil", nome: "Perfil" }}
        geral={{ ativo: true, path: "/gerente", nome: "Geral" }}
        gestores={{ ativo: false, path: "/gestor", nome: "Gestores" }}
        funcionarios={{ ativo: false, path: "/funcionarios", nome: "Funcionários" }}
        mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
        voltarATela={{ ativo: true, nome: "Retornar" }}
        modo={modoSidebar}
        setModo={setModoSidebar}
      />

      <div className={`visao_gerente-container sidebar-${modoSidebar}`}>

        {/* Painel boas-vindas */}
        <div className="geral-retangulo painel moderno">
          <div className="geral-header">
            <h2>GERAL</h2>
            <h3 className="sub-header-elegante">Olá, gerente! Seja bem-vindo.</h3>
            <p className="sub-header-contexto">
              Aqui você encontrará uma visão completa da equipe.
            </p>
          </div>
        </div>

        {/* Botão gráficos detalhados */}
        <div className="tarefas-container moderno">
          <button
            className="botao_graficos"
            onClick={() => navigate("/Graficos")}
          >
            Gráficos Detalhados
          </button>
        </div>

        {/* ============================ GRÁFICO ============================ */}
        <div className="grafico-desempenho-container">
          <h2 className="titulo-grafico">{tituloGrafico}</h2>

          <div className="grafico-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dadosAtuais}
                onClick={(e) => {
                  if (visao === "ano" && e?.activeLabel) {
                    handleClickMes(e.activeLabel);
                  }
                }}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                <CartesianGrid stroke="rgba(89, 157, 148, 0.3)" strokeDasharray="3 3" />

                <XAxis dataKey={visao === "ano" ? "nome" : "dia"} />

                <YAxis />

                <Tooltip />
                <Legend />

                {/* Linha anual */}
                {visao === "ano" && (
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#599d94"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#599d94" }}
                  />
                )}

                {/* Linhas mês */}
                {visao === "mes" && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="pendentes"
                      stroke="#ff4444"
                      strokeWidth={3}
                      dot
                    />
                    <Line
                      type="monotone"
                      dataKey="concluidas"
                      stroke="#00c777"
                      strokeWidth={3}
                      dot
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#4444ff"
                      strokeWidth={3}
                      dot
                    />
                  </>
                )}

                <Brush dataKey={visao === "ano" ? "nome" : "dia"} height={25} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {visao === "mes" && (
            <div className="botoes-grafico">
              <button className="botao-tipo" onClick={voltarAno}>
                Voltar para visão anual
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelaGerente;
