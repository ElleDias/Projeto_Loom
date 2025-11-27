using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto_Code1Line.Domain;
using Projeto_Code1Line.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projeto_Code1Line.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefasRepository _tarefasRepository;

        public TarefasController(ITarefasRepository tarefasRepository)
        {
            _tarefasRepository = tarefasRepository;
        }


        // GET: api/tarefas

        [HttpGet]
        [Authorize(Roles = "Funcionario,Gerente,Gestor")]
        public async Task<ActionResult<IEnumerable<Tarefas>>> GetTarefas()
        {
            var tarefas = await _tarefasRepository.ListarTarefasAsync();
            return Ok(tarefas);
        }

        // GET: api/tarefas/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Funcionario,Gerente,Gestor")]
        public async Task<ActionResult<Tarefas>> GetTarefa(int id)
        {
            var tarefa = await _tarefasRepository.BuscarPorIdAsync(id);
            if (tarefa == null)
                return NotFound(new { mensagem = "Tarefa não encontrada!" });

            return Ok(tarefa);
        }

        // POST: api/tarefas
        [HttpPost]
        [Authorize(Roles = "Funcionario,Gerente,Gestor")]
        public async Task<ActionResult> PostTarefa([FromBody] Tarefas tarefa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _tarefasRepository.AdicionarAsync(tarefa);
            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, tarefa);
        }

        // PUT: api/tarefas/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Funcionario,Gerente,Gestor")]
        public async Task<ActionResult> PutTarefa(int id, [FromBody] Tarefas tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest(new { mensagem = "O ID informado não corresponde à tarefa." });

            var existente = await _tarefasRepository.BuscarPorIdAsync(id);
            if (existente == null)
                return NotFound(new { mensagem = "Tarefa não encontrada!" });

            await _tarefasRepository.AtualizarAsync(tarefa);
            return NoContent();
        }

        // DELETE: api/tarefas/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Funcionario,Gerente,Gestor")]
        public async Task<ActionResult> DeleteTarefa(int id)
        {
            var tarefa = await _tarefasRepository.BuscarPorIdAsync(id);
            if (tarefa == null)
                return NotFound(new { mensagem = "Tarefa não encontrada!" });

            await _tarefasRepository.RemoverAsync(id);
            return NoContent();
        }
    }
}