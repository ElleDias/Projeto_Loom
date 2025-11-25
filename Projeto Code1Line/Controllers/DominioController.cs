using Microsoft.AspNetCore.Mvc;
using Projeto_Code1Line.Domain;
using Projeto_Code1Line.Interfaces;
using System.Collections.Generic;

namespace Projeto_Code1Line.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DominioController : ControllerBase
    {
        private readonly IDominioRepository _dominioRepository;

        public DominioController(IDominioRepository dominioRepository)
        {
            _dominioRepository = dominioRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Dominio>> Get()
        {
            var dominios = _dominioRepository.ObterTodos();
            return Ok(dominios);
        }

        [HttpGet("{id}")]
        public ActionResult<Dominio> Get(int id)
        {
            var dominio = _dominioRepository.ObterPorId(id);

            if (dominio == null)
            {
                return NotFound();
            }

            return Ok(dominio);
        }

        [HttpPost]
        public ActionResult<Dominio> Post([FromBody] Dominio dominio)
        {
            _dominioRepository.Adicionar(dominio);
            return CreatedAtAction(nameof(Get), new { id = dominio.Id }, dominio);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Dominio dominioAtualizado)
        {
            dominioAtualizado.Id = id;
            _dominioRepository.Atualizar(dominioAtualizado);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _dominioRepository.Remover(id);
            return NoContent();
        }
    }
}