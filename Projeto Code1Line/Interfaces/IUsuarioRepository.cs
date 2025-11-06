using Code1Line.Domain;
using Microsoft.EntityFrameworkCore;
using Code1Line.Repositories;
namespace Code1Line.Interfaces;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAllAsync();
    Task<Usuario?> GetByIdAsync(int id);
    Task<Usuario?> GetByEmaileSenhaAsync(string email, string senha);
    Task AddAsync(Usuario usuario);
    Task UpdateAsync(Usuario usuario);
    Task DeleteAsync(int id);
}
