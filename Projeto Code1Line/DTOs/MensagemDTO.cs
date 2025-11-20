namespace Projeto_Code1Line.DTOs
{

    public class MensagemDTO
    {
        public Guid Id { get; set; }
        public Guid RemetenteId { get; set; }
        public Guid DestinatarioId { get; set; }
        public string Conteudo { get; set; } = string.Empty;
        public DateTime EnviadaEm { get; set; }
    }
}
