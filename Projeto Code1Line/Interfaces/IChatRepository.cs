using Code1Line.Domain;

namespace Projeto_Code1Line.Interfaces
{
    public interface IChatRepository
    {
        Task<Chat?> GetChatAsync(Guid userAId, Guid userBId);
        Task<List<Chat>> GetUserChatsAsync(Guid userId);
        Task<Chat> CreateChatAsync(Guid userAId, Guid userBId);
        Task UpdateAsync(Chat chat);
    }
}
