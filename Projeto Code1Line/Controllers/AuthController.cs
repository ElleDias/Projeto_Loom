using Microsoft.AspNetCore.Mvc;
using Code1Line.Services;
using Code1Line.DTOs;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
        try
        {
            var user = await _authService.RegisterAsync(dto.Nome, dto.Email, dto.Senha, dto.Cargo);
            return CreatedAtAction(nameof(Register), new { id = user.Id }, new { user.Id, user.Nome, user.Email, user.Cargo });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        var token = await _authService.AuthenticateAsync(dto.Email, dto.Senha);
        if (token == null) return Unauthorized(new { message = "Invalid credentials" });
        return Ok(new { token });
    }
}
