using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        // POST api/Session
        [HttpPost("login")]
        public dynamic Login([FromBody] dynamic value)
        {
          return true;
        }

    }
}
