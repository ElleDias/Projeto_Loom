using Code1Line.Domain;

namespace Code1Line.Interfaces;

public interface IAtividadeRepository
{
    Task<IEnumerable<Atividade>> GetAllAsync();
    Task<Atividade?> GetByIdAsync(int id);
    Task AddAsync(Atividade atividade);
    Task UpdateAsync(Atividade atividade);
    Task DeleteAsync(int id);
}
