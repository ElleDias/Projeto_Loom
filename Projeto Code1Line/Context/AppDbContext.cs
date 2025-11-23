using Microsoft.EntityFrameworkCore;
using Code1Line.Domain;
using Projeto_Code1Line.Domain;

namespace Code1Line.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Tarefas> Tarefas { get; set; }
    public DbSet<Usuario> Usuario { get; set; }
    public DbSet<Funcionario> Funcionarios { get; set; }
    public DbSet<Departamento> Departamentos { get; set; }
    public DbSet<Atividade> Atividades { get; set; }
    public DbSet<Monitoramento> Monitoramentos { get; set; }
    public DbSet<Mensagem> Mensagens { get; set; }
    public DbSet<Chat> Chats { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // -----------------------
        // Departamento -> Funcionarios (1:N)
        // -----------------------
        modelBuilder.Entity<Departamento>()
            .HasMany(d => d.Funcionarios)
            .WithOne(f => f.Departamento)
            .HasForeignKey(f => f.DepartamentoId)
            .OnDelete(DeleteBehavior.Restrict);

        // -----------------------
        // Usuario: Email único
        // -----------------------
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // -----------------------
        // Chat -> Mensagens (1:N)
        // -----------------------
        modelBuilder.Entity<Chat>()
            .HasMany(c => c.Mensagens)
            .WithOne(m => m.Chat)
            .HasForeignKey(m => m.ChatId)
            .OnDelete(DeleteBehavior.Cascade);

        // -----------------------
        // Chat -> Última Mensagem (1 opcional)
        // -----------------------
        modelBuilder.Entity<Chat>()
            .HasOne(c => c.UltimaMensagem)
            .WithMany()
            .HasForeignKey(c => c.UltimaMensagemId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                "Server=DESKTOP-DIMB9O9\\MSSQLSERVER01; Database=Code1Line; Trusted_Connection=True; TrustServerCertificate=True;");
        }
    }
}
