using E_Commerce.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;

namespace E_Commerce.Entities;

public class User : IdentityUser<int>
{
    public UserAddress Address { get; set; }
}