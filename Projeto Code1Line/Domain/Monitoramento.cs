namespace Code1Line.Domain;

public class Monitoramento
{
    public int Id { get; set; }

    public int FuncionarioId { get; set; }
    public Funcionario? Funcionario { get; set; }

    // Quando começou o uso
    public DateTime DataInicio { get; set; } = DateTime.UtcNow;

    // Quando terminou (pode ser null se ainda está ativo)
    public DateTime? DataFim { get; set; }

    // Nome do aplicativo ou processo monitorado
    public string Aplicativo { get; set; } = string.Empty;

    // Total de minutos calculado (preenchido quando DataFim é registrado)
    public int TempoEmUsoMinutos { get; set; }
}
