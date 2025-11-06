using Code1Line.Domain;

namespace Code1Line.Interfaces;

public interface IMensagemRepository
{
    Task<IEnumerable<Mensagem>> GetConversationAsync(int userAId, int userBId);
    Task<Mensagem?> GetByIdAsync(int id);
    Task AddAsync(Mensagem mensagem);
    Task DeleteAsync(int id);
}
