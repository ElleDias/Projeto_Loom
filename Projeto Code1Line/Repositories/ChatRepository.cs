using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;
using Projeto_Code1Line.Interfaces;

namespace Code1Line.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly AppDbContext _ctx;

        public ChatRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        // 🔹 Buscar chat entre dois usuários
        public async Task<Chat?> GetChatAsync(Guid userAId, Guid userBId)
        {
            return await _ctx.Chats
                .Include(c => c.UltimaMensagem)
                .FirstOrDefaultAsync(c =>
                    (c.Usuario1Id == userAId && c.Usuario2Id == userBId) ||
                    (c.Usuario1Id == userBId && c.Usuario2Id == userAId)
                );
        }

        // 🔹 Buscar todos os chats de um usuário
        public async Task<List<Chat>> GetUserChatsAsync(Guid userId)
        {
            return await _ctx.Chats
                .Include(c => c.UltimaMensagem)
                .Where(c => c.Usuario1Id == userId || c.Usuario2Id == userId)
                .OrderByDescending(c => c.AtualizadoEm)
                .ToListAsync();
        }

        // 🔹 Criar novo chat
        public async Task<Chat> CreateChatAsync(Guid userAId, Guid userBId)
        {
            var chat = new Chat
            {
                Usuario1Id = userAId,
                Usuario2Id = userBId,
                AtualizadoEm = DateTime.UtcNow
            };

            _ctx.Chats.Add(chat);
            await _ctx.SaveChangesAsync();
            return chat;
        }

        // 🔹 Atualizar chat
        public async Task UpdateAsync(Chat chat)
        {
            _ctx.Chats.Update(chat);
            await _ctx.SaveChangesAsync();
        }
        public async Task<IEnumerable<Mensagem>> GetMessagesByChatIdAsync(Guid chatId)
        {
            return await _ctx.Mensagens
                .Where(m => m.ChatId == chatId)
                .OrderBy(m => m.EnviadaEm)
                .ToListAsync();
        }

    }
}
