using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Chat
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid Usuario1Id { get; set; }
    public Guid Usuario2Id { get; set; }

    public DateTime AtualizadoEm { get; set; } = DateTime.UtcNow;

    [JsonIgnore] // Evita loop
    public virtual ICollection<Mensagem> Mensagens { get; set; } = new List<Mensagem>();

    public Guid? UltimaMensagemId { get; set; }

    public Mensagem? UltimaMensagem { get; set; }
}