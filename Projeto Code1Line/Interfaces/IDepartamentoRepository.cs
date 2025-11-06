using Code1Line.Domain;

namespace Code1Line.Interfaces;

public interface IDepartamentoRepository
{
    Task<IEnumerable<Departamento>> GetAllAsync();
    Task<Departamento?> GetByIdAsync(int id);
    Task AddAsync(Departamento departamento);
    Task UpdateAsync(Departamento departamento);
    Task DeleteAsync(int id);
}
