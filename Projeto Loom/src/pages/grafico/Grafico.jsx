import "./Grafico.css";
import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MenuLateral } from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Graficos = () => {
    const [modoSidebar, setModoSidebar] = useState("close");
    const [departamento, setDepartamento] = useState("todos"); // 🔹 Filtro

    const navigate = useNavigate();

    const dataPie = [
        { name: "Concluídas", value: 50 },
        { name: "Pendentes", value: 20 },
        { name: "Em andamento", value: 30 },
    ];

    const COLORS = ["#0A423D", "#2E6962", "#58A69A"];

    // 🔹 Exemplo com departamentos
    const dataBar = [
        { name: "Brenda", concluidas: 5, pendentes: 2, andamento: 2, departamento: "Dev" },
        { name: "Caio", concluidas: 6, pendentes: 2, andamento: 1, departamento: "Multimídia" },
        { name: "Lucas", concluidas: 5, pendentes: 3, andamento: 1, departamento: "Jogos" },
        { name: "Laura", concluidas: 7, pendentes: 1, andamento: 1, departamento: "Dev" },
        { name: "Yasmin", concluidas: 4, pendentes: 3, andamento: 2, departamento: "Multimídia" },
        { name: "Danielle", concluidas: 5, pendentes: 2, andamento: 2, departamento: "Jogos" },
    ];

    // 🔹 Filtro por departamento
    const dataFiltrada = departamento === "todos"
        ? dataBar
        : dataBar.filter(item => item.departamento === departamento);

    return (
        <div className={`monitoramento-container sidebar-${modoSidebar}`}>
            <MenuLateral
                perfil={true}
                geral="Geral"
                gestores={true}
                funcionarios={true}
                mensagens={true}
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

                        {/* LEGENDA */}
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
                                <option value="Dev">Dev</option>
                                <option value="Multimídia">Multimídia</option>
                                <option value="Jogos">Jogos</option>
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                layout="vertical"
                                data={dataFiltrada}
                                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
                            >
                                <XAxis
                                    type="number"
                                    tick={{ fill: "#000", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 9]}
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fill: "#000", fontWeight: "bold", fontSize: 14 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={80}
                                />
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
