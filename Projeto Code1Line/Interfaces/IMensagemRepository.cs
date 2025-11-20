using Code1Line.Domain;

namespace Code1Line.Interfaces
{
    public interface IMensagemRepository
    {
        Task<List<Mensagem>> GetChatMessagesAsync(Guid chatId);
        Task<Mensagem> AddAsync(Mensagem msg);
        Task<IEnumerable<Mensagem>> GetConversationAsync(Guid userAId, Guid userBId);
        Task<Mensagem?> GetByIdAsync(Guid id);
        Task DeleteAsync(Guid id);
        Task<List<Mensagem>> GetMessagesByUserAsync(Guid userId);

        Task<Chat?> GetChatByUsersAsync(Guid userAId, Guid userBId);
        Task<Chat> CreateChatAsync(Guid userAId, Guid userBId);
        Task UpdateChatAsync(Chat chat);
        Task<IEnumerable<object>> GetMessagesByChatIdAsync(Guid id);
    }
}
