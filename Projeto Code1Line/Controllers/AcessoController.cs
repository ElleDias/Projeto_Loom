using Code1Line.Domain;
using Code1Line.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Code1Line.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcessoController : ControllerBase
    {
        private readonly IAcessoRepository _repo;

        public AcessoController(IAcessoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAcessos()
        {
            var acessos = await _repo.ListarAcessosAsync();
            return Ok(acessos);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAcesso([FromBody] Acesso data)
        {
            var acesso = await _repo.CriarAcessoAsync(data);
            return Ok(acesso);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarAcesso(Guid id)
        {
            var result = await _repo.DeletarAcessoAsync(id);

            if (!result) return NotFound("Registro não encontrado.");

            return Ok("Acesso deletado com sucesso.");
        }
    }
}
