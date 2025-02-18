using API.Data;
using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            return CartToDto(await GetOrCreate(GetCustomerId()));
        }
        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate(GetCustomerId());

            var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);

            if (product == null)
                return NotFound("The Product is not in database");

            cart.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetCart), CartToDto(cart));

            return BadRequest(new ProblemDetails { Title = "The product can not be added to cart" });
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate(GetCustomerId());
            cart.DeleteItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetCart), CartToDto(cart));

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the cart" });
        }

        private string GetCustomerId()
        {
            return User.Identity?.Name ?? Request.Cookies["customerId"]!;
        }

        private async Task<Cart> GetOrCreate(string custId)
        {
            var cart = await _context.Carts
                        .Include(i => i.CartItems)
                        .ThenInclude(i => i.Product)
                        .Where(i => i.CustomerId == custId)
                        .FirstOrDefaultAsync();
            if (cart == null)
            {
                var customerId = User.Identity?.Name;

                if (string.IsNullOrEmpty(customerId))
                {
                    customerId = Guid.NewGuid().ToString();
                    var cookieOptions = new CookieOptions
                    {
                        Expires = DateTime.Now.AddMonths(1),
                        IsEssential = true
                    };
                    Response.Cookies.Append("customerId", customerId, cookieOptions);
                }

                cart = new Cart { CustomerId = customerId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }

        private CartDto CartToDto(Cart cart)
        {
            return new CartDto
            {
                CartId = cart.CartId,
                CustomerId = cart.CustomerId,
                CartItems = cart.CartItems.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    ImageUrl = item.Product.ImageUrl
                }).ToList()
            };
        }
    }
}
