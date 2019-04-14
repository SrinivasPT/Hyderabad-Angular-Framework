using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace service.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class PersonController : ControllerBase
  {
    // GET api/Person
    [HttpGet]
    public dynamic Get()
    {
      // return new string[] { "value1", "value2" };
      var nodes = (new[] {
                new { ID = 1000, Name = "Srinivas"},
                new { ID = 1001, Name = "Sreelatha"}
                }).ToList();
      return nodes;
    }

    // GET api/Person/5
    [HttpGet("{id}")]
    public dynamic Get(int id)
    {
      var node = new
      {
        id = id,
        firstName = "Srinivas",
        lastName = "Peeta",
        country = "India",
        joinDate = ""
      };
      return node;
    }

    // POST api/Person
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/Person/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/Person/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
