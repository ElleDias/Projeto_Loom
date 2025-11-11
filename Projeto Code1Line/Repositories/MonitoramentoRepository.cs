using Microsoft.EntityFrameworkCore;
using Code1Line.Domain;
using Code1Line.Data;
using Code1Line.Interfaces;

namespace Projeto_Code1Line.Repositories;

public class MonitoramentoRepository : IMonitoramentoRepository
{
    private readonly AppDbContext _context;

    public MonitoramentoRepository(AppDbContext context)
    {
        _context = context;
    }

    // ? GET ALL COM FILTROS
    public async Task<IEnumerable<Monitoramento>> GetAllAsync(
        int? funcionarioId = null, DateTime? from = null, DateTime? to = null)
    {
        var query = _context.Monitoramentos
            .Include(m => m.Funcionario)
            .AsQueryable();

        if (funcionarioId.HasValue)
            query = query.Where(m => m.FuncionarioId == funcionarioId.Value);

        if (from.HasValue)
            query = query.Where(m => m.DataInicio >= from.Value);

        if (to.HasValue)
            query = query.Where(m =>
                m.DataFim != null && m.DataFim <= to.Value);

        return await query.ToListAsync();
    }

    // ? GET BY ID
    public async Task<Monitoramento?> GetByIdAsync(int id)
    {
        return await _context.Monitoramentos
            .Include(m => m.Funcionario)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    // ? GET ATIVO = DataFim == null
    public async Task<Monitoramento?> GetAtivoAsync(int funcionarioId, string aplicativo)
    {
        return await _context.Monitoramentos
            .Include(m => m.Funcionario)
            .FirstOrDefaultAsync(m =>
                m.FuncionarioId == funcionarioId &&
                m.Aplicativo == aplicativo &&
                m.DataFim == null);
    }

    // ? ADD
    public async Task AddAsync(Monitoramento monitoramento)
    {
        _context.Monitoramentos.Add(monitoramento);
        await _context.SaveChangesAsync();
    }

    // ? UPDATE
    public async Task UpdateAsync(Monitoramento monitoramento)
    {
        _context.Monitoramentos.Update(monitoramento);
        await _context.SaveChangesAsync();
    }

    // ? DELETE
    public async Task DeleteAsync(int id)
    {
        var m = await _context.Monitoramentos.FindAsync(id);
        if (m != null)
        {
            _context.Monitoramentos.Remove(m);
            await _context.SaveChangesAsync();
        }
    }
}
