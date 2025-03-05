
using Microsoft.EntityFrameworkCore;
using NLPStudyCompanion.Server.Models;



namespace NLPStudyCompanion.Server.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Deck> Decks { get; set; }
        public DbSet<Card> Cards { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Card>()
                .HasOne(c => c.Deck)
                .WithMany(d => d.Cards)
                .HasForeignKey(c => c.DeckId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "Files", "decks.db");
                var connectionString = $"Data Source={dbPath}";



                optionsBuilder.UseSqlite(connectionString).UseLazyLoadingProxies();
            }
        }
    }
}