using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartamentoController : ControllerBase
{
    private readonly IDepartamentoRepository _repo;

    public DepartamentoController(IDepartamentoRepository repo)
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
        var d = await _repo.GetByIdAsync(id);
        if (d == null) return NotFound();
        return Ok(d);
    }

    [HttpPost]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Create([FromBody] Departamento departamento)
    {
        await _repo.AddAsync(departamento);
        return CreatedAtAction(nameof(GetById), new { id = departamento.Id }, departamento);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Update(int id, [FromBody] Departamento departamento)
    {
        if (id != departamento.Id) return BadRequest();
        await _repo.UpdateAsync(departamento);
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
