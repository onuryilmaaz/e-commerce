using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class RegisterDto
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}
