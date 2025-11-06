using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Repositories;

public class AtividadeRepository : IAtividadeRepository
{
    private readonly AppDbContext _context;

    public AtividadeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Atividade>> GetAllAsync() =>
        await _context.Atividades.Include(a => a.Funcionario).ToListAsync();

    public async Task<Atividade?> GetByIdAsync(int id) =>
        await _context.Atividades.Include(a => a.Funcionario).FirstOrDefaultAsync(a => a.Id == id);

    public async Task AddAsync(Atividade atividade)
    {
        _context.Atividades.Add(atividade);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Atividade atividade)
    {
        _context.Atividades.Update(atividade);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var a = await _context.Atividades.FindAsync(id);
        if (a != null)
        {
            _context.Atividades.Remove(a);
            await _context.SaveChangesAsync();
        }
    }
}
