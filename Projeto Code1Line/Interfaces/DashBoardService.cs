using Code1Line.Domain;

namespace Projeto_Code1Line.Interfaces
{
    public class DashBoardService
    {
        Task<IEnumerable<Atividade>> GetAllAsync();
        Task<Atividade?> GetByIdAsync(int id);
        Task AddAsync(Atividade atividade);
        Task UpdateAsync(Atividade atividade);
        Task DeleteAsync(int id);
    }
}
