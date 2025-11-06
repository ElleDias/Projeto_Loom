using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtividadeController : ControllerBase
{
    private readonly IAtividadeRepository _repo;

    public AtividadeController(IAtividadeRepository repo)
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
        var a = await _repo.GetByIdAsync(id);
        if (a == null) return NotFound();
        return Ok(a);
    }

    [HttpPost]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Create([FromBody] Atividade atividade)
    {
        await _repo.AddAsync(atividade);
        return CreatedAtAction(nameof(GetById), new { id = atividade.Id }, atividade);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Update(int id, [FromBody] Atividade atividade)
    {
        if (id != atividade.Id) return BadRequest();
        await _repo.UpdateAsync(atividade);
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
