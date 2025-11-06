namespace Code1Line.Domain;

public class Departamento
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public ICollection<Funcionario>? Funcionarios { get; set; }
}
