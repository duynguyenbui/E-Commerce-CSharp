using E_Commerce.Entities;
using Stripe;

namespace E_Commerce.Services;

public class PaymentService
{
    private readonly IConfiguration _configuration;

    public PaymentService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<PaymentIntent>
        CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();
        var intent = new PaymentIntent();
        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 500;
        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions()
            {
                Amount = subtotal + deliveryFee,
                Currency = "THB",
                PaymentMethodTypes = new List<string>() { "card" }
            };

            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions()
            {
                Amount = subtotal + deliveryFee,
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }

        return intent;
    }
}