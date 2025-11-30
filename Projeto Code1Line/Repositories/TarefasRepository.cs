using Code1Line.Data;
using Microsoft.EntityFrameworkCore;
using Projeto_Code1Line.Domain;
using Projeto_Code1Line.Domain.Interfaces;

namespace Projeto_Code1Line.Infrastructure.Repositories
{
    public class TarefasRepository : ITarefasRepository
    {
        private readonly AppDbContext _context;

        public TarefasRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tarefas>> ListarTarefasAsync()
        {
            return await _context.Tarefas
                .Include(t => t.Funcionario)
                .ToListAsync();
        }

        public async Task<IEnumerable<Tarefas>> ListarPorFuncionarioAsync(int funcionarioId)
        {
            return await _context.Tarefas
                .Where(t => t.FuncionarioId == funcionarioId)
                .Include(t => t.Funcionario)
                .ToListAsync(); // List<T> é compatível com IEnumerable<T>
        }



        public async Task<Tarefas?> BuscarPorIdAsync(int id)
        {
            return await _context.Tarefas
                .Include(t => t.Funcionario)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AdicionarAsync(Tarefas tarefa)
        {
            await _context.Tarefas.AddAsync(tarefa);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Tarefas tarefa)
        {
            _context.Tarefas.Update(tarefa);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverAsync(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);

            if (tarefa != null)
            {
                _context.Tarefas.Remove(tarefa);
                await _context.SaveChangesAsync();
            }
        }
    }
}
