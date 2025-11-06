namespace Code1Line.Domain;

public class Mensagem
{
    public int Id { get; set; }
    public int RemetenteId { get; set; }
    public int DestinatarioId { get; set; }
    public string Conteudo { get; set; } = string.Empty;    
    public DateTime EnviadaEm { get; set; } = DateTime.UtcNow;
}
