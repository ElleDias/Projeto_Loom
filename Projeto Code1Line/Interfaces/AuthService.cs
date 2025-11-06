using Code1Line.Domain;

namespace Code1Line.Interfaces;

public interface IAuthService
{
    Task<Usuario> RegisterAsync(string nome, string email, string senha, string cargo);
    Task<string?> AuthenticateAsync(string email, string senha);
}
