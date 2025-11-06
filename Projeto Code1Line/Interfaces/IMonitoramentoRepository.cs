using Code1Line.Domain;


namespace Code1Line.Interfaces;


public interface IMonitoramentoRepository
{
    Task<IEnumerable<Monitoramento>> GetAllAsync(int? funcionarioId = null, DateTime? from = null, DateTime? to = null);
    Task<Monitoramento?> GetByIdAsync(int id);
    Task<Monitoramento?> GetAtivoAsync(int funcionarioId, string aplicativo);
    Task AddAsync(Monitoramento monitoramento);
    Task UpdateAsync(Monitoramento monitoramento);
    Task DeleteAsync(int id);
}
