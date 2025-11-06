namespace Projeto_Code1Line.DTOs
{
    public class MonitoramentoCreateDto
    {
        public int FuncionarioId { get; set; }
        public string Aplicativo { get; set; } = string.Empty;
        public string? IpOrigem { get; set; } // opcional
    }

    public class MonitoramentoEndDto
    {
        public int FuncionarioId { get; set; }
        public string Aplicativo { get; set; } = string.Empty;
    }

    public class MonitoramentoResponseDto
    {
        public int Id { get; set; }
        public int FuncionarioId { get; set; }
        public string NomeFuncionario { get; set; } = string.Empty;
        public string Aplicativo { get; set; } = string.Empty;
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int TempoEmUsoMinutos { get; set; }
    }
}
