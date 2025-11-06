using Microsoft.EntityFrameworkCore;
using Code1Line.Domain;

namespace Code1Line.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuario { get; set; } = null!;
    public DbSet<Funcionario> Funcionarios { get; set; } = null!;
    public DbSet<Departamento> Departamentos { get; set; } = null!;
    public DbSet<Atividade> Atividades { get; set; } = null!;
    public DbSet<Monitoramento> Monitoramentos { get; set; } = null!;
    public DbSet<Mensagem> Mensagens { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Departamento>()
            .HasMany(d => d.Funcionarios)
            .WithOne(f => f.Departamento)
            .HasForeignKey(f => f.DepartamentoId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=NOTE16-S28\\SQLEXPRESS; Database=Code1Line; User Id= sa; Password=Senai@134; TrustServerCertificate=true;");

        }
    }
}
