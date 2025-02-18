using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class LoginDto
{
    [Required]
    public string UserName { get; set; }
    [Required]
    public string Password { get; set; }
}
