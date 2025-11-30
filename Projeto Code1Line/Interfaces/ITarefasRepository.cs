using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projeto_Code1Line.Domain.Interfaces
{
    public interface ITarefasRepository
    {
        Task<IEnumerable<Tarefas>> ListarPorFuncionarioAsync(int funcionarioId);
        Task<IEnumerable<Tarefas>> ListarTarefasAsync();
        Task<Tarefas?> BuscarPorIdAsync(int id);
        Task AdicionarAsync(Tarefas tarefa);
        Task AtualizarAsync(Tarefas tarefa);
        Task RemoverAsync(int id);

    }
}
