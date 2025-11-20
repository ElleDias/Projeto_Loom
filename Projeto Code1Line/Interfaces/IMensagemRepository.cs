using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Code1Line.Domain;

namespace Code1Line.Interfaces
{
    public interface IMensagemRepository
    {
        Task<List<Mensagem>> GetChatMessagesAsync(Guid chatId);
        Task<Mensagem> AddAsync(Mensagem msg);
        Task<List<Mensagem>> GetConversationAsync(Guid userAId, Guid userBId);
        Task<Mensagem?> GetByIdAsync(Guid id);
        Task DeleteAsync(Guid id);
        Task<List<Mensagem>> GetMessagesByUserAsync(Guid userId);

        Task<Chat?> GetChatByUsersAsync(Guid userAId, Guid userBId);
        Task<Chat> CreateChatAsync(Guid userAId, Guid userBId);
        Task UpdateChatAsync(Chat chat);
        Task<List<Mensagem>> GetMessagesByChatIdAsync(Guid id); 
    }
}
