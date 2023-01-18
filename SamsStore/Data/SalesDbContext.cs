using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SamsStore.Models;

namespace SamsStore.Data
{
    public class SalesDbContext:DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Sale> Sales { get; set; }


        public SalesDbContext() : base()
        {

        }

        public SalesDbContext(DbContextOptions options): base(options)
        {

        }
    }
}
