using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;
using Microsoft.EntityFrameworkCore;
using Projeto_Code1Line.Domain;

namespace Code1Line.Repositories
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly AppDbContext _context;

        public FuncionarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Funcionario>> ListarAsync()
        {
            return await _context.Funcionarios.ToListAsync();
        }

        public async Task<Funcionario?> BuscarPorIdAsync(int id)
        {
            return await _context.Funcionarios.FindAsync(id);
        }

        public async Task<Funcionario?> BuscarPorUserIdAsync(Guid userId)
        {
            return await _context.Funcionarios
                .Include(f => f.Usuario)
                .FirstOrDefaultAsync(f => f.UsuarioId == userId);
        }

        public async Task CadastrarAsync(Funcionario funcionario)
        {
            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Funcionario funcionario)
        {
            _context.Funcionarios.Update(funcionario);
            await _context.SaveChangesAsync();
        }

        public async Task DeletarAsync(int id)
        {
            var funcionario = await BuscarPorIdAsync(id);
            if (funcionario != null)
            {
                _context.Funcionarios.Remove(funcionario);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Tarefas>> ListarPorFuncionarioAsync(int funcionarioId)
        {
            return await _context.Tarefas
                .Where(t => t.FuncionarioId == funcionarioId)
                .ToListAsync();
        }
    }
}
