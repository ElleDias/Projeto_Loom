using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Code1Line.Interfaces;
using Projeto_Code1Line.DTOs;
using Projeto_Code1Line.Interfaces;

namespace Code1Line.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepo;
        private readonly IMensagemRepository _msgRepo;
        private readonly IUsuarioRepository _usuarioRepo;

        public ChatController(IChatRepository chatRepo, IMensagemRepository msgRepo, IUsuarioRepository usuarioRepo)
        {
            _chatRepo = chatRepo;
            _msgRepo = msgRepo;
            _usuarioRepo = usuarioRepo;
        }

        // Buscar ou criar chat entre dois usuários
        [HttpGet("get-or-create/{userAId:guid}/{userBId:guid}")]
        [Authorize]
        public async Task<IActionResult> GetOrCreate(Guid userAId, Guid userBId)
        {
            var chat = await _chatRepo.GetChatAsync(userAId, userBId)
                       ?? await _chatRepo.CreateChatAsync(userAId, userBId);

            return Ok(chat);
        }

        // Buscar chats de um usuário
        [HttpGet("user/{userId:guid}")]
        [Authorize]
        public async Task<IActionResult> GetUserChats(Guid userId)
        {
            var chats = await _chatRepo.GetUserChatsAsync(userId);
            var result = new List<ChatDTO>();

            foreach (var chat in chats)
            {
                var outroUsuarioId = chat.Usuario1Id == userId ? chat.Usuario2Id : chat.Usuario1Id;
                var outroUsuario = await _usuarioRepo.GetByIdAsync(outroUsuarioId);

                result.Add(new ChatDTO
                {
                    ChatId = chat.Id,
                    UltimaMensagem = chat.UltimaMensagem?.Conteudo ?? "",
                    EnviadaEm = chat.UltimaMensagem?.EnviadaEm,
                    OutroUsuarioId = outroUsuarioId,
                    OutroUsuarioNome = outroUsuario?.Nome ?? "Usuário Desconhecido"
                });
            }

            return Ok(result.OrderByDescending(c => c.EnviadaEm));
        }

        // Enviar mensagem
        [HttpPost("mensagem")]
        [Authorize]
        public async Task<IActionResult> EnviarMensagem([FromBody] Mensagem mensagem)
        {
            var chat = await _chatRepo.GetChatAsync(mensagem.RemetenteId, mensagem.DestinatarioId)
                       ?? await _chatRepo.CreateChatAsync(mensagem.RemetenteId, mensagem.DestinatarioId);

            mensagem.ChatId = chat.Id;
            var novaMsg = await _msgRepo.AddAsync(mensagem);

            // Atualiza última mensagem
            chat.UltimaMensagemId = novaMsg.Id;
            chat.AtualizadoEm = DateTime.UtcNow;
            await _chatRepo.UpdateAsync(chat);

            return Ok(novaMsg);
        }

        // Buscar todas as mensagens entre dois usuários
        [HttpGet("conversation/{userAId:guid}/{userBId:guid}")]
        [Authorize]
        public async Task<IActionResult> GetConversation(Guid userAId, Guid userBId)
        {
            var mensagens = await _msgRepo.GetConversationAsync(userAId, userBId);

            var mensagensDTO = new List<object>();

            foreach (var msg in mensagens.OrderBy(m => m.EnviadaEm))
            {
                var remetente = await _usuarioRepo.GetByIdAsync(msg.RemetenteId);

                mensagensDTO.Add(new
                {
                    Id = msg.Id,
                    Conteudo = msg.Conteudo,
                    EnviadaEm = msg.EnviadaEm.ToString("o"), // ✅ ISO 8601
                    RemetenteId = msg.RemetenteId,
                    RemetenteNome = remetente?.Nome ?? "Usuário Desconhecido",
                    DestinatarioId = msg.DestinatarioId
                });
            }

            return Ok(mensagensDTO);
        }


    }
}
