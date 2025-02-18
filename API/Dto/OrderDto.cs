using System;
using API.Entity;

namespace API.Dto;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public string City { get; set; }
    public string AddressLine { get; set; }
    public string CustomerId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public List<OrderItemDto> OrderItems { get; set; }
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }

}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public string ProductImage { get; set; } = null!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}