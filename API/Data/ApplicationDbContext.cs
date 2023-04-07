using DAFwebAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace DAFwebAPI.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<BoardMember> BoardMembers { get; set; }  
        
        public DbSet<News> News { get; set; }   

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Vaccancy> Vaccancies { get; set; }

        public DbSet<Research> Researchs { get; set; }

        public DbSet<Region> Regions { get; set; }
        public DbSet<RegionalWaterFederation> RegionalWaterFederations { get; set; }        
        public DbSet<WaterUtility> waterUtilities { get; set; }



        public DbSet<Questioner> Questioners { get; set; }

        public DbSet<Questions> Questions { get; set; }


        public DbSet<Answer> Answers { get; set; }


        public DbSet<Sponsor> Sponsors { get; set; }

        public DbSet<Forum> Forums { get; set; }

       public DbSet<Subscriber> Subscribers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
            modelBuilder.Entity<Subscriber>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
        }
        }
}
