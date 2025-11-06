namespace Code1Line.Domain;

public class Atividade
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataInicio { get; set; } = DateTime.UtcNow;
    public DateTime? DataFim { get; set; }
    public int FuncionarioId { get; set; }
    public Funcionario? Funcionario { get; set; }
    public string Status { get; set; } = "Pendente";
}
