using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Services;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;

    public DashboardController(IDashboardService service)
    {
        _service = service;
    }

    [HttpGet("resumo")]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> GetResumo()
    {
        var r = await _service.GetResumoAsync();
        return Ok(r);
    }
}
