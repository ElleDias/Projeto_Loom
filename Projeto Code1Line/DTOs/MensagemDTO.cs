namespace Projeto_Code1Line.DTOs
{
    public class MensagemDTO
    {
        public int? Id { get; set; }
        public int DestinatarioId { get; set; }
        public string Conteudo { get; set; } = string.Empty;
        public string? NomeRemetente { get; set; }
        public DateTime? DataEnvio { get; set; }
    }

}
