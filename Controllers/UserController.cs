using Microsoft.AspNetCore.Mvc;
using SDGAV.Models;
using SDGAV.interfaces;
using SDGAV.Models.DTO;

namespace SDGAV.Controllers;

[Route("api/[controller]")]
[ApiController]

public class UserController: Controller
{
    private readonly IUser _userService;

    public UserController(IUser userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> getUser()
    {
        var usersInfo = await _userService.getUsersInfo();
        return Ok(usersInfo);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> getUserId(int id)
    {
        var userInfo = await _userService.GetUser(id);
        return Ok(userInfo);
    }

    [HttpPost]
    public async Task<IActionResult> addUser(UserDataDTO userData)
    {
        var inserted = await _userService.Insert(userData);

        if(inserted)
        {
            return Ok();
        } else {
            return BadRequest();
        }
    }

    
}
