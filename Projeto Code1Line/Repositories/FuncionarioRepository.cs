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

    // LISTAR TODOS
    [HttpGet]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Listar()
        => Ok(await _repo.ListarAsync());

    // BUSCAR POR ID DO FUNCIONÁRIO
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        var f = await _repo.BuscarPorIdAsync(id);
        if (f == null) return NotFound();
        return Ok(f);
    }

    // 🚀 **A ROTA QUE ESTAVA FALTANDO**
    // BUSCAR FUNCIONÁRIO PELO USERID (GUID)
    [HttpGet("usuario/{userId:guid}")]
    public async Task<IActionResult> BuscarPorUserId(Guid userId)
    {
        var funcionario = await _repo.BuscarPorUserIdAsync(userId);
        if (funcionario == null) return NotFound();
        return Ok(funcionario);
    }
}
