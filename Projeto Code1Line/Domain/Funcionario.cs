using System.Text.Json.Serialization;

namespace Code1Line.Domain
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;

        public int DepartamentoId { get; set; }
        public Departamento? Departamento { get; set; }

        // ?? CHAVE ESTRANGEIRA OBRIGATÓRIA
        public Guid UsuarioId { get; set; }

        [JsonIgnore]
        public Usuario? Usuario { get; set; }

    }
}
