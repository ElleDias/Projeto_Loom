using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioRepository _repo;

    public UsuarioController(IUsuarioRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

    [HttpGet("{id}")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> GetById(int id)
    {
        var u = await _repo.GetByIdAsync(id);
        if (u == null) return NotFound();
        return Ok(u);
    }

    [HttpPost]
    [Authorize(Roles = "Gerente")]
    public async Task<IActionResult> Create([FromBody] Usuario usuario)
    {
        await _repo.AddAsync(usuario);
        return CreatedAtAction(nameof(GetById), new { id = usuario.Id }, usuario);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Gerente")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Usuario usuario)
    {
        if (id != usuario.Id) return BadRequest();
        await _repo.UpdateAsync(usuario);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Gerente")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
