using E_Commerce.Entities.OrderAggregate;

namespace E_Commerce.DTOs;

public class CreateOrderDto
{
    public bool SaveAddress { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
}