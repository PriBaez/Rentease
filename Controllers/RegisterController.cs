using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Security.Claims;
using SDGAV.Models;
using SDGAV.interfaces;
// using System.IdentityModel.Tokens.Jwt;

namespace SDGAV.Controllers;

[Route("api/[controller]")]

public class RegisterController: Controller
{
    private readonly IUser _userService;

    private readonly IAuthentication _authService;

    public RegisterController(IUser userService, IAuthentication authService)
    {
        _userService = userService;
        _authService = authService;
    }

    [HttpGet]

    public IActionResult Register()
    {
        return Ok();
    }
    
}