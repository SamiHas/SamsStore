using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SamsStore.Models;

namespace SamsStore.Data
{
    public class SalesDbContext : DbContext
    {
        public SalesDbContext() : base()
        {

        }

        public SalesDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Sale> Sales { get; set; }

        /* protected override void OnModelCreating(ModelBuilder modelBuilder)
         {
             modelBuilder.Entity<Customer>().ToTable("Customers");
             modelBuilder.Entity<Product>().ToTable("Products");
             modelBuilder.Entity<Store>().ToTable("Stores");
             modelBuilder.Entity<Sale>().ToTable("Sales");
         }*/



    }
}
