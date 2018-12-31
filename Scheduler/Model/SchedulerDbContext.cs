using Microsoft.EntityFrameworkCore;

namespace React.Model
{
    public class SchedulerDbContext : DbContext
    {
        public SchedulerDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Objective> Objectives { get; set; }
    }
}
