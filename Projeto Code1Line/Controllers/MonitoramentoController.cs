using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;
using Projeto_Code1Line.DTOs;

namespace Code1Line.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MonitoramentoController : ControllerBase
{
    
        private readonly IMonitoramentoRepository _repo;

        public MonitoramentoController(IMonitoramentoRepository repo)
        {
            _repo = repo;
        }

        // ===========================================
        // =============== ENDPOINTS CRUD =============
        // ===========================================

        [HttpGet]
        [Authorize(Roles = "Gerente,Gestor")]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        [Authorize(Roles = "Gerente,Gestor")]
        public async Task<IActionResult> GetById(int id)
        {
            var m = await _repo.GetByIdAsync(id);
            if (m == null) return NotFound();
            return Ok(m);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Monitoramento monitoramento)
        {
            await _repo.AddAsync(monitoramento);
            return CreatedAtAction(nameof(GetById), new { id = monitoramento.Id }, monitoramento);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }

        // ===========================================
        // ======= ENDPOINT TEMPORÁRIO FIREWALL =======
        // ===========================================
        // Este endpoint servirá para receber logs enviados pela equipe de redes
        // quando o formato e protocolo forem definidos.
        // Por enquanto, ele apenas registra o conteúdo no console
        // e confirma o recebimento.

        [HttpPost("firewall-log")]
        [AllowAnonymous] // Pode ser alterado para [Authorize] depois
        public async Task<IActionResult> ReceberLog([FromBody] dynamic dados)
        {
            try
            {
                // Exemplo: apenas exibe o conteúdo no console
                Console.WriteLine($"[LOG FIREWALL RECEBIDO] {dados}");

                // Futuramente, aqui você poderá transformar o dado recebido
                // em um objeto Monitoramento e salvar no banco:
                //
                // var monitoramento = new Monitoramento
                // {
                //     FuncionarioId = dados.FuncionarioId,
                //     Aplicativo = dados.Aplicativo,
                //     TempoEmUsoMinutos = dados.TempoEmUsoMinutos,
                //     DataRegistro = DateTime.UtcNow
                // };
                // await _repo.AddAsync(monitoramento);

                return Ok(new
                {
                    status = "recebido",
                    horario = DateTime.UtcNow,
                    exemplo = "Endpoint temporário para testes de integração com firewall"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERRO LOG FIREWALL] {ex.Message}");
                return BadRequest(new { erro = ex.Message });
            }
        }
    }

