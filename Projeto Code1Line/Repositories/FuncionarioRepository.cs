using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Code1Line.Repository
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly AppDbContext _context;

        public FuncionarioRepository(AppDbContext context)
        {
            _context = context;
        }

        // CADASTRAR
        public async Task CadastrarAsync(Funcionario funcionario)
        {
            await _context.Funcionarios.AddAsync(funcionario);
            await _context.SaveChangesAsync();
        }

        // LISTAR TODOS
        public async Task<List<Funcionario>> ListarAsync()
        {
            return await _context.Funcionarios
                .AsNoTracking()
                .ToListAsync();
        }

        // BUSCAR POR ID
        public async Task<Funcionario?> BuscarPorIdAsync(int id)
        {
            return await _context.Funcionarios
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        // BUSCAR PELO USERID (GUID DO USUÁRIO RELACIONADO)
        public async Task<Funcionario?> BuscarPorUserIdAsync(Guid userId)
        {
            return await _context.Funcionarios
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.UsuarioId == userId);
        }

        // ATUALIZAR
        public async Task AtualizarAsync(Funcionario funcionario)
        {
            _context.Funcionarios.Update(funcionario);
            await _context.SaveChangesAsync();
        }

        // DELETAR
        public async Task DeletarAsync(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);

            if (funcionario != null)
            {
                _context.Funcionarios.Remove(funcionario);
                await _context.SaveChangesAsync();
            }
        }
    }
}
