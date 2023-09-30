using E_Commerce.Data;
using E_Commerce.DTOs;
using E_Commerce.Entities.OrderAggregate;
using E_Commerce.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly ECommerceContext _context;

    public OrdersController(ECommerceContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x => x.BuyerId == User.Identity.Name)
            .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
            .FirstOrDefaultAsync();
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await _context.Baskets.RetrieveBasketWithItems(User.Identity.Name).FirstOrDefaultAsync();
        if (basket == null) return BadRequest(new ProblemDetails()
        {
            Title = "Could not locate basket"
        });
        var items = new List<OrderItem>();
        
        basket.Items.ForEach(async item =>
        {
            var productItem = await _context.Products.FindAsync(item.ProductId);
            var itemOrdered = new ProductItemOrdered() { ProductId = productItem!.Id, Name = productItem.Name, PictureUrl = productItem.PictureUrl };

            var orderItem = new OrderItem() { ItemOrdered = itemOrdered, Price = productItem.Price, Quantity = item.Quantity };
            items.Add(orderItem);
            productItem.QuantityInStock -= item.Quantity;
        });

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        var order = new Order()
        {
            OrderItems = items,
            BuyerId = User.Identity.Name,
            ShippingAddress = orderDto.ShippingAddress,
            SubTotal = subtotal,
            DeliveryFee = deliveryFee,
            PaymentIntentId = basket.PaymentIntentId
        };

        _context.Orders.Add(order);
        _context.Baskets.Remove(basket);
        if (orderDto.SaveAddress is true)
        {
            var user = _context
                .Users
                .Include(a => a.Address)
                .FirstOrDefault(x => x.UserName == User.Identity.Name);
            
            var address = new UserAddress()
            {
                FullName = orderDto.ShippingAddress.FullName,
                Address1 = orderDto.ShippingAddress.Address1,
                Address2 = orderDto.ShippingAddress.Address2,
                City = orderDto.ShippingAddress.City,
                Country = orderDto.ShippingAddress.Country,
                Zip = orderDto.ShippingAddress.Zip,
                State = orderDto.ShippingAddress.State
            };
            user!.Address = address;
            // _context.Update(user);
        }

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
        return BadRequest("Problem creating order");
    }
}