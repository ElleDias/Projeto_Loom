using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Repositories;

public class DepartamentoRepository : IDepartamentoRepository
{
    private readonly AppDbContext _context;

    public DepartamentoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Departamento>> GetAllAsync() =>
        await _context.Departamentos.Include(d => d.Funcionarios).ToListAsync();

    public async Task<Departamento?> GetByIdAsync(int id) =>
        await _context.Departamentos.Include(d => d.Funcionarios).FirstOrDefaultAsync(d => d.Id == id);

    public async Task AddAsync(Departamento departamento)
    {
        _context.Departamentos.Add(departamento);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Departamento departamento)
    {
        _context.Departamentos.Update(departamento);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var d = await _context.Departamentos.FindAsync(id);
        if (d != null)
        {
            _context.Departamentos.Remove(d);
            await _context.SaveChangesAsync();
        }
    }
}
