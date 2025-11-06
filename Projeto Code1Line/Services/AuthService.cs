using Code1Line.Domain;
using Code1Line.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Code1Line.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
    {
        _usuarioRepository = usuarioRepository;
        _configuration = configuration;
    }

    public async Task<Usuario> RegisterAsync(string nome, string email, string senha, string cargo)
    {
        // Verifica se já existe usuário com o mesmo email
        var existingUser = (await _usuarioRepository.GetAllAsync())
            .FirstOrDefault(u => u.Email == email);

        if (existingUser != null)
            throw new Exception("Usuário já cadastrado com este email.");

        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Nome = nome,
            Email = email,
            Senha = senha, // será criptografada no repository
            Cargo = cargo
        };

        await _usuarioRepository.AddAsync(usuario);
        return usuario;
    }

    public async Task<string?> AuthenticateAsync(string email, string senha)
    {
        var usuario = await _usuarioRepository.GetByEmaileSenhaAsync(email, senha);
        if (usuario == null)
            return null;

        return GenerateJwtToken(usuario);
    }

    private string GenerateJwtToken(Usuario usuario)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // As claims são as informações que vão dentro do token
        var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
    new Claim("id", usuario.Id.ToString()),
    new Claim(ClaimTypes.Role, usuario.Cargo) // <-- ESSA É A MUDANÇA!
};


        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
