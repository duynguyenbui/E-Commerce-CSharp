namespace E_Commerce.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; } // 100 => 10000 in database
    public string PictureUrl { get; set; }
    public string Brand { get; set; }
    public string Type { get; set; }
    public int QuantityInStock { get; set; }
    public string PublicId { get; set; }
}