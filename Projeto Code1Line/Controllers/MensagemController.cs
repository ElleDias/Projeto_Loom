using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MensagemController : ControllerBase
{
    private readonly IMensagemRepository _repo;

    public MensagemController(IMensagemRepository repo)
    {
        _repo = repo;
    }

    [HttpGet("conversation/{userAId}/{userBId}")]
    [Authorize]
    public async Task<IActionResult> GetConversation(int userAId, int userBId)
    {
        var conv = await _repo.GetConversationAsync(userAId, userBId);
        return Ok(conv);
    }

    [HttpPost]
    [Authorize(Roles = "Gerente,Gestor")]
    public async Task<IActionResult> Send([FromBody] Mensagem mensagem)
    {
        await _repo.AddAsync(mensagem);
        return CreatedAtAction(nameof(GetConversation), new { userAId = mensagem.RemetenteId, userBId = mensagem.DestinatarioId }, mensagem);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Gerente")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
