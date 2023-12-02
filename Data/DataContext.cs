using Microsoft.EntityFrameworkCore;
using System.Drawing.Drawing2D;
using todolist_api.Data.Models;

namespace todolist_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<TaskModel> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("users");
            modelBuilder.Entity<TaskModel>().ToTable("tasks");
            base.OnModelCreating(modelBuilder);
        }
    }
}
