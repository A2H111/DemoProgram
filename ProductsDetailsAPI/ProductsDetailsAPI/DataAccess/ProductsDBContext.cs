using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductsDetailsAPI.Models;

namespace ProductsDetailsAPI.DataAccess
{
    public class ProductsDBContext : DbContext
    {
        public virtual DbSet<Product> ProductsDetails { get; set; }
        //public virtual DbSet<InsertedProductId> InsertProducts { get; set; }
       
        public ProductsDBContext(DbContextOptions<ProductsDBContext> options) : base(options)
        {
            //this.Database.EnsureDeleted();
            this.Database.EnsureCreated();
        }

        //Seed the initial data. This is only used for Demo.
        //In Real world scenario, we will use stored procedures to insert the values to database.
        //https://www.learnentityframeworkcore.com/migrations/seeding

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>().HasData(
               new Product { ProductId = 500, ProductPrice = 100, ProductDescription = "Perforated arch for ventilation and breathability.Classic air cushion design makes these shoes are perfect work shoes for those who needs to stand or walk for long time.", ProductCategory ="Shoe", ProductName ="Running Shoe", ProductStockLevel = 500},
               new Product { ProductId = 501, ProductPrice = 1200, ProductDescription = "Beautifully bright 6.1-inch Super Retina XDR display.² Ceramic Shield with 4x better drop performance.³ Incredible low-light photography with Night mode on all cameras", ProductCategory = "Phone", ProductName = "Iphone", ProductStockLevel = 200 },
               new Product { ProductId = 502, ProductPrice = 799, ProductDescription = "iPad Pro features the powerful Apple M1 chip for next-level performance and all-day battery life.³ An immersive 12.9-inch Liquid Retina XDR display for viewing and editing HDR photos and videos.", ProductCategory = "Phone", ProductName = "Ipad", ProductStockLevel = 400 },
               new Product { ProductId = 503, ProductPrice = 949, ProductDescription = "Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with the 7-core GPU.", ProductCategory = "Laptop", ProductName = "MAcBook ", ProductStockLevel = 105 },
               new Product { ProductId = 504, ProductPrice = 299, ProductDescription = "LG UHD TV is your ticket to a stunning picture. Get easy access to new and popular apps like Disney+, the Apple TV app, Sling and more. Elevate entertainment with surround sound, auto picture settings of Filmmaker Mode™ and convenient updates of Sports Alert.", ProductCategory = "Television", ProductName = "UN7000 Series LED 4K UHD Smart TV", ProductStockLevel = 350 }
               //new Product { ProductId = 505, ProductPrice = 180, ProductDescription = "", ProductCategory = "", ProductName = "", ProductStockLevel = },
            );

            modelBuilder.Entity<Product>().HasKey(c => new { c.ProductId });
            //modelBuilder.Entity<InsertedProductId>().HasNoKey();
        }
    }
}
