using Code1Line.Domain;
using Code1Line.DTOs;

namespace Code1Line.Repository
{
    public interface IAcessoRepository
    {
        Task<List<AcessoDTO>> ListarAcessosAsync();
        Task<AcessoDTO> CriarAcessoAsync(Acesso data);
        Task<bool> DeletarAcessoAsync(Guid id);
    }
}
