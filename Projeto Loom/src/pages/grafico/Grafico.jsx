import "./Grafico.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Graficos = () => {
    const [modoSidebar, setModoSidebar] = useState("close");
    const [departamento, setDepartamento] = useState("todos");
    const [funcionarios, setFuncionarios] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const navigate = useNavigate();

    const COLORS = ["#0A423D", "#2E6962", "#58A69A"];

    // ===============================
    // 🔥 CARREGAR DADOS DA API
    // ===============================
    useEffect(() => {
        carregarFuncionarios();
        carregarDepartamentos();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const token = secureLocalStorage.getItem("token");

            const response = await axios.get("https://localhost:7283/api/Funcionario", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 🔥 MOCK de tarefas (já que não existe na API)
            const funcionariosComTarefas = response.data.map(f => ({
                name: f.nome,
                concluidas: Math.floor(Math.random() * 6) + 2,
                pendentes: Math.floor(Math.random() * 3),
                andamento: Math.floor(Math.random() * 2),
                departamento: f.departamentoId
            }));

            setFuncionarios(funcionariosComTarefas);
        } catch (error) {
            console.error("❌ Erro ao carregar funcionários", error);
        }
    };

    const carregarDepartamentos = async () => {
        try {
            const token = secureLocalStorage.getItem("token");

            const response = await axios.get("https://localhost:7283/api/Departamento", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDepartamentos(response.data);
        } catch (error) {
            console.error("❌ Erro ao carregar departamentos", error);
        }
    };

    // ===============================
    // 🔍 FILTRO POR DEPARTAMENTO
    // ===============================
    const dataFiltrada = departamento === "todos"
        ? funcionarios
        : funcionarios.filter(f => f.departamento == departamento);

    // ===============================
    // 🔵 DADOS DO GRÁFICO DE PIZZA
    // ===============================
    const totalConcluidas = funcionarios.reduce((acc, f) => acc + f.concluidas, 0);
    const totalPendentes = funcionarios.reduce((acc, f) => acc + f.pendentes, 0);
    const totalAndamento = funcionarios.reduce((acc, f) => acc + f.andamento, 0);

    const dataPie = [
        { name: "Concluídas", value: totalConcluidas },
        { name: "Pendentes", value: totalPendentes },
        { name: "Em andamento", value: totalAndamento },
    ];

    return (
        <div className={`monitoramento-container sidebar-${modoSidebar}`}>
            <MenuLateral
                perfil={{ ativo: true, path: "/perfil", nome: "Perfil" }}
                geral="Geral"
                gestores={true}
                funcionarios={true}
                mensagens={{ ativo: true, path: "/mensagem", nome: "Mensagens" }}
                modo={modoSidebar}
                setModo={setModoSidebar}
            />

            <div className="painel">
                <div className="graficos">
                    {/* === GRÁFICO DE PIZZA === */}
                    <div className="grafico-pizza">
                        <h2 className="titulo-grafico">
                            ÍNDICE DE TAREFAS<br />
                            <span className="subtitulo-grafico">Equipe 10</span>
                        </h2>

                        <div className="grafico-pizza-wrapper">
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={dataPie}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#fff"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fontWeight="bold"
                                                fontSize={14}
                                            >
                                                {(percent * 100).toFixed(0)}%
                                            </text>
                                        );
                                    }}
                                >
                                    {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>

                        <div className="legenda">
                            <div className="item-legenda">
                                <span className="quadrado cor-concluidas"></span> Concluídas
                            </div>
                            <div className="item-legenda">
                                <span className="quadrado cor-pendentes"></span> Pendentes
                            </div>
                            <div className="item-legenda">
                                <span className="quadrado cor-emandamento"></span> Em andamento
                            </div>
                        </div>
                    </div>

                    {/* === GRÁFICO DE BARRAS === */}
                    <div className="grafico-barras">
                        <h2 className="titulo-grafico">ÍNDICE DOS FUNCIONÁRIOS</h2>

                        {/* 🔹 FILTRO POR DEPARTAMENTO */}
                        <div className="filtro-departamento">
                            <label htmlFor="departamento">Departamento:</label>
                            <select
                                id="departamento"
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                            >
                                <option value="todos">Todos</option>
                                {departamentos.map(dep => (
                                    <option key={dep.id} value={dep.id}>
                                        {dep.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                layout="vertical"
                                data={dataFiltrada}
                                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
                            >
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip />
                                <Bar dataKey="concluidas" stackId="a" fill={COLORS[0]} />
                                <Bar dataKey="pendentes" stackId="a" fill={COLORS[2]} />
                                <Bar dataKey="andamento" stackId="a" fill={COLORS[1]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <button className="botao-gerais" onClick={() => navigate("/TelaDoGerente")}>
                    Gráficos Gerais
                </button>
            </div>
        </div>
    );
};

export default Graficos;
