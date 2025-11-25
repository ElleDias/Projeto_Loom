using System.ComponentModel.DataAnnotations;

namespace Code1Line.Domain
{
    public class Acesso
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Funcionario { get; set; } = string.Empty;
        public string AcessoAtual { get; set; } = string.Empty;
        public string TempoAtivo { get; set; } = string.Empty;

        public DateTime RegistradoEm { get; set; } = DateTime.UtcNow;
    }
}
