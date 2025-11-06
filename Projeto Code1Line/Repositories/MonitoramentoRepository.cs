using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Repositories;

public class MonitoramentoRepository : IMonitoramentoRepository
{
    private readonly AppDbContext _context;

    public MonitoramentoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Monitoramento>> GetAllAsync() =>
        await _context.Monitoramentos.Include(m => m.Funcionario).ToListAsync();

    public async Task<Monitoramento?> GetByIdAsync(int id) =>
        await _context.Monitoramentos.Include(m => m.Funcionario).FirstOrDefaultAsync(m => m.Id == id);

    public async Task AddAsync(Monitoramento monitoramento)
    {
        _context.Monitoramentos.Add(monitoramento);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Monitoramento monitoramento)
    {
        _context.Monitoramentos.Update(monitoramento);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var m = await _context.Monitoramentos.FindAsync(id);
        if (m != null)
        {
            _context.Monitoramentos.Remove(m);
            await _context.SaveChangesAsync();
        }
    }

    public Task<IEnumerable<Monitoramento>> GetAllAsync(int? funcionarioId = null, DateTime? from = null, DateTime? to = null)
    {
        throw new NotImplementedException();
    }

    public Task<Monitoramento?> GetAtivoAsync(int funcionarioId, string aplicativo)
    {
        throw new NotImplementedException();
    }
}
