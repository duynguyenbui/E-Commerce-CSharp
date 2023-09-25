using E_Commerce.Entities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Data;

public class ECommerceContext : DbContext
{
    public ECommerceContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}