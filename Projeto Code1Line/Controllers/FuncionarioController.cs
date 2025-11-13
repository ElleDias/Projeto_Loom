using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Code1Line.Domain;
using Code1Line.Interfaces;

namespace Code1Line.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionarioRepository _repository;

        public FuncionarioController(IFuncionarioRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var funcionarios = await _repository.ListarAsync();
            return Ok(funcionarios);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var funcionario = await _repository.BuscarPorIdAsync(id);
            if (funcionario == null)
                return NotFound();

            return Ok(funcionario);
        }

        [HttpPost]
        [Authorize(Roles = "Gerente,Gestor")]
        public async Task<IActionResult> Create([FromBody] Funcionario funcionario)
        {
            if (funcionario == null)
                return BadRequest("Dados inválidos.");

            await _repository.CadastrarAsync(funcionario);

            return CreatedAtAction(nameof(GetById), new { id = funcionario.Id }, funcionario);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Gerente,Gestor")]
        public async Task<IActionResult> Update(int id, [FromBody] Funcionario funcionario)
        {
            if (id != funcionario.Id)
                return BadRequest("ID do funcionário não confere.");

            var existente = await _repository.BuscarPorIdAsync(id);
            if (existente == null)
                return NotFound();

            await _repository.AtualizarAsync(funcionario);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> Delete(int id)
        {
            var funcionario = await _repository.BuscarPorIdAsync(id);
            if (funcionario == null)
                return NotFound();

            await _repository.DeletarAsync(id);
            return NoContent();
        }
    }
}
