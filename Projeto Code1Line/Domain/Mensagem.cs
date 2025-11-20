using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Mensagem
{
    [Key]
    public Guid Id { get; set; }

    public Guid ChatId { get; set; }

    [JsonIgnore] // Evita loop no JSON
    [ForeignKey("ChatId")]
    public Chat? Chat { get; set; }

    public Guid RemetenteId { get; set; }
    public Guid DestinatarioId { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string Conteudo { get; set; } = string.Empty;

    public DateTime EnviadaEm { get; set; }
}

