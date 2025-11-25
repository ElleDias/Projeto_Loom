using Projeto_Code1Line.Domain;
using System.Collections.Generic;

namespace Projeto_Code1Line.Interfaces
{
    public interface IDominioRepository
    {
        void Adicionar(Dominio dominio);

        IEnumerable<Dominio> ObterTodos();

        Dominio ObterPorId(int id);

        void Atualizar(Dominio dominio);

        void Remover(int id);
    }
}