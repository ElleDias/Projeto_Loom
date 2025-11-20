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

    // 🔥 Criar mensagem
    public async Task<Mensagem> AddAsync(Mensagem msg)
    {
        msg.EnviadaEm = DateTime.UtcNow;
        _context.Mensagens.Add(msg);
        await _context.SaveChangesAsync();
        return msg;
    }

    // 🔥 Criar chat entre dois usuários
    public async Task<Chat> CreateChatAsync(Guid userAId, Guid userBId)
    {
        var chat = new Chat
        {
            Usuario1Id = userAId,
            Usuario2Id = userBId,
            AtualizadoEm = DateTime.UtcNow
        };

        _context.Chats.Add(chat);
        await _context.SaveChangesAsync();
        return chat;
    }
    // 🔥 Apagar mensagem
    public async Task DeleteAsync(Guid id)
    {
        var mensagem = await _context.Mensagens.FindAsync(id);
        if (mensagem != null)
        {
            _context.Mensagens.Remove(mensagem);
            await _context.SaveChangesAsync();
        }
    }

    // 🔥 Buscar mensagem por Id
    public async Task<Mensagem?> GetByIdAsync(Guid id)
    {
        return await _context.Mensagens.FindAsync(id);
    }

    // 🔥 Buscar chat entre dois usuários
    public async Task<Chat?> GetChatByUsersAsync(Guid userAId, Guid userBId)
    {
        return await _context.Chats
            .FirstOrDefaultAsync(c =>
                (c.Usuario1Id == userAId && c.Usuario2Id == userBId) ||
                (c.Usuario1Id == userBId && c.Usuario2Id == userAId));
    }

    // 🔥 Buscar mensagens de um chat
    public async Task<List<Mensagem>> GetChatMessagesAsync(Guid chatId)
    {
        return await _context.Mensagens
            .Where(m => m.ChatId == chatId)
            .OrderBy(m => m.EnviadaEm)
            .ToListAsync();
    }

    // 🔥 Buscar conversa entre dois usuários
    public async Task<List<Mensagem>> GetConversationAsync(Guid userAId, Guid userBId)
    {
        return await _context.Mensagens
            .Where(m => (m.RemetenteId == userAId && m.DestinatarioId == userBId) ||
                        (m.RemetenteId == userBId && m.DestinatarioId == userAId))
            .OrderBy(m => m.EnviadaEm)
            .ToListAsync();
    }

    // 🔥 Buscar mensagens de um chat (versão simplificada)
    public async Task<List<Mensagem>> GetMessagesByChatIdAsync(Guid chatId)
    {
        return await _context.Mensagens
            .Where(m => m.ChatId == chatId)
            .OrderBy(m => m.EnviadaEm)
            .ToListAsync();
    }

    // 🔥 Buscar mensagens por usuário
    public async Task<List<Mensagem>> GetMessagesByUserAsync(Guid userId)
    {
        return await _context.Mensagens
            .Where(m => m.RemetenteId == userId || m.DestinatarioId == userId)
            .ToListAsync();
    }

    // 🔥 Atualizar chat
    public async Task UpdateChatAsync(Chat chat)
    {
        _context.Chats.Update(chat);
        await _context.SaveChangesAsync();
    }
}
