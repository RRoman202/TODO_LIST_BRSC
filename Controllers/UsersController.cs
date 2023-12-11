using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TODO_LIST.DTO;
using todolist_api.Data;
using todolist_api.Data.Models;

namespace todolist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        private readonly IConfiguration _configuration;

        public UsersController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Registration(UserModel userModel)
        {
            userModel.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userModel.PasswordHash);
            _context.Users.Add(userModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserModel", new { id = userModel.Id }, userModel);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login(UserDTO request)
        {
            var user = await (from u in _context.Users where u.Username == request.Username select u).FirstOrDefaultAsync();
            if (user != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return BadRequest("Неправильный пароль");
                }
            }
            else
            {
                return BadRequest("Неправильный логин");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(int id)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        private string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("ID", user.Id.ToString())
            };
           
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings:Key").Value!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: _configuration.GetSection("JwtSettings:Issuer").Value,
                    audience: _configuration.GetSection("JwtSettings:Audience").Value,
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }
    }
}
