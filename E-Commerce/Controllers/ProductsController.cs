using System.Text.Json;
using API.RequestHelpers;
using AutoMapper;
using E_Commerce.Data;
using E_Commerce.DTOs;
using E_Commerce.Entities;
using E_Commerce.Extensions;
using E_Commerce.RequestHelpers;
using E_Commerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : BaseApiController
{
    private readonly ECommerceContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public ProductsController(ECommerceContext context, IMapper mapper, ImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
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

    [HttpGet("{id}", Name = "GetProduct")]
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

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
    {
        var product = _mapper.Map<Product>(productDto);

        if (productDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        _context.Products.Add(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

        return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
    }


    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
    {
        var product = await _context.Products.FindAsync(productDto.Id);
        if (product is null)
        {
            return NotFound();
        }
        _mapper.Map(productDto, product);

        if (productDto.File is not null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);
            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(publicId: product.PublicId);
            
            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;

        }
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok(product);

        return BadRequest(new ProblemDetails() { Title = "Product update failed" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return NotFound();
        
        if (!string.IsNullOrEmpty(product.PublicId))
            await _imageService.DeleteImageAsync(publicId: product.PublicId);

        _context.Products.Remove(product);
        
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();
        return BadRequest(new ProblemDetails() { Title = "Product delete failed" });
    }
}

