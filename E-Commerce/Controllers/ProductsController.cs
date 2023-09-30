using System.Text.Json;
using API.RequestHelpers;
using E_Commerce.Data;
using E_Commerce.Entities;
using E_Commerce.Extensions;
using E_Commerce.RequestHelpers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : BaseApiController
{
    private readonly ECommerceContext _context;

    public ProductsController(ECommerceContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
        var query =  _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
        var products = await PagedList<Product>
            .ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);
        return products;

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is not null)
        {
            return Ok(product);
        }
        return NotFound();
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

        return Ok(new
        {
            brands, types
        });
    }
}

