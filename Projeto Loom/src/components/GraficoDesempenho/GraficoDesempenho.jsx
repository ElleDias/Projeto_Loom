import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import "./GraficoDesempenho.css";

const data = [
    { nome: "Jan", Valor: 65 },
    { nome: "Fev", Valor: 80 },
    { nome: "Mar", Valor: 45 },
    { nome: "Abr", Valor: 95 },
    { nome: "Mai", Valor: 70 },
    { nome: "Jun", Valor: 40 },
    { nome: "Jul", Valor: 50 },
    { nome: "Ago", Valor: 90 },
    { nome: "Set", Valor: 58 },
    { nome: "Out", Valor: 60 },
    { nome: "Nov", Valor: 80 },
    { nome: "Dez", Valor: 30 },
];

export const GraficoDesempenho = () => {
    return (
        <div className="grafico-container">
            <h3 className="titulo-grafico">Desempenho Anual</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="nome" tick={{ fill: "#555" }} />
                    <YAxis tick={{ fill: "#555" }} />
                    <Tooltip />
                    <Bar dataKey="Valor" fill="#093911ff" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
