using Microsoft.EntityFrameworkCore;
using Code1Line.Data;
using Code1Line.Domain;
using Code1Line.Interfaces;
using BCrypt.Net;

namespace Code1Line.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync() =>
        await _context.Usuario.ToListAsync();

    public async Task<Usuario?> GetByIdAsync(int id) =>
        await _context.Usuario.FindAsync(id);

    public async Task AddAsync(Usuario usuario)
    {
        // Gera o hash da senha antes de salvar
        usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
        _context.Usuario.Add(usuario);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Usuario usuario)
    {
        _context.Usuario.Update(usuario);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var u = await _context.Usuario.FindAsync(id);
        if (u != null)
        {
            _context.Usuario.Remove(u);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Usuario?> GetByEmaileSenhaAsync(string email, string senha)
    {
        // Busca o usuário pelo e-mail
        var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Email == email);
        if (usuario == null)
            return null;

        // Verifica se a senha informada bate com o hash
        bool senhaCorreta = BCrypt.Net.BCrypt.Verify(senha, usuario.Senha);

        return senhaCorreta ? usuario : null;
    }
}
