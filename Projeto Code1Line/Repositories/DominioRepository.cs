using Projeto_Code1Line.Domain;
using Projeto_Code1Line.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Projeto_Code1Line.Repositories
{
    public class DominioRepository : IDominioRepository
    {
        private static List<Dominio> _dominios = new List<Dominio>
        {
            new Dominio { Id = 1, Categoria = "Desenvolvimento", Produtivos = "Codificação", Improdutivos = "Reuniões longas", Analise = "Alta prioridade" },
            new Dominio { Id = 2, Categoria = "Vendas", Produtivos = "Chamadas de clientes", Improdutivos = "Tarefas administrativas", Analise = "Média prioridade" }
        };
        private static int _nextId = 3;

        public void Adicionar(Dominio dominio)
        {
            dominio.Id = _nextId++;
            _dominios.Add(dominio);
        }

        public IEnumerable<Dominio> ObterTodos()
        {
            return _dominios;
        }

        public Dominio ObterPorId(int id)
        {
            return _dominios.FirstOrDefault(d => d.Id == id);
        }

        public void Atualizar(Dominio dominio)
        {
            var existingDominio = _dominios.FirstOrDefault(d => d.Id == dominio.Id);

            if (existingDominio != null)
            {
                existingDominio.Categoria = dominio.Categoria;
                existingDominio.Produtivos = dominio.Produtivos;
                existingDominio.Improdutivos = dominio.Improdutivos;
                existingDominio.Analise = dominio.Analise;
            }
        }

        public void Remover(int id)
        {
            var dominio = _dominios.FirstOrDefault(d => d.Id == id);

            if (dominio != null)
            {
                _dominios.Remove(dominio);
            }
        }
    }
}