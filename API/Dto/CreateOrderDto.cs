using System;

namespace API.Dto;

public class CreateOrderDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public string City { get; set; }
    public string AddressLine { get; set; }
    public string CardName { get; set; }
    public string CardNumber { get; set; }
    public string CardExpireMonth { get; set; }
    public string CardExpireYear { get; set; }
    public string CardCvc { get; set; }
}
