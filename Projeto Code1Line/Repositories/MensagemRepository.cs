using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Repositories;

public class MensagemRepository : IMensagemRepository
{
    private readonly AppDbContext _context;

    public MensagemRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Mensagem>> GetConversationAsync(int userAId, int userBId)
    {
        return await _context.Mensagens
            .Where(m => (m.RemetenteId == userAId && m.DestinatarioId == userBId) ||
                        (m.RemetenteId == userBId && m.DestinatarioId == userAId))
            .OrderByDescending(m => m.EnviadaEm)
            .ToListAsync();
    }

    public async Task<Mensagem?> GetByIdAsync(int id) =>
        await _context.Mensagens.FindAsync(id);

    public async Task AddAsync(Mensagem mensagem)
    {
        _context.Mensagens.Add(mensagem);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var msg = await _context.Mensagens.FindAsync(id);
        if (msg != null)
        {
            _context.Mensagens.Remove(msg);
            await _context.SaveChangesAsync();
        }
    }
}
