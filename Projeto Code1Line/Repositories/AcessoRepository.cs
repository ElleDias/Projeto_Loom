using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Code1Line.Repository
{
    public class AcessoRepository : IAcessoRepository
    {
        private readonly AppDbContext _context;

        public AcessoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AcessoDTO>> ListarAcessosAsync()
        {
            return await _context.Acessos
                .Select(a => new AcessoDTO
                {
                    Id = a.Id,
                    Funcionario = a.Funcionario,
                    AcessoAtual = a.AcessoAtual,
                    TempoAtivo = a.TempoAtivo
                })
                .ToListAsync();
        }

        public async Task<AcessoDTO> CriarAcessoAsync(Acesso data)
        {
            _context.Acessos.Add(data);
            await _context.SaveChangesAsync();

            return new AcessoDTO
            {
                Id = data.Id,
                Funcionario = data.Funcionario,
                AcessoAtual = data.AcessoAtual,
                TempoAtivo = data.TempoAtivo
            };
        }

        public async Task<bool> DeletarAcessoAsync(Guid id)
        {
            var acesso = await _context.Acessos.FindAsync(id);
            if (acesso == null) return false;

            _context.Acessos.Remove(acesso);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
