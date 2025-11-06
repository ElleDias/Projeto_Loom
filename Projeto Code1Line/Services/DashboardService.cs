using Code1Line.Interfaces;
using Code1Line.Data;
using Microsoft.EntityFrameworkCore;

namespace Code1Line.Services;

public interface IDashboardService
{
    Task<object> GetResumoAsync();
}

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<object> GetResumoAsync()
    {
        var totalFuncionarios = await _context.Funcionarios.CountAsync();
        var totalAtividades = await _context.Atividades.CountAsync();
        var totalMensagens = await _context.Mensagens.CountAsync();

        return new {
            TotalFuncionarios = totalFuncionarios,
            TotalAtividades = totalAtividades,
            TotalMensagens = totalMensagens
        };
    }
}
