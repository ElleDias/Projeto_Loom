namespace Projeto_Code1Line.DTOs
{
    public class ChatDTO
    {
        public Guid ChatId { get; set; }
        public string? UltimaMensagem { get; set; }
        public DateTime? EnviadaEm { get; set; }
        public Guid OutroUsuarioId { get; set; }
        public string OutroUsuarioNome { get; set; } = string.Empty;
    }
}
