using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FuncionarioController : ControllerBase
{
    private readonly IFuncionarioRepository _repo;

    public FuncionarioController(IFuncionarioRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var f = await _repo.GetByIdAsync(id);
        if (f == null) return NotFound();
        return Ok(f);
    }

    [HttpPost]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Create([FromBody] Funcionario funcionario)
    {
        await _repo.AddAsync(funcionario);
        return CreatedAtAction(nameof(GetById), new { id = funcionario.Id }, funcionario);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Update(int id, [FromBody] Funcionario funcionario)
    {
        if (id != funcionario.Id) return BadRequest();
        await _repo.UpdateAsync(funcionario);
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
