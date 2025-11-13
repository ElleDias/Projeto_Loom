using Code1Line.Domain;

namespace Projeto_Code1Line.Domain
{
    public class Tarefas
    {
        public int Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public string? NomeTarefa { get; set; }

        public int FuncionarioId { get; set; }

        public Funcionario? Funcionario { get; set; }



    }
}