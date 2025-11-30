using Code1Line.Domain;

namespace Code1Line.Interfaces
{
    public interface IFuncionarioRepository
    {
        // Cadastrar um novo funcionário
        Task CadastrarAsync(Funcionario funcionario);

        // Listar todos os funcionários
        Task<List<Funcionario>> ListarAsync();

        // Buscar funcionário pelo ID
        Task<Funcionario?> BuscarPorIdAsync(int id);

        // Atualizar funcionário
        Task AtualizarAsync(Funcionario funcionario);

        // Deletar funcionário
        Task DeletarAsync(int id);
        Task<Funcionario?> BuscarPorUserIdAsync(Guid userId);



    }
}
