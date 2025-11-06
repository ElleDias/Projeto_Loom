using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Code1Line.Domain;

[Table("Usuario")]
public class Usuario
{
    [Key]
    [Column("Id")]
    public Guid Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatorio")]

    [Column(TypeName = "nvarchar(255)")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo do email é obrigatorio")]

    [Column(TypeName = "nvarchar(255)")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo da senha é obrigatorio")]

    [Column(TypeName = "nvarchar(255)")]
    public string Senha { get; set; } = string.Empty;

    [Column("cargo")]
    public string Cargo { get; set; } = string.Empty;
}