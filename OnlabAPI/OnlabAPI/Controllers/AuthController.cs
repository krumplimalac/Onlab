using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthController(SignInManager<IdentityUser> signInManager,
                                      UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }



        [HttpPost("Login")]
        [Produces("application/json")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = await _userManager.FindByEmailAsync(username);
            if (user == null)
            {
                await HttpContext.SignOutAsync();
                return Ok();
            }
            var result = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (result.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user);
                //var now = DateTime.UtcNow;
                var claims = new List<Claim>(){
                new Claim(ClaimTypes.Name, user.Email),
                };
               foreach (var item in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, item));
                }


                return Ok(claims);
            }
            else
            {
                await HttpContext.SignOutAsync();
                return Ok(result);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(string username, string password, string role)
        {
            var user = new IdentityUser
            {
                UserName = username,
                Email = username,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }

            return NoContent();
        }

    }
}
