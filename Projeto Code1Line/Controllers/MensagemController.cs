using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Code1Line.Domain;
using Code1Line.Interfaces;
using Code1Line.Data;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MensagemController : ControllerBase
{
    private readonly IMensagemRepository _repo;
    private readonly AppDbContext _context; // Para acessar chats e usuários

    public MensagemController(IMensagemRepository repo, AppDbContext context)
    {
        _repo = repo;
        _context = context;
    }

    // 📌 Buscar todas as mensagens de um usuário
    [HttpGet("list/{userId:guid}")]
    [Authorize]
    public async Task<IActionResult> GetMessagesByUser(Guid userId)
    {
        var mensagens = await _repo.GetMessagesByUserAsync(userId);

        // Incluir nomes dos usuários
        var mensagensComNomes = mensagens.Select(m => new
        {
            m.Id,
            m.ChatId,
            m.RemetenteId,
            RemetenteNome = _context.Usuario
                .FirstOrDefault(u => u.Id == m.RemetenteId)?.Nome ?? "Usuário",
            m.DestinatarioId,
            DestinatarioNome = _context.Usuario
                .FirstOrDefault(u => u.Id == m.DestinatarioId)?.Nome ?? "Usuário",
            m.Conteudo,
            m.EnviadaEm
        });

        return Ok(mensagensComNomes);
    }

    // 📌 Buscar conversa entre dois usuários
    [HttpGet("conversation/{userAId:guid}/{userBId:guid}")]
    [Authorize]
    public async Task<IActionResult> GetConversation(Guid userAId, Guid userBId)
    {
        var chat = await _context.Chats
            .FirstOrDefaultAsync(c =>
                (c.Usuario1Id == userAId && c.Usuario2Id == userBId) ||
                (c.Usuario1Id == userBId && c.Usuario2Id == userAId));

        if (chat == null)
            return Ok(new List<object>());

        var mensagens = await _context.Mensagens
            .Where(m => m.ChatId == chat.Id)
            .OrderBy(m => m.EnviadaEm)
            .ToListAsync();

        // Adicionar nomes
        var mensagensComNomes = mensagens.Select(m => new
        {
            m.Id,
            m.ChatId,
            m.RemetenteId,
            RemetenteNome = _context.Usuario
                .FirstOrDefault(u => u.Id == m.RemetenteId)?.Nome ?? "Usuário",
            m.DestinatarioId,
            DestinatarioNome = _context.Usuario
                .FirstOrDefault(u => u.Id == m.DestinatarioId)?.Nome ?? "Usuário",
            m.Conteudo,
            m.EnviadaEm
        });

        return Ok(mensagensComNomes);
    }

    // 📌 Enviar mensagem
    [HttpPost("send")]
    [Authorize]
    public async Task<IActionResult> Send([FromBody] Mensagem mensagem)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        mensagem.EnviadaEm = DateTime.UtcNow;

        var chat = await _repo.GetChatByUsersAsync(mensagem.RemetenteId, mensagem.DestinatarioId);
        if (chat == null)
        {
            chat = await _repo.CreateChatAsync(mensagem.RemetenteId, mensagem.DestinatarioId);
        }

        mensagem.ChatId = chat.Id;

        var created = await _repo.AddAsync(mensagem);

        // Atualiza última mensagem do chat
        chat.UltimaMensagemId = created.Id;
        chat.AtualizadoEm = DateTime.UtcNow;
        await _repo.UpdateChatAsync(chat);

        return CreatedAtAction(nameof(GetConversation),
            new { userAId = mensagem.RemetenteId, userBId = mensagem.DestinatarioId },
            created);
    }

    // 📌 Deletar mensagem (somente Gerente)
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Gerente")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
