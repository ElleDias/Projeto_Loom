using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Repositories;

public class FuncionarioRepository : IFuncionarioRepository
{
    private readonly AppDbContext _context;

    public FuncionarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Funcionario>> GetAllAsync() =>
        await _context.Funcionarios.Include(f => f.Departamento).ToListAsync();

    public async Task<Funcionario?> GetByIdAsync(int id) =>
        await _context.Funcionarios.Include(f => f.Departamento).FirstOrDefaultAsync(f => f.Id == id);

    public async Task AddAsync(Funcionario funcionario)
    {
        _context.Funcionarios.Add(funcionario);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Funcionario funcionario)
    {
        _context.Funcionarios.Update(funcionario);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var f = await _context.Funcionarios.FindAsync(id);
        if (f != null)
        {
            _context.Funcionarios.Remove(f);
            await _context.SaveChangesAsync();
        }
    }
}
