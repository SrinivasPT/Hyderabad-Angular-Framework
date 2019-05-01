using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace service.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LogController : ControllerBase
  {
    // POST api/Log
    [HttpPost]
    public void Post([FromBody] dynamic value)
    {
      Console.WriteLine(value);
    }

  }
}
